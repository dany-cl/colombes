import { useState } from 'react';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError]     = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!contact) {
      setError("Veuillez entrer votre adresse email ou numéro de téléphone.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{8,15}$/;

    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      setError("Format invalide. Entrez une adresse email ou un numéro de téléphone valide.");
      return;
    }

    setMessage("Un lien de réinitialisation a été envoyé.");
    console.log("Réinitialisation demandée pour :", contact);
  };

  return (
    <div className="forgot-card">
      <h2>Mot de passe oublié ?</h2>
      <p className="subtitle">Entrez votre adresse email ou numéro de téléphone pour réinitialiser votre mot de passe.</p>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Email ou N° de téléphone"
          value={contact}
          onChange={e => setContact(e.target.value)}
        />
        <button type="submit" className="btn">Réinitialiser</button>
      </form>

      <div className="footer-links">
        <a href="/register">Pas encore inscrit ? S'inscrire</a>
        <a href="/">Déjà un compte ? Se connecter</a>
      </div>
    </div>
  );
}