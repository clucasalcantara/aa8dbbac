import { Activity } from "@/app/actions";
import { format } from "date-fns";

export function groupActivitiesByDate(activities: Activity[]) {
  const grouped: Record<string, Activity[]> = {};

  activities.forEach((activity) => {
    const date = new Date(activity.created_at);
    const dateKey = format(date, "MMMM, dd yyyy").toUpperCase();

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push(activity);
  });

  return grouped;
}

export const formatPhoneNumber = (number: string) => {
  if (!number) return "";
  return number.replace(
    /(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/,
    "+$1 $2 $3 $4 $5 $6"
  );
};
