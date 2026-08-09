import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-w-0 bg-zinc-950">
      <div className="flex w-full min-w-0 flex-col lg:min-h-screen lg:flex-row">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 w-full overflow-x-hidden">
          {children}
        </section>
      </div>
    </main>
  );
}