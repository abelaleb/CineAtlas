import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="p-1">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-primary dark:text-primary-dark w-10 h-10">
        <Menu />
      </Button>
    </div>
  );
};

export default SidebarToggle;
