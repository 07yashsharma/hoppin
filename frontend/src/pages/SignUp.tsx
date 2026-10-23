import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'passenger' | 'driver'>('passenger');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      await refreshUser();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src="/logo.svg" alt="hopin" className="w-10 h-10" />
          <span className="font-display font-black text-2xl tracking-tighter text-hopin-dark">hopin</span>
        </div>
        <h1 className="text-3xl font-display font-black text-hopin-dark tracking-tight">
          Create Your hopin Account
        </h1>
        <p className="text-xs font-mono text-hopin-muted">
          // JOIN VERIFIED COMMUTERS ACROSS JAIPUR, DELHI & RAJASTHAN
        </p>
      </div>

      <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          
          <div>
            <label className="block font-bold text-hopin-dark mb-1 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Ankit Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-lime"
            />
          </div>

          <div>
            <label className="block font-bold text-hopin-dark mb-1 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-lime"
            />
          </div>

          <div>
            <label className="block font-bold text-hopin-dark mb-1 uppercase tracking-wider">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 98000 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-lime"
            />
          </div>

          <div>
            <label className="block font-bold text-hopin-dark mb-1 uppercase tracking-wider">Account Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('passenger')}
                className={`py-2.5 px-3 rounded-lg border-2 font-mono font-bold text-xs uppercase tracking-wider transition-all ${
                  role === 'passenger' 
                    ? 'border-hopin-dark bg-hopin-lime text-hopin-dark shadow-[2px_2px_0px_0px_#171916]' 
                    : 'border-hopin-dark/40 bg-white text-hopin-muted hover:border-hopin-dark'
                }`}
              >
                Passenger
              </button>
              <button
                type="button"
                onClick={() => setRole('driver')}
                className={`py-2.5 px-3 rounded-lg border-2 font-mono font-bold text-xs uppercase tracking-wider transition-all ${
                  role === 'driver' 
                    ? 'border-hopin-dark bg-hopin-lime text-hopin-dark shadow-[2px_2px_0px_0px_#171916]' 
                    : 'border-hopin-dark/40 bg-white text-hopin-muted hover:border-hopin-dark'
                }`}
              >
                Commercial Captain
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs font-mono text-red-600 font-bold">// ERROR: {error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-lg bg-hopin-dark text-hopin-lime hover:bg-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50 border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#C5F55A]"
          >
            <span>{loading ? 'REGISTERING...' : 'REGISTER VERIFIED ACCOUNT'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center font-mono text-xs text-hopin-muted pt-4 border-t-2 border-hopin-dark">
          Already registered?{' '}
          <Link to="/login" className="text-hopin-dark font-bold underline hover:text-hopin-cobalt">
            Sign In with Demo Pass
          </Link>
        </p>
      </div>

    </div>
  );
};
