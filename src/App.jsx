import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import EditRecipeModal from './components/EditRecipeModal';
import RecipeFormModal from './components/RecipeFormModal';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AuthContext from './contexts/AuthContext';
import Welcome from './components/Welcome';
import Footer from './components/footer/Footer'; 

import "./components/ModalStyles.css";
import './App.css';

function App() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [section, setSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleAddRecipe = (recipeData) => {
    const newRecipe = {
      id: Date.now(),
      ...recipeData,
      username: user.username,
      isFavorite: false,
      isHealthy: false,
    };
    setRecipes([...recipes, newRecipe]);
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  const handleEditRecipe = (recipe) => {
    setCurrentRecipeId(recipe.id);
    setCurrentRecipe(recipe);
    setShowEditModal(true);
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    setSearchQuery(''); // Restablece la búsqueda después de eliminar
  };

  const handleToggleFavorite = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  const handleToggleHealthy = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isHealthy: !recipe.isHealthy } : recipe
      )
    );
  };

  const handleShowDetails = (recipe) => {
    setCurrentRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setShowCreateModal(false);
    setCurrentRecipe(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const resetSearch = () => {
    setSearchQuery(''); // Resetea la búsqueda
  };

  const userRecipes = recipes.filter(recipe => recipe.username === user?.username);

  const filteredRecipes = userRecipes.filter((recipe) => {
    const matchesSearchQuery = recipe.name.toLowerCase().includes(searchQuery) ||
                               recipe.description.toLowerCase().includes(searchQuery);

    if (section === 'favorites') {
      return recipe.isFavorite && matchesSearchQuery;
    } else if (section === 'healthy') {
      return recipe.isHealthy && matchesSearchQuery;
    } else {
      return matchesSearchQuery;
    }
  });

  return (
    <div className="App">
      <Navbar setSection={setSection} onSearch={handleSearch} resetSearch={resetSearch} />

      <Routes>
        <Route path="/" element={
          user ? (
            <div className="container">
              <button onClick={() => setShowCreateModal(true)} className="btn btn-success">
                Crear Receta
              </button>
              <h1>Mis Recetas</h1>
              <RecipeList
                recipes={filteredRecipes}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
                onToggleFavorite={handleToggleFavorite}
                onToggleHealthy={handleToggleHealthy}
                onShowDetails={handleShowDetails}
              />
              {showModal && currentRecipe && (
                <RecipeModal recipe={currentRecipe} onClose={handleCloseModal} />
              )}
              {showEditModal && currentRecipe && (
                <EditRecipeModal
                  show={showEditModal}
                  recipeToEdit={currentRecipe}
                  onClose={handleCloseModal}
                  onUpdate={handleUpdateRecipe}
                />
              )}
              {showCreateModal && (
                <RecipeFormModal
                  show={showCreateModal}
                  onClose={handleCloseModal}
                  onAddRecipe={handleAddRecipe}
                />
              )}
            </div>
          ) : (
            <Welcome />
          )
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
