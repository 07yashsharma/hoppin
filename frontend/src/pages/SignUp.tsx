import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'passenger' | 'driver'>('passenger');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      await register({ name, email, phone, role });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-bg text-primary page-transition">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-card border border-border shadow-subtle mb-1">
            <img src="/logo.svg" alt="hopin" className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-semibold tracking-tight text-primary">
            Create an account
          </h1>
          <p className="text-sm text-secondary">
            Join verified commuters across Jaipur, Delhi, and Rajasthan
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-7 shadow-elevated space-y-5">
          
          {error && (
            <div className="p-3 rounded-lg bg-error-surface border border-error/30 text-error text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-secondary">Full name</label>
              <input
                type="text"
                required
                value={name}
                disabled={loading}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ankit Verma"
                className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm text-primary placeholder:text-muted focus:border-accent transition-colors disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-secondary">Email address</label>
              <input
                type="email"
                required
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm text-primary placeholder:text-muted focus:border-accent transition-colors disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-secondary">Mobile phone</label>
              <input
                type="tel"
                value={phone}
                disabled={loading}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98000 00000"
                className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm text-primary placeholder:text-muted focus:border-accent transition-colors disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-secondary">Password</label>
              <input
                type="password"
                required
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm text-primary placeholder:text-muted focus:border-accent transition-colors disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-secondary">Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('passenger')}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                    role === 'passenger'
                      ? 'bg-elevated border-accent text-accent'
                      : 'bg-secondary border-border text-secondary hover:text-primary'
                  }`}
                >
                  Passenger
                </button>
                <button
                  type="button"
                  onClick={() => setRole('driver')}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                    role === 'driver'
                      ? 'bg-elevated border-accent text-accent'
                      : 'bg-secondary border-border text-secondary hover:text-primary'
                  }`}
                >
                  Commercial Captain
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm mt-3"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-border text-center text-xs text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
