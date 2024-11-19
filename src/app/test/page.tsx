'use client';

import MainLayout from '@/components/layouts/main-layout';
import TestPanel from '@/components/japanese/test-panel';

export default function TestPage() {
  return (
    <MainLayout currentTab="test">
      <div className="container mx-auto px-4 py-8">
        <TestPanel />
      </div>
    </MainLayout>
  );
}