import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import { AppSidebar } from './components/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

function App() {
  return (
    <>
      <div className="flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="flex">
          <SidebarProvider>
            <div>
              <AppSidebar />
            </div>
            <div className="col-span-3 bg-red-200">
              <SidebarTrigger /> <MainContent />
            </div>
          </SidebarProvider>
        </div>
      </div>
    </>
  );
}

export default App;
