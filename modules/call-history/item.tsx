"use client";

import { Archive, Loader2, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type React from "react";
import { format } from "date-fns";
import { type Activity } from "@/app/actions";
import { formatPhoneNumber } from "./utils";

interface CallHistoryItemProps {
  activity: {
    id: string;
    created_at: string;
    direction: string;
    from: string;
    to: string;
    via: string;
    call_type: string;
  };
  onArchive: (id: string) => Promise<{ success: boolean }>;
  setActivities: (activities: Activity[]) => void;
  activities: Activity[];
}

const CallHistoryItem: React.FC<CallHistoryItemProps> = ({
  activity,
  onArchive,
  setActivities,
  activities,
}) => {
  const [slideOffset, setSlideOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

  const isMissed = activity.call_type === "missed";
  const callTime = new Date(activity.created_at);
  const formattedTime = format(callTime, "hh:mm a");

  const displayNumber =
    activity.direction === "inbound" ? activity.from : activity.to;
  const formattedNumber =
    displayNumber.length >= 3
      ? formatPhoneNumber(displayNumber)
      : displayNumber;

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX - slideOffset;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const newOffset = currentX - startXRef.current;
    setSlideOffset(Math.min(Math.max(newOffset, -80), 0));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (slideOffset < -40) {
      setSlideOffset(-80);
    } else {
      setSlideOffset(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX - slideOffset;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const newOffset = currentX - startXRef.current;
    setSlideOffset(Math.min(Math.max(newOffset, -80), 0));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (slideOffset < -40) {
      setSlideOffset(-80);
    } else {
      setSlideOffset(0);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setSlideOffset(0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setSlideOffset(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative overflow-hidden" ref={itemRef}>
      <div
        className="absolute inset-y-0 right-0 flex items-center justify-center bg-red-500 text-white w-20"
        style={{ transform: `translateX(${slideOffset + 80}px)` }}
      >
        <button
          onClick={async () => {
            try {
              setIsLoading(true);
              const res = await onArchive(activity.id);

              if (!res.success) {
                throw new Error("Failed to archive call");
              }

              setActivities(activities.filter((a) => a.id !== activity.id));
            } catch (error) {
              console.error("Error archiving call:", error);
            } finally {
              setIsLoading(false);
            }
          }}
          className="w-full h-full flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Archive className="w-6 h-6" />
          )}
        </button>
      </div>
      <div
        className="px-4 py-2 flex items-center gap-4 bg-white transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${slideOffset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <Phone
            className={`w-4 h-4 ${
              isMissed ? "text-red-500" : "text-gray-400"
            } rotate-90`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-medium">{formattedNumber}</div>
            {isMissed && (
              <div className="bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                1
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {activity.direction === "inbound"
              ? "Incoming call"
              : "Outgoing call"}{" "}
            via {activity.via}
          </div>
        </div>
        <div className="text-sm text-gray-400">{formattedTime}</div>
      </div>
    </div>
  );
};

export default CallHistoryItem;
