import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../services/recipes';
import { useLanguage } from '../context/LanguageContext';

export default function CreateRecipe() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Hauptgericht');
  const [validationError, setValidationError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSave(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!currentUser) {
      setValidationError(t('create.authRequired'));
      return;
    }

    if (trimmedTitle.length < 3) {
      setValidationError(t('create.titleTooShort'));
      return;
    }

    try {
      setValidationError('');
      setSubmitting(true);
      const savedRecipe = await createRecipe({
        title: trimmedTitle,
        description: trimmedDescription,
        category,
        owner: currentUser.uid,
        userId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email || ''
      });
      navigate('/recipes-hub', { replace: true, state: { createdRecipe: savedRecipe } });
    } catch (err) {
      console.error('Fehler beim Speichern:', err);
      setValidationError(err?.message || t('create.saveError'));
    } finally {
      setSubmitting(false);
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] bg-gray-50 dark:bg-gray-950 px-4 py-12">
        <div className="mx-auto max-w-lg rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">{t('create.authRequiredTitle')}</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            {t('create.authRequiredDescription')}
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            {t('create.goToLogin')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-2xl animate-fadeIn">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">{t('create.heading')}</p>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">{t('create.title')}</h1>
          </div>
          <Link to="/recipes-hub" className="text-sm font-semibold text-gray-500 hover:text-orange-500">
            {t('create.backToDashboard')}
          </Link>
        </div>
      
        <form onSubmit={handleSave} className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {validationError && (
            <div className="rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
              {validationError}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">{t('create.titleLabel')}</label>
            <input 
              type="text"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="z.B. Avocado-Pasta"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">{t('create.categoryLabel')}</label>
            <select 
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Hauptgericht">{t('category.Hauptgericht')}</option>
              <option value="Vorspeise">{t('category.Vorspeise')}</option>
              <option value="Nachspeise">{t('category.Nachspeise')}</option>
              <option value="Snack">{t('category.Snack')}</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">{t('create.descriptionLabel')}</label>
            <textarea 
              rows="5"
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder={t('create.descriptionPlaceholder')}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
          >
            {submitting ? t('create.saving') : t('create.save')}
          </button>
        </form>
      </div>
    </div>
  );
}
