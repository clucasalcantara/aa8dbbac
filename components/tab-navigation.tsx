import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabNavigation({
  setActiveTab,
}: {
  setActiveTab: (value: string) => void;
}) {
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    console.log(`Tab changed to: ${value}`);
  };

  return (
    <div className="border-b">
      <Tabs
        defaultValue="activity"
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full h-14 grid grid-cols-4 bg-white">
          <TabsTrigger
            value="activity"
            className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none data-[state=active]:shadow-none"
          >
            <div className="min-w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            </div>
            <span className="font-medium">Activity</span>
          </TabsTrigger>
          <TabsTrigger
            value="inbox"
            className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none data-[state=active]:shadow-none"
          >
            <span className="font-medium">Inbox</span>
          </TabsTrigger>
          <TabsTrigger
            value="all-calls"
            className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none data-[state=active]:shadow-none"
          >
            <span className="font-medium">All calls</span>
          </TabsTrigger>
          <TabsTrigger
            value="archived"
            className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:rounded-none data-[state=active]:shadow-none"
          >
            <span className="font-medium">Archived</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
