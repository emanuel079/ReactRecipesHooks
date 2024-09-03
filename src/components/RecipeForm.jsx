import React, { useState, useEffect } from 'react';

function RecipeForm({ onAddOrUpdateRecipe, isEditing, recipeToEdit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [step, setStep] = useState('');

  useEffect(() => {
    if (isEditing && recipeToEdit) {
      setName(recipeToEdit.name);
      setDescription(recipeToEdit.description);
      setImage(recipeToEdit.image || null);
      setIngredients(recipeToEdit.ingredients);
      setSteps(recipeToEdit.steps);
    } else {
      setName('');
      setDescription('');
      setImage(null);
      setIngredients([]);
      setSteps([]);
    }
  }, [isEditing, recipeToEdit]);

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
    if (name && description) {
      onAddOrUpdateRecipe({ name, description, image, ingredients, steps });
      setName(''); 
      setDescription('');
      setImage(null); 
      setIngredients([]);
      setSteps([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre de la receta"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción breve"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
      />
      <h4>Ingredientes</h4>
      <input
        type="text"
        placeholder="Añadir ingrediente"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <button onClick={handleAddIngredient}>Añadir Ingrediente</button>
      <ul>
        {ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>
      <h4>Pasos</h4>
      <input
        type="text"
        placeholder="Añadir paso"
        value={step}
        onChange={(e) => setStep(e.target.value)}
      />
      <button onClick={handleAddStep}>Añadir Paso</button>
      <ol>
        {steps.map((stp, index) => (
          <li key={index}>{stp}</li>
        ))}
      </ol>
      <button onClick={handleSubmit}>
        {isEditing ? 'Actualizar Receta' : 'Crear Receta'}
      </button>
    </div>
  );
}

export default RecipeForm;
