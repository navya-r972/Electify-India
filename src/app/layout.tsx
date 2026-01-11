import '../styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import React from 'react';

import HeaderWrapper from '../components/layout/HeaderWrapper';
import I18nClientInit from '../components/layout/I18nClientInit';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Electify India - Understanding One Nation One Election',
  description:
    'A neutral, educational platform to help citizens understand One Nation One Election and identify misinformation',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Electify India',
  },
};

export const viewport: Viewport = {
  themeColor: '#475569',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 🌍 Language Context */}
        <LanguageProvider>
          {/* 🎨 Theme Context */}
          <ThemeProvider>
            {/* i18n client-side init */}
            <I18nClientInit />

            {/* Header + conditional layout handling */}
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
