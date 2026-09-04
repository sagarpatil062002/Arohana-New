'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-6 py-24 bg-stodio-bg text-stodio-white">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs font-mono text-stodio-red font-semibold uppercase px-3 py-1 rounded-full bg-stodio-surface border border-stodio-border">
          404 · Page Not Found
        </span>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stodio-white">
          Page Not Found
        </h1>

        <p className="text-sm text-stodio-muted leading-relaxed font-normal">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="pt-2">
          <Button href="/" variant="red" size="md" icon="arrow">
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
