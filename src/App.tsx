// App.tsx
import SidebarLayout from './components/SidebarLayout';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import { SidebarProvider } from './components/ui/sidebar';

function App() {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden">
        <SidebarLayout />
        <div className="flex flex-col w-full">
          <Navbar />
          <MainContent />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
