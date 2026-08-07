import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto flex max-w-7xl gap-8 p-8">

        <DashboardSidebar />

        <div className="flex-1">
          {children}
        </div>

      </div>
    </main>
  );
}