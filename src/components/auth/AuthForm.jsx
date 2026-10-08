import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function AuthForm({ mode }) {
  const isSignUp = mode === 'signup';
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setBusy(true);
    try {
      if (isSignUp) {
        const result = await signUp(form.name, form.email, form.password);
        if (result.requiresEmailConfirmation) {
          setMessage('Account created. Check your email for a confirmation link before signing in.');
          return;
        }
      } else {
        await signIn(form.email, form.password);
      }
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="auth-card" onSubmit={submit}>
      <h2>{isSignUp ? 'Create account' : 'Welcome back'}</h2>
      {!supabase && isSignUp && <p className="hint small center">Supabase is not configured. This account will only be saved in this browser.</p>}
      {isSignUp && <input className="input" placeholder="Full name" value={form.name} onChange={set('name')} required />}
      <input className="input" type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
      <input className="input" type="password" placeholder="Password" minLength={6} value={form.password} onChange={set('password')} required />
      {error && <p className="error">{error}</p>}
      {message && <p className="hint small center">{message}</p>}
      <button className="btn btn-primary block" disabled={busy}>{busy ? 'Please wait...' : isSignUp ? 'Sign up' : 'Sign in'}</button>
      <p className="muted small center">
        {isSignUp ? <>Have an account? <Link to="/login">Sign in</Link></> : <>New here? <Link to="/signup">Create an account</Link></>}
      </p>
    
    </form>
  );
}
