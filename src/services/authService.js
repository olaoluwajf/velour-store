import { supabase } from '../lib/supabase';

const USERS = 'velour_users';
const SESSION = 'velour_session';
const roleFor = (email) => (email.toLowerCase() === 'admin@demo.com' ? 'admin' : 'customer');
const fromSupabase = async (u) => {
  if (!u) return null;
  const { data: profile, error } = await supabase.from('profiles').select('name, role').eq('id', u.id).single();
  if (error) throw new Error(`Unable to load your account profile: ${error.message}`);
  return { id: u.id, email: u.email, name: profile.name, role: profile.role };
};

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
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return fromSupabase(data.session?.user);
    }
    const email = localStorage.getItem(SESSION);
    const user = readUsers().find((u) => u.email === email);
    return user ? publicUser(user) : null;
  },
  onChange(cb, onError) {
    if (!supabase) return () => {};
    const { data } = supabase.auth.onAuthStateChange((_e, s) => {
      setTimeout(() => {
        fromSupabase(s?.user).then(cb).catch(onError || console.error);
      }, 0);
    });
    return () => data.subscription.unsubscribe();
  },
  async signUp(name, email, password) {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      if (error) throw error;
      if (!data.session) return { user: null, requiresEmailConfirmation: true };
      return { user: await fromSupabase(data.user), requiresEmailConfirmation: false };
    }
    const users = readUsers();
    if (users.some((u) => u.email === email)) throw new Error('An account with this email already exists');
    const user = { id: `u${Date.now()}`, name, email, password };
    localStorage.setItem(USERS, JSON.stringify([...users, user]));
    localStorage.setItem(SESSION, email);
    return { user: publicUser(user), requiresEmailConfirmation: false };
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
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return;
    }
    localStorage.removeItem(SESSION);
  },
};
