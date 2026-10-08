import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const toast = useToast();

  // TODO: save the email to a Supabase `subscribers` table.
  const submit = (e) => {
    e.preventDefault();
    toast('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <section className="container section">
      <div className="newsletter">
        <div>
          <h2>Join the list</h2>
          <p className="muted">Early access to drops and 10% off your first order.</p>
        </div>
        <form onSubmit={submit} className="newsletter-form">
          <input className="input" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
