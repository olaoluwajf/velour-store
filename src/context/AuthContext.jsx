import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getSession().then((u) => {
      setUser(u);
      setLoading(false);
    });
    return authService.onChange(setUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: user?.role === 'admin',
      signIn: async (email, password) => setUser(await authService.signIn(email, password)),
      signUp: async (name, email, password) => setUser(await authService.signUp(name, email, password)),
      signOut: async () => {
        await authService.signOut();
        setUser(null);
      },
    }),
    [user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
