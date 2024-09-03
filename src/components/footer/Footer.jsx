import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-description">
          Conéctate con nosotros a través de nuestras redes sociales:
        </p>
        <ul className="footer-icons">
          <li className="icon-item">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </li>
          <li className="icon-item">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </li>
          <li className="icon-item">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </li>
          <li className="icon-item">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </li>
          <li className="icon-item">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </li>
        </ul>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Tus Recetas. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
