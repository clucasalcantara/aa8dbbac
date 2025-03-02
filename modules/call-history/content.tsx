"use client";

import { Activity, archiveCall, fetchActivities } from "@/app/actions";
import { useEffect, useMemo, useState } from "react";

import ArchiveButton from "@/components/archive-button";
import CallHistoryItem from "./item";
import { CallHistoryLoading } from "./loading";
import ResetButton from "@/components/reset-button";
import { groupActivitiesByDate } from "./utils";

export function CallHistoryContent({ activeTab }: { activeTab: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getInitialActivities = async () => {
      setIsLoading(true);
      try {
        const fetchedActivities = await fetchActivities();

        setActivities(fetchedActivities);
        setError(null);
      } catch (err) {
        setError("Failed to fetch activities. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getInitialActivities();
  }, [activeTab]);

  const activitieMapper = useMemo(() => {
    return {
      archived: activities.filter((activity) => activity.is_archived),
      activity: activities.filter((activity) => !activity.is_archived),
      inbox: activities.filter(
        (activity) => !activity.is_archived && activity.direction === "inbound"
      ),
      "all-calls": activities,
    };
  }, [activities]);

  const filteredActivities = useMemo(
    () => activitieMapper[activeTab as keyof typeof activitieMapper],
    [activeTab, activitieMapper]
  );

  const groupedActivities = groupActivitiesByDate(filteredActivities);

  if (isLoading) {
    return <CallHistoryLoading />;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (activities.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No activities found. The API might be empty or unavailable.
      </div>
    );
  }

  if (filteredActivities.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No calls to display for the selected tab. Try switching tabs or
        resetting activities.
      </div>
    );
  }

  return (
    <div className="divide-y">
      <div className="relative p-4 border-b">
        <ArchiveButton activities={activities} activeTab={activeTab} />
        <ResetButton />
      </div>
      {Object.entries(groupedActivities).map(([date, dateActivities]) => (
        <div key={date} className="py-4">
          <div className="text-xs text-center text-gray-400 mb-2">{date}</div>

          {dateActivities.map((activity) => (
            <CallHistoryItem
              key={activity.id}
              activity={activity}
              onArchive={archiveCall}
              setActivities={setActivities}
              activities={activities}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
