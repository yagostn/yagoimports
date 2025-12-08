"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Button } from '@/components/ui/button';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundColor: 'oklch(0.9382 0.104 96.09)' }}>
      {/* Botão Voltar */}
      <Link href="/" className="absolute top-6 left-6 z-10">
        <Button 
          variant="ghost" 
          size="sm"
          className="gap-2 hover:bg-white/50 transition-colors"
          style={{ color: 'oklch(0.208 0.042 265.755)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Voltar ao Início</span>
        </Button>
      </Link>

      {/* Card/Popup de Login */}
      <div className="w-full max-w-md mx-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 border-2"
          style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}
        >
        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}>
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
            Painel Admin
          </h1>
          <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
            Acesse sua conta para gerenciar a loja
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'oklch(0.208 0.042 265.755)' }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: 'oklch(0.929 0.013 255.508)',
                  backgroundColor: 'white'
                }}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'oklch(0.208 0.042 265.755)' }}
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: 'oklch(0.929 0.013 255.508)',
                  backgroundColor: 'white'
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div 
              className="p-3 rounded-lg text-sm"
              style={{ 
                backgroundColor: 'oklch(0.98 0.02 27.325)',
                color: 'oklch(0.577 0.245 27.325)'
              }}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 text-base font-medium rounded-lg transition-all hover:opacity-90"
            style={{ 
              backgroundColor: 'oklch(0.208 0.042 265.755)',
              color: 'white'
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="text-center text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
          <p>Acesso restrito a administradores</p>
        </div>
        </div>
      </div>
    </div>
  );
}
