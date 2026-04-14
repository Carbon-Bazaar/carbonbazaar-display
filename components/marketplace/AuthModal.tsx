'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Eye, EyeOff, Loader2, ShoppingBag, Trees } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import type { UserRole, User } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
  onSuccess?: (msg: string) => void;
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login', onSuccess }: AuthModalProps) {
  const { login, signup } = useAuth();
  const router = useRouter();
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
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');

  // Buyer-specific fields
  const [companyName, setCompanyName]           = useState('');
  const [gstin, setGstin]                       = useState('');
  const [industrySector, setIndustrySector]     = useState('');
  const [exportTurnover, setExportTurnover]     = useState('');
  const [complianceIntent, setComplianceIntent] = useState<string[]>([]);

  // Seller-specific fields
  const [mobile, setMobile]         = useState('');
  const [taluka, setTaluka]         = useState('');
  const [village, setVillage]       = useState('');
  const [landArea, setLandArea]     = useState('');
  const [landType, setLandType]     = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [upiId, setUpiId]           = useState('');
  const [aadhaar, setAadhaar]       = useState('');

  useEffect(() => { setTab(defaultTab); }, [defaultTab]);

  const resetForm = useCallback(() => {
    setLoginEmail(''); setLoginPwd(''); setLoginError('');
    setFirst(''); setLast(''); setSignupEmail(''); setSignupPwd(''); setConfirmPwd(''); setSignupError('');
    setShowPwd(false); setShowConfirmPwd(false); setAgreedTerms(false); setSelectedRole('buyer');
    setCompanyName(''); setGstin(''); setIndustrySector('');
    setExportTurnover(''); setComplianceIntent([]);
    setMobile(''); setTaluka(''); setVillage('');
    setLandArea(''); setLandType(''); setSurveyNumber('');
    setUpiId(''); setAadhaar('');
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
    // Redirect to their dashboard based on stored role
    const session = localStorage.getItem('cb_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        router.push(`/dashboard/${parsed.role || 'buyer'}`);
      } catch {
        router.push('/dashboard/buyer');
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    if (!first || !last) { setSignupError('Full name is required'); return; }
    if (selectedRole === 'buyer' && !isEmailValid(signupEmail))
      { setSignupError('Enter a valid work email'); return; }
    if (selectedRole === 'seller' && signupEmail &&
        !isEmailValid(signupEmail))
      { setSignupError('Enter a valid email or leave it blank'); return; }
    if (signupPwd.length < 8) { setSignupError('Password must be at least 8 characters'); return; }
    if (signupPwd !== confirmPwd) { setSignupError('Passwords do not match'); return; }

    // Buyer validation
    if (selectedRole === 'buyer') {
      if (!companyName.trim())
        { setSignupError('Company name is required'); return; }
      if (!gstin.trim() || gstin.trim().length < 15)
        { setSignupError('Enter a valid 15-character GSTIN'); return; }
      if (!industrySector)
        { setSignupError('Please select your industry sector'); return; }
      if (complianceIntent.length === 0)
        { setSignupError('Select at least one compliance reason'); return; }
    }

    // Seller validation
    if (selectedRole === 'seller') {
      if (!mobile.trim() || mobile.trim().length < 10)
        { setSignupError('Enter a valid 10-digit mobile number'); return; }
      if (!taluka)
        { setSignupError('Please select your taluka'); return; }
      if (!landArea.trim())
        { setSignupError('Land area is required'); return; }
      if (!landType)
        { setSignupError('Please select your land / vegetation type'); return; }
      if (!surveyNumber.trim())
        { setSignupError('Survey / RTC number is required'); return; }
      if (!upiId.trim())
        { setSignupError('UPI ID is required for payouts'); return; }
      if (!aadhaar.trim() || aadhaar.replace(/\s/g, '').length !== 12)
        { setSignupError('Enter a valid 12-digit Aadhaar number'); return; }
    }

    if (!agreedTerms) { setSignupError('Please accept terms & privacy policy'); return; }
    setLoading(true);

    const extraFields: Partial<User> =
      selectedRole === 'buyer'
        ? { companyName, gstin, industrySector, complianceIntent }
        : { mobile, taluka, landArea, landType, surveyNumber, upiId };

    const res = await signup(
      first, last, signupEmail, signupPwd, selectedRole, extraFields
    );
    setLoading(false);
    if (!res.success) { setSignupError(res.error || 'Signup failed'); return; }
    onClose();
    onSuccess?.(`Welcome to CarbonBazaar, ${first}! 🎉`);
    // Redirect to their dashboard
    router.push(`/dashboard/${selectedRole}`);
  };

  if (!isOpen) return null;

  const inputClass = "w-full bg-[#F5F7F2] border border-[#E8E4DE] focus:border-[#52796F] rounded-xl px-4 py-3 text-sm text-[#1A2E1A] placeholder-[#7A8F7A]/60 outline-none transition-all focus:ring-2 focus:ring-[#95D5B2]/30";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-[480px] max-w-[94vw] max-h-[90vh] overflow-y-auto bg-white border border-[#E8E4DE] rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-300">
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
              {/* Role selection */}
              <div>
                <label className="block text-[11px] font-semibold text-[#4A5D4A] uppercase tracking-wider mb-2">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { value: 'buyer' as UserRole, label: 'Buyer', desc: 'MSME purchasing credits', Icon: ShoppingBag },
                    { value: 'seller' as UserRole, label: 'Landowner', desc: 'Selling carbon credits', Icon: Trees },
                  ]).map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedRole(opt.value)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                        selectedRole === opt.value
                          ? 'border-[#1B4332] bg-[#1B4332]/5'
                          : 'border-[#E8E4DE] bg-[#F5F7F2] hover:border-[#52796F]/40'
                      }`}
                    >
                      <opt.Icon size={20} className={selectedRole === opt.value ? 'text-[#1B4332]' : 'text-[#7A8F7A]'} />
                      <span className={`text-[13px] font-medium ${selectedRole === opt.value ? 'text-[#1B4332]' : 'text-[#4A5D4A]'}`}>
                        {opt.label}
                      </span>
                      <span className="text-[10px] text-[#7A8F7A] leading-tight">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Step indicator ── */}
              <div className="flex items-center gap-1 py-1">
                {(selectedRole === 'buyer'
                  ? ['Account', 'Business KYC', 'Browse']
                  : ['Account', 'Land docs', 'MRV survey', 'Earn']
                ).map((step, i) => (
                  <div key={step} className="flex items-center gap-1 flex-1 min-w-0">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold flex-shrink-0
                      ${i === 0
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-[#F5F7F2] border border-[#E8E4DE] text-[#7A8F7A]'}`}>
                      {i + 1}
                    </div>
                    <span className={`text-[10px] truncate
                      ${i === 0 ? 'text-[#1B4332] font-medium' : 'text-[#7A8F7A]'}`}>
                      {step}
                    </span>
                    {i < (selectedRole === 'buyer' ? 2 : 3) && (
                      <div className="flex-1 h-px bg-[#E8E4DE] mx-1" />
                    )}
                  </div>
                ))}
              </div>

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
                <label className="block text-[11px] font-semibold text-[#4A5D4A] uppercase tracking-wider mb-1.5">
                  {selectedRole === 'buyer' ? 'Work email' : 'Email address'}
                  {selectedRole === 'seller' && (
                    <span className="text-[#7A8F7A] font-normal ml-1 normal-case text-[10px]">(optional)</span>
                  )}
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  className={inputClass}
                  placeholder={selectedRole === 'buyer'
                    ? 'you@company.com'
                    : 'your@email.com (optional)'}
                  required={selectedRole === 'buyer'}
                  autoComplete="email"
                />
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

              {/* ── BUYER-ONLY FIELDS ── */}
              {selectedRole === 'buyer' && (
                <div className="space-y-3 pt-1">
                  <div className="text-[10px] font-semibold text-[#52796F] uppercase
                                  tracking-wider border-b border-[#E8E4DE] pb-1.5">
                    Business details
                  </div>

                  {/* Why we need this */}
                  <div className="bg-[#EAF3DE] border border-[#C0DD97] rounded-lg
                                  px-3 py-2.5">
                    <p className="text-[10px] font-semibold text-[#27500A] uppercase
                                  tracking-wider mb-1">Why we need this</p>
                    <p className="text-[11px] text-[#4A5D4A] leading-relaxed">
                      Retirement certificates and CBAM documents are issued in your
                      company&apos;s name. Accurate details are required for valid carbon
                      accounting.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                      uppercase tracking-wider mb-1.5">
                      Company name <span className="text-[#854F0B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Rao Exports Pvt. Ltd."
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                        uppercase tracking-wider mb-1.5">
                        GSTIN <span className="text-[#854F0B]">*</span>
                      </label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={e => setGstin(e.target.value.toUpperCase())}
                        className={inputClass}
                        placeholder="22AAAAA0000A1Z5"
                        maxLength={15}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                        uppercase tracking-wider mb-1.5">
                        Industry <span className="text-[#854F0B]">*</span>
                      </label>
                      <select
                        value={industrySector}
                        onChange={e => setIndustrySector(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select sector</option>
                        <option>Manufacturing</option>
                        <option>Textiles &amp; Apparel</option>
                        <option>Food Processing</option>
                        <option>Chemicals</option>
                        <option>Iron &amp; Steel</option>
                        <option>Pharmaceuticals</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                      uppercase tracking-wider mb-1.5">
                      Annual export turnover
                      <span className="text-[#7A8F7A] font-normal ml-1">(optional)</span>
                    </label>
                    <select
                      value={exportTurnover}
                      onChange={e => setExportTurnover(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select range</option>
                      <option>Below ₹1 Cr</option>
                      <option>₹1–10 Cr</option>
                      <option>₹10–50 Cr</option>
                      <option>Above ₹50 Cr</option>
                    </select>
                    <p className="text-[10px] text-[#7A8F7A] mt-1">
                      Helps us recommend the right credit volume.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                      uppercase tracking-wider mb-2">
                      Primary reason for buying credits
                      <span className="text-[#854F0B]"> *</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        'CBAM compliance (exports to EU)',
                        'ESG / sustainability reporting',
                        'Voluntary carbon neutrality pledge',
                        'Supply chain requirements from clients',
                      ].map(opt => (
                        <label key={opt}
                          className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={complianceIntent.includes(opt)}
                            onChange={e => setComplianceIntent(prev =>
                              e.target.checked
                                ? [...prev, opt]
                                : prev.filter(x => x !== opt)
                            )}
                            className="accent-[#1B4332] rounded w-3.5 h-3.5 flex-shrink-0"
                          />
                          <span className="text-[12px] text-[#4A5D4A]
                                           group-hover:text-[#1A2E1A] transition-colors">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── SELLER-ONLY FIELDS ── */}
              {selectedRole === 'seller' && (
                <div className="space-y-3 pt-1">
                  <div className="text-[10px] font-semibold text-[#52796F] uppercase
                                  tracking-wider border-b border-[#E8E4DE] pb-1.5">
                    Land details
                  </div>

                  {/* Why we need this */}
                  <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-lg
                                  px-3 py-2.5">
                    <p className="text-[10px] font-semibold text-[#085041] uppercase
                                  tracking-wider mb-1">Why we need this</p>
                    <p className="text-[11px] text-[#4A5D4A] leading-relaxed">
                      We verify land eligibility and connect you to a grouped project
                      in your taluka before starting MRV. Mobile is your primary
                      contact — no email needed.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                      uppercase tracking-wider mb-1.5">
                      Mobile number <span className="text-[#854F0B]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      className={inputClass}
                      placeholder="+91 98765 43210"
                    />
                    <p className="text-[10px] text-[#7A8F7A] mt-1">
                      Used for OTP and WhatsApp updates. Email above is optional.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                        uppercase tracking-wider mb-1.5">
                        Taluka <span className="text-[#854F0B]">*</span>
                      </label>
                      <select
                        value={taluka}
                        onChange={e => setTaluka(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select taluka</option>
                        <option>Sanguem</option>
                        <option>Quepem</option>
                        <option>Canacona</option>
                        <option>Ponda</option>
                        <option>Sattari</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                        uppercase tracking-wider mb-1.5">
                        Village
                        <span className="text-[#7A8F7A] font-normal ml-1">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={village}
                        onChange={e => setVillage(e.target.value)}
                        className={inputClass}
                        placeholder="e.g. Netravali"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                        uppercase tracking-wider mb-1.5">
                        Land area <span className="text-[#854F0B]">*</span>
                      </label>
                      <input
                        type="text"
                        value={landArea}
                        onChange={e => setLandArea(e.target.value)}
                        className={inputClass}
                        placeholder="e.g. 12 hectares"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                        uppercase tracking-wider mb-1.5">
                        Vegetation type <span className="text-[#854F0B]">*</span>
                      </label>
                      <select
                        value={landType}
                        onChange={e => setLandType(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select type</option>
                        <option>Cashew plantation</option>
                        <option>Mixed agroforestry</option>
                        <option>Natural forest</option>
                        <option>Mangrove / coastal</option>
                        <option>Degraded land</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                      uppercase tracking-wider mb-1.5">
                      Survey / RTC number <span className="text-[#854F0B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={surveyNumber}
                      onChange={e => setSurveyNumber(e.target.value)}
                      className={inputClass}
                      placeholder="e.g. 124/A"
                    />
                    <p className="text-[10px] text-[#7A8F7A] mt-1">
                      Found on your 7/12 extract or RTC from the Talathi office.
                    </p>
                  </div>

                  <div className="text-[10px] font-semibold text-[#52796F] uppercase
                                  tracking-wider border-b border-[#E8E4DE] pb-1.5 pt-1">
                    Payout setup
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                      uppercase tracking-wider mb-1.5">
                      UPI ID <span className="text-[#854F0B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className={inputClass}
                      placeholder="yourname@upi"
                    />
                    <p className="text-[10px] text-[#7A8F7A] mt-1">
                      Payouts are sent to this UPI ID after each credit sale.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5D4A]
                                      uppercase tracking-wider mb-1.5">
                      Aadhaar number <span className="text-[#854F0B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={aadhaar}
                      onChange={e => setAadhaar(e.target.value)}
                      className={inputClass}
                      placeholder="XXXX XXXX XXXX"
                      maxLength={14}
                    />
                    <p className="text-[10px] text-[#7A8F7A] mt-1">
                      Required for eKYC and government-compliant payout processing.
                    </p>
                  </div>

                  {/* What happens next */}
                  <div className="bg-[#F5F7F2] border border-[#E8E4DE] rounded-lg
                                  px-3 py-2.5 border-l-4 border-l-[#2D6A4F]">
                    <p className="text-[11px] font-semibold text-[#1B4332] mb-1">
                      What happens after you register?
                    </p>
                    <p className="text-[11px] text-[#4A5D4A] leading-relaxed">
                      Our team will contact you within 3 working days to schedule a
                      field survey. MRV takes 60–90 days, after which your credits
                      are listed on the marketplace.
                    </p>
                  </div>
                </div>
              )}

              {signupError && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{signupError}</p>}
              <label className="flex items-center gap-2 text-xs text-[#7A8F7A] cursor-pointer">
                <input type="checkbox" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)} className="accent-[#1B4332] rounded" />
                I agree to the <span className="text-[#52796F]">Terms</span> &amp; <span className="text-[#52796F]">Privacy Policy</span>
              </label>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#1B4332] to-[#52796F] text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#1B4332]/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {loading
                  ? <Loader2 size={18} className="animate-spin mx-auto" />
                  : selectedRole === 'buyer'
                    ? 'Create buyer account'
                    : 'Create seller account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
