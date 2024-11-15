"use client";

import { useState } from "react";
import NavBar from "@/components/japanese/nav-bar";
import { GojuonTable } from "@/components/japanese/gojuon-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TestPanel from "@/components/japanese/test-panel";
import { SakuraDecoration, WavePattern } from "@/components/decorative/japanese-patterns";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("gojuon");

  return (
    <div className="relative min-h-screen">
      <SakuraDecoration />
      <WavePattern />
      <NavBar currentTab={currentTab} onTabChange={setCurrentTab} />
      <main className="pt-20 pb-8 px-4 relative z-10">
        <div className="max-w-9xl mx-auto">
          {currentTab === "gojuon" && (
            <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-lg p-6">
              <GojuonTable />
            </div>
          )}
          {currentTab === "test" && (
            <div className="space-y-4">
              <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
                <CardHeader>
                  <CardTitle>Gojuon Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <TestPanel />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}