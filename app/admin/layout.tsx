import { AdminShell } from "@/components/site/admin-shell";

export const metadata = { title: { default: "Admin", template: "%s · Nocta Admin" } };

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell>{children}</AdminShell>;
}
