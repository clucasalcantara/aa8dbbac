import ArchiveButton from "@/components/archive-button";
import { CallHistoryContent } from "./content";
import { CallHistoryLoading } from "./loading";
import ResetButton from "@/components/reset-button";
import { Suspense } from "react";

export function CallHistory({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="relative p-4 border-b">
        <ArchiveButton />
        <ResetButton />
      </div>
      <Suspense fallback={<CallHistoryLoading />}>
        <CallHistoryContent activeTab={activeTab} />
      </Suspense>
    </div>
  );
}
