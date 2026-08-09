import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-zinc-950">
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />

        <div className="min-w-0 flex-1 w-full">
          {children}
        </div>
      </div>
    </main>
  );
}