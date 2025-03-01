"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { resetActivities } from "@/app/actions";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ResetButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleReset = async () => {
    setIsLoading(true);
    try {
      const result = await resetActivities();

      if (result.success) {
        toast({
          title: "Success",
          description: "All activities have been reset",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to reset activities",
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleReset}
      disabled={isLoading}
      className="absolute top-5 right-5 z-10"
    >
      <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
      <span className="sr-only">Reset activities</span>
    </Button>
  );
}
