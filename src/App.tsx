import Navbar from "./components/Navbar";
import { ClickOutsideWrapper, SidebarLayout } from "./components/SidebarLayout";
import { SidebarProvider } from "./components/ui/sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex w-full h-screen scrollbar-light dark:scrollbar-dark overflow-y-auto">
        <SidebarLayout />
        <div className="flex flex-col w-full h-full">
          <ClickOutsideWrapper>
            <div className="fixed top-0 right-0 left-0 z-50">
              <Navbar />
            </div>
          </ClickOutsideWrapper>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
