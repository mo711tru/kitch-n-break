import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Kitchnbreak';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recipes-hub" element={<Dashboard />} />
              <Route path="/create" element={<CreateRecipe />} />
              <Route path="/edit/:id" element={<EditRecipe />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </LanguageProvider>
    </Router>
  );
}
