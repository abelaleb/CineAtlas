// App.tsx
import Navbar from './components/Navbar';
import SidebarLayout from './components/SidebarLayout';
import { SidebarProvider } from './components/ui/sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen ">
        <SidebarLayout />
        <div className="flex flex-col w-full h-full">
        <Navbar />
        <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
