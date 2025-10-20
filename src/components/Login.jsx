import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  console.log("🔑 Login monté");
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername]         = useState('');
  const [contact, setContact]           = useState('');
  const [password, setPassword]         = useState('');
  const [remember, setRemember]         = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [contactError, setContactError]   = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError]     = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setServerError('');

    // Nom d’utilisateur
    if (!username) {
      setUsernameError("Le nom d’utilisateur est requis.");
      toast.error("Le nom d’utilisateur est requis.");
      return;
    }
    if (username.length < 3) {
      setUsernameError("Le nom d’utilisateur doit contenir au moins 3 caractères.");
      toast.error("Nom d’utilisateur trop court.");
      return;
    }
    if (!/^[\w-]+$/.test(username)) {
      setUsernameError("Seuls les lettres, chiffres, tirets et underscores sont autorisés.");
      toast.error("Format invalide pour le nom d’utilisateur.");
      return;
    }
    setUsernameError('');

    // Email ou téléphone
    if (!contact) {
      setContactError("Ce champ est requis.");
      toast.error("Le champ email ou téléphone est requis.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{8,15}$/;
    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      setContactError("Entrez une adresse email ou un numéro de téléphone valide.");
      toast.error("Format invalide : email ou téléphone incorrect.");
      return;
    }
    setContactError('');

    // Mot de passe
    if (!password) {
      setPasswordError("Le mot de passe est requis.");
      toast.error("Le mot de passe est requis.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères.");
      toast.error("Le mot de passe est trop court.");
      return;
    }
    setPasswordError('');

    // Connexion réussie
    login(remember);
    toast.success("Connexion réussie !");
    navigate('/notes');
  };

  return (
    <div className="login-card">
      <h2>Se connecter</h2>
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
          <span className="eye-icon" onClick={() => setShowPassword(v => !v)}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
        {passwordError && <p className="error-password">{passwordError}</p>}

        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            Connexion automatique
          </label>
          <Link to="/forgot-password" className="link">Mot de passe oublié ?</Link>
        </div>

        <button className="btn" type="submit">Se connecter</button>

        <p className="register">
          Pas encore de compte ? <Link to="/register" className="link">S'inscrire</Link>
        </p>
      </form>
    </div>
  );
}