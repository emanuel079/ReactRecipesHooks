import React from 'react';
import './ModalStyles.css';

function RecipeModal({ recipe, onClose }) {
    return (
        <div className="modal show">
            <div className="modal-header">
                <h3>{recipe.name}</h3>
                <button onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                {recipe.image && <img src={recipe.image} alt={recipe.name} style={{ width: '100%', marginBottom: '10px' }} />}
                <h4>Ingredientes:</h4>
                <ul>
                    {recipe.ingredients.map((ing, index) => (
                        <li key={index}>{ing}</li>
                    ))}
                </ul>
                <h4>Pasos:</h4>
                <ol>
                    {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
            <div className="modal-footer">
                <button onClick={onClose} className="btn btn-primary">Cerrar</button>
            </div>
        </div>
    );
}

export default RecipeModal;
