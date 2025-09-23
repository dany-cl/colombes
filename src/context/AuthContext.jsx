import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // On initialise isAuthenticated depuis localStorage (pour "connexion automatique")
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });

  // Méthode pour se connecter
  function login() {
  setIsAuthenticated(true);
  localStorage.setItem('auth', 'true');
}

  // Méthode pour se déconnecter
  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  }   

  // En cas de changement de isAuthenticated, on garde la valeur en synchro
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('auth');
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook raccourci pour consommer le contexte
export function useAuth() {
  return useContext(AuthContext);
}