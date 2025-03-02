import { CallHistoryContent } from "./content";
import { CallHistoryLoading } from "./loading";
import { Suspense } from "react";

export function CallHistory({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex-1 overflow-auto">
      <Suspense fallback={<CallHistoryLoading />}>
        <CallHistoryContent activeTab={activeTab} />
      </Suspense>
    </div>
  );
}
