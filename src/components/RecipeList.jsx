import React from 'react';

function RecipeList({ recipes, onEdit, onDelete, onToggleFavorite, onToggleHealthy, onShowDetails }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card recipe-card" style={{ border: '2px solid yellow' }}>
          <img src={recipe.image || 'placeholder.png'} className="card-img-top" alt="Imagen de la receta" />
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <p className="card-text">{recipe.description}</p>
            <button
              onClick={(e) => { e.stopPropagation(); onShowDetails(recipe); }}
              className="btnDetalles btn btn-info"
            >
              Mostrar Detalles
            </button>
          </div>
          <ul className="list-group list-group-flush" style={{ border: 'none' }}>
            <li className="list-group-item" style={{ border: 'none' }}>
              <button onClick={(e) => { e.stopPropagation(); onEdit(recipe); }} className="btn btn-warning">
                Editar
              </button>
            </li>
            <li className="list-group-item" style={{ border: 'none' }}>
              <button onClick={(e) => { e.stopPropagation(); onDelete(recipe.id); }} className="btn btn-danger">
                Eliminar
              </button>
            </li>
            <li className="list-group-item" style={{ border: 'none' }}>
              <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(recipe.id); }} className="btn btn-dark">
                {recipe.isFavorite ? '★ Favorito' : '☆ Favoritos'}
              </button>
              <button onClick={(e) => { e.stopPropagation(); onToggleHealthy(recipe.id); }} className="btn btn-dark">
                {recipe.isHealthy ? '✔ Saludable' : '✚ Saludables'}
              </button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
