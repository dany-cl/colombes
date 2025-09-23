import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // Si l’utilisateur n’est pas connecté, on le renvoie vers la page de login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Sinon on affiche bien le composant enfant (ex. <Home />)
  return children;
}