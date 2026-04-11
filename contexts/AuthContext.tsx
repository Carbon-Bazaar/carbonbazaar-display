'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  initials: string;
}

interface StoredUser extends User {
  password: string;
  created: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (first: string, last: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'cb_users';
const SESSION_KEY = 'cb_session';

function getUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch { return []; }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) setUser(JSON.parse(session));
    } catch { /* no session */ }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 600));
    const users = getUsers();
    const found = users.find(u => u.email === email);
    if (!found) return { success: false, error: 'No account found with this email' };
    if (found.password !== password) return { success: false, error: 'Incorrect password' };
    const session: User = { name: found.name, email: found.email, initials: found.initials };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const signup = async (first: string, last: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const users = getUsers();
    if (users.find(u => u.email === email)) return { success: false, error: 'An account with this email already exists' };
    const name = `${first} ${last}`;
    const initials = `${first[0]}${last[0]}`.toUpperCase();
    const newUser: StoredUser = { name, email, password, initials, created: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const session: User = { name, email, initials };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
