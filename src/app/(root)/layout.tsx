import Sidebar from "@components/Sidebar";
import MobileNavigation from "@components/MobileNavigation";
import Header from "@components/Header";
import { getCurrentUser } from "@lib/actions/users.actions";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = async ({ children }: LayoutProps) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect("/sign-in");

  return (
    <main className={"flex h-screen"}>
      <Sidebar {...currentUser} />
      <section className={"flex h-full flex-1 flex-col"}>
        <MobileNavigation />
        <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
