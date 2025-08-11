'use client';

import { Button } from '@/components/ui/Button';
import { Heart, Download, Settings, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function ButtonTestPage() {
  const [loading, setLoading] = useState(false);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Button Component Test</h1>
        
        {/* Variants */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small Button</Button>
            <Button size="md">Medium Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </section>

        {/* With Icons */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">With Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button icon={Heart} iconPosition="left">Like</Button>
            <Button icon={Download} iconPosition="right" variant="secondary">Download</Button>
            <Button icon={Settings} variant="outline">Settings</Button>
            <Button icon={ChevronRight} iconPosition="right" variant="ghost">Next</Button>
          </div>
        </section>

        {/* States */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">States</h2>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled Button</Button>
            <Button loading={loading} onClick={handleLoadingTest}>
              {loading ? 'Loading...' : 'Click to Load'}
            </Button>
          </div>
        </section>

        {/* All combinations */}
        <section>
          <h2 className="text-xl font-semibold mb-4">All Combinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['primary', 'secondary', 'outline', 'ghost'] as const).map(variant => (
              <div key={variant} className="space-y-3">
                <h3 className="font-medium capitalize">{variant}</h3>
                <div className="space-y-2">
                  <Button variant={variant} size="sm">Small {variant}</Button>
                  <Button variant={variant} size="md">Medium {variant}</Button>
                  <Button variant={variant} size="lg">Large {variant}</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}