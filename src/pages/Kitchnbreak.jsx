import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useRecipesData } from '../hooks/useRecipesData';
import { deleteRecipe } from '../services/recipes';
import { getUserDoc, toggleFavorite } from '../services/users';

function ownsRecipe(recipe, userId) {
  return recipe.owner === userId || recipe.userId === userId;
}

function getCreatedAtTime(recipe) {
  const value = recipe.createdAt;
  if (!value) return 0;
  if (typeof value.toMillis === 'function') return value.toMillis();
  if (typeof value.seconds === 'number') return value.seconds * 1000;
  return Date.parse(value) || 0;
}

function formatRecipeDate(recipe, lang, noDateLabel) {
  const time = getCreatedAtTime(recipe);
  if (!time) return noDateLabel;

  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(time));
}

function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">{value}</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helper}</p>
    </div>
  );
}

function EmptyState({ title, description }) {
  const { t } = useLanguage();

  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">{description}</p>
      <Link
        to="/create"
        className="mt-5 inline-flex rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
      >
        {t('create.save')}
      </Link>
    </div>
  );
}

export default function RecipesHub() {
  const { currentUser } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const createdRecipe = location.state?.createdRecipe;
  const [favorites, setFavorites] = useState([]);
  const [activeView, setActiveView] = useState('mine');
  const [optimisticRecipe, setOptimisticRecipe] = useState(createdRecipe || null);
  const { recipes: myRecipes, loading: myRecipesLoading } = useRecipesData(currentUser?.uid);

  useEffect(() => {
    if (!currentUser) {
      setFavorites([]);
      return;
    }

    let mounted = true;
    getUserDoc(currentUser.uid)
      .then((userDoc) => {
        if (mounted) setFavorites((userDoc && userDoc.favorites) || []);
      })
      .catch((error) => {
        console.error('Fehler beim Laden der Favoriten:', error);
      });

    return () => {
      mounted = false;
    };
  }, [currentUser]);

  useEffect(() => {
    if (!createdRecipe) return;

    setOptimisticRecipe(createdRecipe);
    navigate('.', { replace: true, state: null });
  }, [createdRecipe, navigate]);

  const ownRecipes = useMemo(() => {
    if (!optimisticRecipe || !currentUser || !ownsRecipe(optimisticRecipe, currentUser.uid)) {
      return myRecipes;
    }

    if (myRecipes.some((recipe) => recipe.id === optimisticRecipe.id)) {
      return myRecipes;
    }

    return [optimisticRecipe, ...myRecipes];
  }, [optimisticRecipe, currentUser, myRecipes]);

  const categoryCount = useMemo(() => {
    return new Set(ownRecipes.map((recipe) => recipe.category).filter(Boolean)).size;
  }, [ownRecipes]);

  const favoriteRecipes = useMemo(() => {
    return ownRecipes.filter((recipe) => favorites.includes(recipe.id));
  }, [favorites, ownRecipes]);

  const latestRecipes = ownRecipes.slice(0, 4);

  const tabs = [
    { id: 'mine', label: t('dashboard.ownRecipesTab'), count: ownRecipes.length },
    { id: 'favorites', label: t('dashboard.favorites'), count: favoriteRecipes.length }
  ];

  const visibleRecipes = {
    mine: ownRecipes,
    favorites: favoriteRecipes
  }[activeView];

  const activeLoading = myRecipesLoading && ownRecipes.length === 0;
  const getCategoryLabel = (category) => {
    if (!category) return t('dashboard.noCategory');
    const translatedCategory = t(`category.${category}`);
    return translatedCategory.startsWith('category.') ? category : translatedCategory;
  };

  async function handleToggleFav(item) {
    if (!currentUser) {
      navigate('/');
      return;
    }

    try {
      const added = await toggleFavorite(currentUser.uid, item.id);
      setFavorites((previousFavorites) => (
        added
          ? [...previousFavorites, item.id]
          : previousFavorites.filter((recipeId) => recipeId !== item.id)
      ));
    } catch (error) {
      console.error('Favorit konnte nicht aktualisiert werden:', error);
      alert(t('dashboard.favoriteError'));
    }
  }

  async function handleDelete(item) {
    if (!currentUser || !ownsRecipe(item, currentUser.uid)) {
      alert(t('dashboard.ownerOnly'));
      return;
    }

    if (!window.confirm(t('dashboard.deleteConfirm'))) return;

    try {
      await deleteRecipe(item.id);
      setFavorites((previousFavorites) => previousFavorites.filter((recipeId) => recipeId !== item.id));
    } catch (error) {
      console.error('Rezept konnte nicht gelöscht werden:', error);
      alert(t('dashboard.deleteError'));
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-lg rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">{t('dashboard.loginRequiredTitle')}</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            {t('dashboard.loginRequiredDescription')}
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            {t('dashboard.goHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">Übersicht</p>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">{t('dashboard.title')}</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t('dashboard.welcome', { name: currentUser.displayName || currentUser.email })}
            </p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            {t('dashboard.newRecipe')}
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label={t('dashboard.myRecipes')} value={ownRecipes.length} helper={t('dashboard.createdByYou')} />
          <StatCard label={t('dashboard.favorites')} value={favorites.length} helper={t('dashboard.findAgain')} />
          <StatCard label={t('dashboard.categories')} value={categoryCount} helper={t('dashboard.inYourRecipes')} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveView(tab.id)}
                    className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                      activeView === tab.id
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                        : 'bg-white text-gray-600 hover:text-orange-500 dark:bg-gray-900 dark:text-gray-300'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {activeLoading ? (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500 dark:border-gray-800 dark:bg-gray-900">
                {t('dashboard.loadingRecipes')}
              </div>
            ) : visibleRecipes.length > 0 ? (
              <RecipeList
                items={visibleRecipes}
                onToggleFav={handleToggleFav}
                onEdit={(item) => navigate(`/edit/${item.id}`)}
                onDelete={handleDelete}
                favorites={favorites}
                canManage={(item) => ownsRecipe(item, currentUser.uid)}
              />
            ) : (
              <EmptyState
                title={activeView === 'mine' ? t('dashboard.noRecipes') : t('dashboard.noRecipesFound')}
                description={
                  activeView === 'mine'
                    ? t('dashboard.noRecipesDesc')
                    : t('dashboard.switchViewOrFavorite')
                }
              />
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-black text-gray-900 dark:text-white">{t('dashboard.latestActivity')}</h2>
              {latestRecipes.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {latestRecipes.map((recipe) => (
                    <Link
                      key={recipe.id}
                      to={`/recipe/${recipe.id}`}
                      className="block rounded-md border border-gray-100 p-3 hover:border-orange-200 hover:bg-orange-50 dark:border-gray-800 dark:hover:border-orange-900 dark:hover:bg-orange-950/30"
                    >
                      <p className="line-clamp-1 text-sm font-bold text-gray-900 dark:text-white">{recipe.title}</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {getCategoryLabel(recipe.category)} · {formatRecipeDate(recipe, lang, t('dashboard.noDate'))}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {t('dashboard.noActivity')}
                </p>
              )}
            </div>

            <div className="rounded-lg border border-orange-100 bg-orange-50 p-5 dark:border-orange-900/50 dark:bg-orange-950/30">
              <h2 className="text-lg font-black text-gray-900 dark:text-white">{t('dashboard.quickAccess')}</h2>
              <div className="mt-4 grid gap-2">
                <Link to="/create" className="rounded-md bg-orange-500 px-3 py-2 text-center text-sm font-bold text-white hover:bg-orange-600">
                  {t('dashboard.createRecipe')}
                </Link>
                <Link to="/" className="rounded-md bg-white px-3 py-2 text-center text-sm font-bold text-gray-700 hover:text-orange-500 dark:bg-gray-900 dark:text-gray-200">
                  {t('dashboard.discoverRecipes')}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
