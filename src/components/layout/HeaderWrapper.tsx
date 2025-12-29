'use client';

// Import the singleton i18n instance directly
import i18n from '../../lib/i18n';
import Header from './NewHeader';

const HeaderWrapper = () => {
  // No need for dynamic import or initialization
  // The i18n instance is already initialized in lib/i18n.ts
  return <Header />;
};

export default HeaderWrapper;