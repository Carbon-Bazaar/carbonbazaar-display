'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
  onSuccess?: (msg: string) => void;
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login', onSuccess }: AuthModalProps) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [loginError, setLoginError] = useState('');

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPwd, setSignupPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [signupError, setSignupError] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  useEffect(() => { setTab(defaultTab); }, [defaultTab]);

  const resetForm = useCallback(() => {
    setLoginEmail(''); setLoginPwd(''); setLoginError('');
    setFirst(''); setLast(''); setSignupEmail(''); setSignupPwd(''); setConfirmPwd(''); setSignupError('');
    setShowPwd(false); setShowConfirmPwd(false); setAgreedTerms(false);
  }, []);

  useEffect(() => { if (!isOpen) resetForm(); }, [isOpen, resetForm]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const isEmailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const pwdStrength = (pwd: string) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };
  const strength = pwdStrength(signupPwd);
  const strengthColors = ['bg-red-400', 'bg-red-400', 'bg-yellow-400', 'bg-green-500', 'bg-emerald-500'];
  const strengthWidths = ['w-0', 'w-1/4', 'w-1/2', 'w-3/4', 'w-full'];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail || !isEmailValid(loginEmail)) { setLoginError('Enter a valid email'); return; }
    if (!loginPwd) { setLoginError('Password is required'); return; }
    setLoading(true);
    const res = await login(loginEmail, loginPwd);
    setLoading(false);
    if (!res.success) { setLoginError(res.error || 'Login failed'); return; }
    onClose();
    onSuccess?.(`Welcome back! 🌿`);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    if (!first || !last) { setSignupError('Full name is required'); return; }
    if (!isEmailValid(signupEmail)) { setSignupError('Enter a valid email'); return; }
    if (signupPwd.length < 8) { setSignupError('Password must be at least 8 characters'); return; }
    if (signupPwd !== confirmPwd) { setSignupError('Passwords do not match'); return; }
    if (!agreedTerms) { setSignupError('Please accept terms & privacy policy'); return; }
    setLoading(true);
    const res = await signup(first, last, signupEmail, signupPwd);
    setLoading(false);
    if (!res.success) { setSignupError(res.error || 'Signup failed'); return; }
    onClose();
    onSuccess?.(`Welcome to CarbonBazaar, ${first}! 🎉`);
  };

  if (!isOpen) return null;

  const inputClass = "w-full bg-[#F5F7F2] border border-[#E8E4DE] focus:border-[#52796F] rounded-xl px-4 py-3 text-sm text-[#1A2E1A] placeholder-[#7A8F7A]/60 outline-none transition-all focus:ring-2 focus:ring-[#95D5B2]/30";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-[420px] max-w-[92vw] bg-white border border-[#E8E4DE] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-2 duration-300">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F7F2] hover:bg-[#E8E4DE] flex items-center justify-center text-[#7A8F7A] hover:text-[#1A2E1A] transition-all z-10">
          <X size={16} />
        </button>

        {/* Header */}
        <div className="pt-8 pb-0 text-center">
          <h2 className="font-playfair text-2xl font-bold text-[#1B4332]">CarbonBazaar</h2>
          <p className="text-xs text-[#7A8F7A] mt-1">Trade verified carbon credits from Goa</p>
        </div>

        {/* Tabs */}
        <div className="flex mx-8 mt-6 border-b border-[#E8E4DE]">
          {(['login', 'signup'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setLoginError(''); setSignupError(''); }}
              className={`flex-1 pb-3 text-[13px] font-medium border-b-2 transition-all ${tab === t ? 'text-[#1B4332] border-[#1B4332]' : 'text-[#7A8F7A] border-transparent hover:text-[#4A5D4A]'}`}>
              {t === 'login' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-8 pt-6">
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#4A5D4A] uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@company.com" autoComplete="email" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4A5D4A] uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} value={loginPwd} onChange={e => setLoginPwd(e.target.value)}
                    className={`${inputClass} pr-10`}
                    placeholder="••••••••" autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8F7A] hover:text-[#4A5D4A]">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {loginError && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{loginError}</p>}
              <div className="flex items-center justify-between text-xs text-[#7A8F7A]">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="accent-[#1B4332] rounded" /> Remember me</label>
                <span className="text-[#52796F] hover:underline cursor-pointer">Forgot password?</span>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#1B4332] to-[#52796F] text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#1B4332]/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {loading ? <Loader2 size={18} className="animate-spin mx-auto" /> : 'Sign in'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-[#4A5D4A] uppercase tracking-wider mb-1.5">First name</label>
                  <input type="text" value={first} onChange={e => setFirst(e.target.value)} className={inputClass} placeholder="John" />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-[#4A5D4A] uppercase tracking-wider mb-1.5">Last name</label>
                  <input type="text" value={last} onChange={e => setLast(e.target.value)} className={inputClass} placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4A5D4A] uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} className={inputClass} placeholder="you@company.com" autoComplete="email" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4A5D4A] uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} value={signupPwd} onChange={e => setSignupPwd(e.target.value)}
                    className={`${inputClass} pr-10`} placeholder="Min 8 characters" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8F7A] hover:text-[#4A5D4A]">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {signupPwd && (
                  <div className="h-1 mt-2 rounded-full bg-[#E8E4DE] overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strengthWidths[strength]} ${strengthColors[strength]}`} />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4A5D4A] uppercase tracking-wider mb-1.5">Confirm password</label>
                <div className="relative">
                  <input type={showConfirmPwd ? 'text' : 'password'} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}
                    className={`${inputClass} pr-10`} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8F7A] hover:text-[#4A5D4A]">
                    {showConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {signupError && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{signupError}</p>}
              <label className="flex items-center gap-2 text-xs text-[#7A8F7A] cursor-pointer">
                <input type="checkbox" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)} className="accent-[#1B4332] rounded" />
                I agree to the <span className="text-[#52796F]">Terms</span> & <span className="text-[#52796F]">Privacy Policy</span>
              </label>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#1B4332] to-[#52796F] text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#1B4332]/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {loading ? <Loader2 size={18} className="animate-spin mx-auto" /> : 'Create account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
