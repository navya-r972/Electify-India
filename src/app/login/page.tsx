'use client';

import { useState, Suspense } from 'react';
// Removed i18n for now to fix build errors
// import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

function LoginContent() {
  // Removed i18n for now to fix build errors
  // const { t } = useTranslation('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignup = searchParams.get('signup') === 'true';
  const [mode, setMode] = useState<'login' | 'signup'>(isSignup ? 'signup' : 'login');

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      if (!res.ok) {
        alert(result.message || 'Login failed');
        return;
      }
      
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result));
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      if (!res.ok) {
        alert(result.message || 'Signup failed');
        return;
      }
      
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result));
      router.push('/profile');
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-dark-800 p-8 rounded-lg shadow-card">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-charcoal-900 dark:text-white">
            Electify India
          </h1>
          <p className="mt-2 text-center text-sm text-charcoal-600 dark:text-gray-400">
            Understanding One Nation One Election
          </p>
          <h2 className="mt-6 text-center text-2xl font-bold text-charcoal-900 dark:text-white">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </h2>
        </div>

        {mode === 'login' ? (
          <form className="mt-8 space-y-6" onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="form-label text-charcoal-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input focus:ring-primary-500 focus:border-primary-500"
                  {...loginForm.register('email')}
                />
                {loginForm.formState.errors.email && (
                  <p className="form-error">{loginForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="form-label text-charcoal-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="form-input focus:ring-primary-500 focus:border-primary-500"
                  {...loginForm.register('password')}
                />
                {loginForm.formState.errors.password && (
                  <p className="form-error">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-charcoal-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full bg-primary-600 hover:bg-primary-700 text-white"
              >
                Login
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>

            <div className="text-center mt-4 space-y-3">
              <p className="text-sm text-charcoal-600 dark:text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Create an account
                </button>
              </p>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-dark-800 text-gray-500">Or</span>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="block w-full py-2 px-4 border-2 border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-charcoal-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                Continue as Guest
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Explore content without an account. Sign up to save your progress.
              </p>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="form-label text-charcoal-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="form-input focus:ring-primary-500 focus:border-primary-500"
                  {...signupForm.register('name')}
                />
                {signupForm.formState.errors.name && (
                  <p className="form-error">{signupForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="signup-email" className="form-label text-charcoal-700">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input focus:ring-primary-500 focus:border-primary-500"
                  {...signupForm.register('email')}
                />
                {signupForm.formState.errors.email && (
                  <p className="form-error">{signupForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="signup-password" className="form-label text-charcoal-700">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="form-input focus:ring-primary-500 focus:border-primary-500"
                  {...signupForm.register('password')}
                />
                {signupForm.formState.errors.password && (
                  <p className="form-error">{signupForm.formState.errors.password.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirm-password" className="form-label text-charcoal-700">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="form-input focus:ring-primary-500 focus:border-primary-500"
                  {...signupForm.register('confirmPassword')}
                />
                {signupForm.formState.errors.confirmPassword && (
                  <p className="form-error">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full bg-primary-600 hover:bg-primary-700 text-white"
              >
                Sign Up
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-charcoal-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </div>

            <div className="text-center mt-4 space-y-3">
              <p className="text-sm text-charcoal-600 dark:text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Login
                </button>
              </p>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-dark-800 text-gray-500">Or</span>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="block w-full py-2 px-4 border-2 border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-charcoal-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                Continue as Guest
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Explore content without an account. Sign up to save your progress.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-dark-900">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}