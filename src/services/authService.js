import { supabase, adminEmails } from '../lib/supabase';

const USERS = 'velour_users';
const SESSION = 'velour_session';
const roleFor = (email) => (adminEmails.includes(email.toLowerCase()) ? 'admin' : 'customer');

// Swap roleFor for a lookup in a `profiles` table if you want DB-managed roles.
const fromSupabase = (u) =>
  u && { id: u.id, email: u.email, name: u.user_metadata?.name || u.email.split('@')[0], role: roleFor(u.email) };

const readUsers = () => {
  const users = JSON.parse(localStorage.getItem(USERS) || 'null');
  if (users) return users;
  const seed = [{ id: 'u0', name: 'Admin', email: 'admin@demo.com', password: 'admin123' }];
  localStorage.setItem(USERS, JSON.stringify(seed));
  return seed;
};
const publicUser = (u) => ({ id: u.id, email: u.email, name: u.name, role: roleFor(u.email) });

export const authService = {
  async getSession() {
    if (supabase) {
      const { data } = await supabase.auth.getSession();
      return fromSupabase(data.session?.user);
    }
    const email = localStorage.getItem(SESSION);
    const user = readUsers().find((u) => u.email === email);
    return user ? publicUser(user) : null;
  },
  onChange(cb) {
    if (!supabase) return () => {};
    const { data } = supabase.auth.onAuthStateChange((_e, s) => cb(fromSupabase(s?.user)));
    return () => data.subscription.unsubscribe();
  },
  async signUp(name, email, password) {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      if (error) throw error;
      return fromSupabase(data.user);
    }
    const users = readUsers();
    if (users.some((u) => u.email === email)) throw new Error('An account with this email already exists');
    const user = { id: `u${Date.now()}`, name, email, password };
    localStorage.setItem(USERS, JSON.stringify([...users, user]));
    localStorage.setItem(SESSION, email);
    return publicUser(user);
  },
  async signIn(email, password) {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return fromSupabase(data.user);
    }
    const user = readUsers().find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    localStorage.setItem(SESSION, email);
    return publicUser(user);
  },
  async signOut() {
    if (supabase) return supabase.auth.signOut();
    localStorage.removeItem(SESSION);
  },
};
