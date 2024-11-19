"use client";

import MainLayout from '@/components/layouts/main-layout';
import { useState } from "react";
import { GojuonTable } from "@/components/japanese/gojuon-table";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("gojuon");

  return (
    <MainLayout currentTab={currentTab} onTabChange={setCurrentTab}>
      <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-2 sm:p-6">
        <GojuonTable />
      </div>
    </MainLayout>
  );
}