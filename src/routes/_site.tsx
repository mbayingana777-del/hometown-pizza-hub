import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/_site")({
  component: () => <SiteLayout />,
});

// SiteLayout itself renders <Outlet/>, so child routes appear inside main.
// Outlet import kept to satisfy linter pattern.
void Outlet;
