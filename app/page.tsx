"use client";

import { CallHistory } from "@/modules/call-history";
import NavigationBar from "@/components/navigation-bar";
import TabNavigation from "@/components/tab-navigation";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-white shadow-lg relative">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TabNavigation setActiveTab={setActiveTab} />
        <CallHistory activeTab={activeTab} />
      </div>
      <NavigationBar />
    </div>
  );
}
