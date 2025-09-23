import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const handleLogout = () => {
    logout();      // vide l’état auth et le localStorage
    navigate('/'); // renvoie vers la page de login
  };

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      fontSize: '1.25rem'
    }}>
      <button
        onClick={handleLogout}
        className="btn-logout"
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Déconnexion
      </button>
      🎉 Bienvenue sur votre page Home !
    </div>
  );
}