import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <Menu className="h-6 w-6" />
    </Button>
  );
};

export default SidebarToggle;
