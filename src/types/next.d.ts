import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    prefetch: (url: string) => void;
    back: () => void;
    forward: () => void;
  };

  export function useSearchParams(): {
    get: (key: string) => string | null;
    getAll: (key: string) => string[];
    has: (key: string) => boolean;
    forEach: (callback: (value: string, key: string) => void) => void;
    entries: () => IterableIterator<[string, string]>;
    keys: () => IterableIterator<string>;
    values: () => IterableIterator<string>;
  };
}

declare module 'next/font/google' {
  export interface FontOptions {
    weight?: string | string[];
    style?: string | string[];
    subsets?: string[];
    display?: string;
  }

  export function Inter(options: FontOptions): {
    className: string;
    style: React.CSSProperties;
  };
}