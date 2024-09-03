import React from 'react';
import './Welcome.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-text">
        <h1>BIENVENIDO A TU RECETARIO</h1>     
            <div className="mensajeInicio">
                <p>Por favor, inicia sesión o regístrate para ver tus recetas.</p>
            </div>  
      </div>
      
      <img src="./img/imgInicio.jpg" alt="Imagen de bienvenida" className="welcome-image" />
    </div>
  );
}

export default Welcome;
