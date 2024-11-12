"use client";

//import { useSession } from "next-auth/react";
//import { useRouter } from "next/navigation";
import {useState } from "react";
import NavBar from "@/components/japanese/nav-bar";
import { GojuonTable } from "@/components/japanese/gojuon-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TestPanel from "@/components/japanese/test-panel";

export default function Home() {
  //const { data: session, status } = useSession();
  //const router = useRouter();
  const [currentTab, setCurrentTab] = useState("gojuon");

  /*
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // 添加加载状态
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // 如果没有登录，不显示内容
  if (!session) {
    return null;
  }
    */

  return (
    <div>
      <NavBar currentTab={currentTab} onTabChange={setCurrentTab} />
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {currentTab === "gojuon" && <GojuonTable />}
          {currentTab === "test" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>五十音测试</CardTitle>
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