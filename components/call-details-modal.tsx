"use client";

import { Archive, Phone, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Activity } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { formatPhoneNumber } from "@/modules/call-history/utils";
import { useState } from "react";

interface CallDetailsModalProps {
  activity: Activity;
  isOpen: boolean;
  onClose: () => void;
  onArchiveToggle: (id: string, archive: boolean) => void;
}

export function CallDetailsModal({
  activity,
  isOpen,
  onClose,
  onArchiveToggle,
}: CallDetailsModalProps) {
  const [isArchiving, setIsArchiving] = useState(false);

  const handleArchiveToggle = async () => {
    setIsArchiving(true);
    await onArchiveToggle(activity.id, !activity.is_archived);
    setIsArchiving(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Call Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full ${
                activity.call_type === "missed" ? "bg-red-100" : "bg-green-100"
              } flex items-center justify-center`}
            >
              <Phone
                className={`w-5 h-5 ${
                  activity.call_type === "missed"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              />
            </div>
            <div>
              <p className="font-semibold">
                {formatPhoneNumber(
                  activity.direction === "inbound" ? activity.from : activity.to
                )}
              </p>
              <p className="text-sm text-gray-500">
                {activity.direction === "inbound"
                  ? "Incoming call"
                  : "Outgoing call"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Date</p>
              <p>{format(new Date(activity.created_at), "MMM d, yyyy")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Time</p>
              <p>{format(new Date(activity.created_at), "h:mm a")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Duration</p>
              <p>{activity.duration} seconds</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Via</p>
              <p>{activity.via}</p>
            </div>
          </div>
        </div>
        <Button
          onClick={handleArchiveToggle}
          disabled={isArchiving}
          className="w-full"
        >
          {isArchiving ? (
            "Processing..."
          ) : activity.is_archived ? (
            <>
              <RotateCcw className="w-4 h-4 mr-2" />
              Unarchive Call
            </>
          ) : (
            <>
              <Archive className="w-4 h-4 mr-2" />
              Archive Call
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
