'use client';

import { useEffect } from 'react';
// Import the singleton i18n instance
import i18n from '../../lib/i18n';

export default function I18nClientInit() {
  useEffect(() => {
    // This is just a placeholder component now
    // The actual initialization happens in lib/i18n.ts
    if (typeof window !== 'undefined' && i18n) {
      console.log('I18nClientInit: i18n instance is available');
    }
  }, []);

  return null;
}
