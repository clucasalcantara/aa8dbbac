"use server";

export type Activity = {
  id: string;
  created_at: string;
  direction: string;
  from: string;
  to: string;
  via: string;
  duration: number;
  is_archived: boolean;
  call_type: string;
};

export async function archiveAllCalls(activities: Activity[]) {
  try {
    await Promise.all(
      activities.map(async (activity) => {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/activities/${activity.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_archived: true }),
          }
        );
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Error archiving calls:", error);
    return { success: false, error: "Failed to archive calls" };
  }
}

export async function resetActivities() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset`, {
      method: "PATCH",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to reset activities");
    }

    return { success: true };
  } catch (error) {
    console.error("Error resetting activities:", error);
    return { success: false, error: "Failed to reset activities" };
  }
}

export async function archiveCall(id: string, override?: boolean) {
  try {
    console.log("Archiving call:", id);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/activities/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_archived: override ? !override : true }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to archive call");
    }

    console.log("Call archived:", id);
    return { success: true };
  } catch (error) {
    console.error("Error archiving call:", error);
    return { success: false, error: "Failed to archive call" };
  }
}

export async function fetchActivities() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities`);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch activities: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}
