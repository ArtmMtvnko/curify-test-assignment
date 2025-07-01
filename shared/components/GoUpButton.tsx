'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

export default function GoUpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Go to top"
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        zIndex: 1000,
        background: '#fff',
        border: 'none',
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        padding: 8,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ArrowUpIcon width={24} height={24} color="#333" />
    </button>
  );
}
