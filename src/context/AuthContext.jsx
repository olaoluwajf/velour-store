import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    authService.getSession().then((u) => {
      setUser(u);
    }).catch((error) => {
      toast(error.message);
    }).finally(() => {
      setLoading(false);
    });
    return authService.onChange(setUser, (error) => toast(error.message));
  }, [toast]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: user?.role === 'admin',
      signIn: async (email, password) => setUser(await authService.signIn(email, password)),
      signUp: async (name, email, password) => {
        const result = await authService.signUp(name, email, password);
        if (result.user) setUser(result.user);
        return result;
      },
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
