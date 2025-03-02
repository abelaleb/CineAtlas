import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { ClickOutsideWrapper, SidebarLayout } from "./components/SidebarLayout";
import { SidebarProvider } from "./components/ui/sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <div className="flex w-full h-screen overflow-hidden dark:bg-gradient-to-br bg-[#e1c1eb] dark:from-[#1a1a2e] dark:via-[#231b32] dark:to-[#1f1f2f] ">
          <SidebarLayout />
          <div
            className="flex flex-col w-full h-full overflow-y-auto "
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#622772 #e1c1eb",
            }}
          >
            <ClickOutsideWrapper>
              <div className="fixed top-0 right-0 left-0 z-50">
                <Navbar />
              </div>
            </ClickOutsideWrapper>
            <ScrollToTop />
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default App;
