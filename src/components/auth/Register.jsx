import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

function Register() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username, password });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 bg-white text-dark shadow" style={{ width: '22rem' }}>
        <h2 className="mb-4 text-center">Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de Usuario:</label>
            <input 
              type="text" 
              className="form-control" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
