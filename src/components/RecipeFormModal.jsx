import React, { useState } from 'react';
import './ModalStyles.css';  // Usa el mismo archivo de estilos para consistencia

function RecipeFormModal({ show, onClose, onAddRecipe }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [step, setStep] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Nuevo estado para el mensaje de error

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const handleAddStep = () => {
    if (step.trim()) {
      setSteps([...steps, step]);
      setStep('');
    }
  };

  const handleSubmit = () => {
    if (name && description && ingredients.length > 0 && steps.length > 0) {
      onAddRecipe({
        name,
        description,
        image,
        ingredients,
        steps,
      });
      onClose(); // Cierra el modal después de agregar la receta
    } else {
      setErrorMessage('Por favor, complete todos los campos antes de guardar.');
    }
  };

  return (
    <div className={`modal ${show ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close-btn" aria-label="close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Crear Receta</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Nombre de la receta"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="Descripción breve"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="modal-input"
        />
        <input
          type="file"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          className="modal-input"
        />
        <h4 className="modal-subtitle">Ingredientes</h4>
        <input
          type="text"
          placeholder="Añadir ingrediente"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="modal-input"
        />
        <button onClick={handleAddIngredient} className="modal-button">Añadir Ingrediente</button>
        <ul>
          {ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
        <h4 className="modal-subtitle">Pasos</h4>
        <input
          type="text"
          placeholder="Añadir paso"
          value={step}
          onChange={(e) => setStep(e.target.value)}
          className="modal-input"
        />
        <button onClick={handleAddStep} className="modal-button">Añadir Paso</button>
        <ol>
          {steps.map((stp, index) => (
            <li key={index}>{stp}</li>
          ))}
        </ol>
        <button onClick={handleSubmit} className="modal-submit-button">Crear Receta</button>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
}

export default RecipeFormModal;
