import { MobileTabBar, StoreFooter, StoreHeader } from "@/components/site/store-chrome";

export default function StoreLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <StoreHeader />
      <main className="flex-1">{children}</main>
      <StoreFooter />
      <MobileTabBar />
    </div>
  );
}
