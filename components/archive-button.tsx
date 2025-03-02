"use client";

import { Activity, archiveAllCalls } from "@/app/actions";

import { Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ArchiveButton({
  activities,
}: {
  activities: Activity[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleArchive = async () => {
    setIsLoading(true);

    try {
      const result = await archiveAllCalls(activities);

      if (result.success) {
        toast({
          title: "Success",
          description: "All calls have been archived",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to archive calls",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2 h-12 justify-start text-gray-500"
      onClick={handleArchive}
      disabled={isLoading}
    >
      <Archive className="w-5 h-5" />
      <span>{isLoading ? "Archiving..." : "Archive all calls"}</span>
    </Button>
  );
}
