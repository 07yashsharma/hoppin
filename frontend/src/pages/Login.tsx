import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Lock, 
  Mail, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  User,
  X
} from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithDemo, demoAccounts, forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot password modal state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotStatus, setForgotStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Prepopulate remembered email
  useEffect(() => {
    const remembered = localStorage.getItem('hopin_remembered_email');
    if (remembered) {
      setEmail(remembered);
      setForgotEmail(remembered);
    } else if (demoAccounts.length > 0) {
      setEmail(demoAccounts[0].email);
      setForgotEmail(demoAccounts[0].email);
    }
  }, [demoAccounts]);

  const validateEmail = (val: string) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please provide a valid email format (e.g. name@domain.com).');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      setLoading(true);
      await loginWithEmail(email, password, rememberMe);
      navigate('/');
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFastDemoSelect = async (userId: string, accountEmail: string) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setEmail(accountEmail);
      setPassword('••••••••');
      await loginWithDemo(userId);
      navigate('/');
    } catch (err: any) {
      setErrorMessage(err.message || 'Demo sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !validateEmail(forgotEmail)) {
      setForgotStatus({ success: false, message: 'Please enter a valid email address.' });
      return;
    }

    try {
      setForgotLoading(true);
      setForgotStatus(null);
      const res = await forgotPassword(forgotEmail);
      setForgotStatus({ success: true, message: res.message });
    } catch (err: any) {
      setForgotStatus({ success: false, message: err.message || 'Failed to send password reset.' });
    } finally {
      setForgotLoading(false);
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
            Sign in to hopin
          </h1>
          <p className="text-sm text-secondary">
            Shared mobility and verified highway cab pooling across India
          </p>
        </div>

        {/* Primary Auth Card */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-7 shadow-elevated space-y-5">
          
          {/* Error Message banner */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-error-surface border border-error/30 text-error text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-secondary">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm text-primary placeholder:text-muted focus:border-accent transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-secondary">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-xs text-accent hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-secondary border border-border text-sm text-primary placeholder:text-muted focus:border-accent transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted hover:text-primary transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-secondary border-border text-accent focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-xs text-secondary">Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-accent hover:bg-accent-hover text-bg font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative px-3 bg-card text-[11px] font-medium text-muted uppercase tracking-wider">
              Or quick access with demo persona
            </span>
          </div>

          {/* 1-Click Fast Pass for Evaluators */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {demoAccounts.map(account => (
              <button
                key={account.id}
                type="button"
                disabled={loading}
                onClick={() => handleFastDemoSelect(account.id, account.email)}
                className="p-2.5 rounded-lg bg-secondary hover:bg-elevated border border-border hover:border-accent/40 text-left transition-all flex items-center gap-2.5 group"
              >
                <img
                  src={account.avatar}
                  alt={account.name}
                  className="w-7 h-7 rounded-md object-cover border border-border"
                />
                <div className="truncate flex-1">
                  <p className="font-medium text-primary truncate group-hover:text-accent transition-colors">
                    {account.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-muted capitalize truncate">
                    {account.role === 'driver' ? 'Captain' : account.role}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Footer note inside card */}
          <div className="pt-2 border-t border-border text-center text-xs text-secondary">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-accent hover:underline font-medium">
              Create an account
            </Link>
          </div>

        </div>

      </div>

      {/* Forgot Password Modal Dialog */}
      {forgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-elevated space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-semibold text-primary">Reset your password</h3>
              <button
                onClick={() => {
                  setForgotOpen(false);
                  setForgotStatus(null);
                }}
                className="text-muted hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-secondary leading-relaxed">
              Enter your registered email address and our authentication engine will generate a verified recovery token.
            </p>

            {forgotStatus && (
              <div className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                forgotStatus.success 
                  ? 'bg-success-surface border border-success/30 text-success' 
                  : 'bg-error-surface border border-error/30 text-error'
              }`}>
                {forgotStatus.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{forgotStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-secondary">Email address</label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-xs text-primary focus:border-accent"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setForgotOpen(false)}
                  className="px-3 py-2 rounded-lg border border-border text-xs text-secondary hover:text-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-bg font-medium text-xs transition-colors disabled:opacity-50"
                >
                  {forgotLoading ? 'Sending...' : 'Send reset instructions'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
