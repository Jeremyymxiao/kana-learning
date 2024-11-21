'use client';

import { useState } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import TestPanel from '@/components/japanese/test-panel';

export default function TestPage() {
  const [showConfig, setShowConfig] = useState(true);
  const [config, setConfig] = useState({});

  return (
    <MainLayout currentTab="test">
      <div className="container mx-auto px-4 py-8">
        <TestPanel onConfigChange={(newConfig) => setConfig(newConfig)} />
      </div>
    </MainLayout>
  );
}