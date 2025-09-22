import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './Register.css';

export default function Register() {
  const [username, setUsername]           = useState('');
  const [contact, setContact]             = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]   = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [contactError, setContactError]   = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError]   = useState('');
  const [serverError, setServerError]     = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setServerError('');

    // Nom d’utilisateur
    if (!username) {
      setUsernameError("Le nom d’utilisateur est requis.");
      return;
    }
    if (username.length < 3) {
      setUsernameError("Le nom d’utilisateur doit contenir au moins 3 caractères.");
      return;
    }
    if (!/^[\w-]+$/.test(username)) {
      setUsernameError("Seuls les lettres, chiffres, tirets et underscores sont autorisés.");
      return;
    }
    setUsernameError('');

    // Email ou téléphone
    if (!contact) {
      setContactError("Ce champ est requis.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{8,15}$/;
    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      setContactError("Entrez une adresse email ou un numéro de téléphone valide.");
      return;
    }
    setContactError('');

    // Mot de passe
    if (!password) {
      setPasswordError("Le mot de passe est requis.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (!/\d/.test(password)) {
      setPasswordError("Le mot de passe doit contenir au moins un chiffre.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Le mot de passe doit contenir une lettre majuscule.");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Le mot de passe doit contenir au moins un caractère spécial.");
      return;
    }
    setPasswordError('');

    // Confirmation du mot de passe
    if (confirmPassword !== password) {
      setConfirmError("Les mots de passe ne correspondent pas.");
      return;
    }
    setConfirmError('');

    // Simulation d’envoi
    console.log("Inscription réussie !", { username, contact, password });
  };
  const getPasswordStrength = password => {
  let score = 0;
  if (password.length >= 6) score++;
  if (/\d/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 1) return { label: 'Faible', color: '#dc2626', width: '25%' };
  if (score === 2) return { label: 'Moyen', color: '#facc15', width: '50%' };
  if (score >= 3) return { label: 'Fort', color: '#16a34a', width: '100%' };
};

  return (
    <div className="register-card">
      <h2>S'inscrire</h2>
      {serverError && <p className="error">{serverError}</p>}

      <form onSubmit={handleSubmit}>
        {/* Nom d’utilisateur */}
        <div className="input-wrapper has-icon-left">
          <FaUser className="input-icon" />
          <input
            className="input"
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              if (usernameError) setUsernameError('');
            }}
          />
        </div>
        {usernameError && <p className="error-username">{usernameError}</p>}

        {/* Email ou téléphone */}
        <div className="input-wrapper has-icon-email">
          <FaEnvelope className="input-icon email-icon" />
          <input
            className="input"
            type="text"
            placeholder="Adresse email ou N° de téléphone"
            value={contact}
            onChange={e => {
              setContact(e.target.value);
              if (contactError) setContactError('');
            }}
          />
        </div>
        {contactError && <p className="error-email">{contactError}</p>}

        {/* Mot de passe */}
        <div className="input-wrapper has-icon-left has-icon-right">
          <FaLock className="input-icon" />
          <input
            className="input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError('');
            }}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(v => !v)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
        {passwordError && <p className="error-password">{passwordError}</p>}

        {/* Barre de force */}
        {password && (
          <div className="strength-bar">
            <div
              className="strength-fill"
              style={{
                width: getPasswordStrength(password).width,
                backgroundColor: getPasswordStrength(password).color
              }}
            ></div>
            <p className="strength-label">{getPasswordStrength(password).label}</p>
          </div>
        )}

        {/* Confirmation du mot de passe */}
        <div className="input-wrapper has-icon-left">
          <FaLock className="input-icon" />
          <input
            className="input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
              if (confirmError) setConfirmError('');
            }}
          />
        </div>
        {confirmError && <p className="error-password">{confirmError}</p>}

        <button className="btn" type="submit">S'inscrire</button>

        <p className="login-link">
          Déjà un compte ? <Link to="/">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}