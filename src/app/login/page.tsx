'use client'


import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAppNavigation } from '@/hooks/useNavigation';

export default function Login() {
  const { replace } = useAppNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    replace('/admin');
  }

  return (
    <main className="min-h-dvh bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto grid min-h-dvh w-full max-w-7xl grid-cols-1 md:grid-cols-2">
        {/* Brand / Illustration */}
        <aside className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700" />
          <div className="relative z-10 flex h-full items-center p-12">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <span className="text-2xl font-extrabold text-white">KM</span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white">Bienvenido</h1>
              <p className="mt-3 max-w-sm text-sm text-white/80">
                Inicia sesión para administrar tus invitaciones y contenido. Diseño claro y usable en cualquier pantalla.
              </p>
            </div>
          </div>
          {/* subtle pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 20%, rgba(255,255,255,.25) 0 2px, transparent 2px)'}} />
        </aside>

        {/* Form card */}
        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">Inicia sesión</h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Ingresa tus credenciales para continuar.</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-base outline-none ring-2 ring-transparent transition focus:border-neutral-400 focus:ring-neutral-300 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-600 dark:focus:ring-neutral-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
                  <div className="mt-1 flex items-stretch rounded-xl border border-neutral-300 bg-white ring-2 ring-transparent transition focus-within:border-neutral-400 focus-within:ring-neutral-300 dark:border-neutral-700 dark:bg-neutral-950 dark:focus-within:border-neutral-600 dark:focus-within:ring-neutral-700">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full rounded-l-xl bg-transparent px-3 py-2 text-base outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="rounded-r-xl px-3 text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div role="alert" className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-base font-medium text-white shadow-sm transition hover:bg-neutral-800 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25" />
                        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" />
                      </svg>
                      Ingresando...
                    </span>
                  ) : (
                    'Ingresar'
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
                Al continuar aceptas nuestros <a href="#" className="underline underline-offset-2">Términos</a> y
                <a href="#" className="ml-1 underline underline-offset-2">Política de Privacidad</a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
