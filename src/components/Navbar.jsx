import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function Navbar({ setSection, onSearch }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Llama a la función de búsqueda pasando el término de búsqueda
  };

  const handleLogoClick = () => {
    navigate('/'); // Navega a la página de bienvenida
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={handleLogoClick}>
          <img src="./img/cocinando.png" alt="Recetario" style={{ width: '200px', height: '123px', marginRight: '10px' }} /> 
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" href="#" onClick={() => setSection('all')}>Todas las Recetas</a>
            <a className="nav-link" href="#" onClick={() => setSection('favorites')}>Favoritos</a>
            <a className="nav-link" href="#" onClick={() => setSection('healthy')}>Saludables</a>
          </div>
          <div className="search-bar">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control"
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">Buscar</button>
            </form>
          </div>
          <div className="navbar-nav ms-auto">
            {user ? (
              <>
                <span className="navbar-text me-3">Bienvenido, {user.username}</span>
                <button onClick={handleLogout} className="btn btn-outline-danger">Cerrar Sesión</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Iniciar Sesión</Link>
                <Link to="/register" className="nav-link">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
