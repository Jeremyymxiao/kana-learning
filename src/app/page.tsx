"use client";

import { useState } from "react";
import NavBar from "@/components/japanese/nav-bar";
import { GojuonTable } from "@/components/japanese/gojuon-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("gojuon");

  return (
    <div>
      <NavBar currentTab={currentTab} onTabChange={setCurrentTab} />
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {currentTab === "gojuon" && <GojuonTable />}
          {currentTab === "test" && (
            <Card>
              <CardHeader>
                <CardTitle>测试模式 (开发中)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500">
                  测试功能正在开发中...
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}