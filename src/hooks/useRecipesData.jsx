import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

function getCreatedAtTime(recipe) {
  const value = recipe.createdAt;
  if (!value) return 0;
  if (typeof value.toMillis === 'function') return value.toMillis();
  if (typeof value.seconds === 'number') return value.seconds * 1000;
  return Date.parse(value) || 0;
}

function mergeRecipeSnapshots(snapshots) {
  const recipesById = new Map();

  snapshots.forEach((snapshot) => {
    snapshot.forEach((recipe) => {
      recipesById.set(recipe.id, recipe);
    });
  });

  return Array.from(recipesById.values()).sort(
    (firstRecipe, secondRecipe) => getCreatedAtTime(secondRecipe) - getCreatedAtTime(firstRecipe)
  );
}

export function useRecipesData(userId) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setRecipes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const snapshots = {
      userId: [],
      owner: []
    };
    const loaded = {
      userId: false,
      owner: false
    };

    function updateRecipes(field, snapshot) {
      snapshots[field] = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));
      loaded[field] = true;
      setRecipes(mergeRecipeSnapshots([snapshots.userId, snapshots.owner]));

      if (loaded.userId && loaded.owner) {
        setLoading(false);
      }
    }

    function handleError(error) {
      console.error('Fehler beim Laden der Live-Daten:', error);
      setLoading(false);
    }

    const userIdQuery = query(collection(db, 'recipes'), where('userId', '==', userId));
    const ownerQuery = query(collection(db, 'recipes'), where('owner', '==', userId));

    const unsubscribeUserId = onSnapshot(
      userIdQuery,
      (snapshot) => updateRecipes('userId', snapshot),
      handleError
    );
    const unsubscribeOwner = onSnapshot(
      ownerQuery,
      (snapshot) => updateRecipes('owner', snapshot),
      handleError
    );

    return () => {
      unsubscribeUserId();
      unsubscribeOwner();
    };
  }, [userId]);

  return { recipes, loading };
}
