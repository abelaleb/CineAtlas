// components/SidebarLayout.tsx
import { Compass, Popcorn, Star, TrendingUp, Tv } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from './ui/sidebar';
import CollapsibleTrigger from './CollapsibleTrigger';

export default function SidebarLayout() {
  const sidebarItems = [
    { title: 'Browse', url: '#', icon: Compass },
    { title: 'Trending', url: '#', icon: TrendingUp },
    { title: 'Movies', url: '#', icon: Popcorn },
    { title: 'TV Shows', url: '#', icon: Tv },
    { title: 'People', url: '#', icon: Star },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 top-0 z-20 h-full border-r border-gray-800 bg-white"
    >
      <SidebarHeader className="p-4 hover:bg-gray-600 flex justify-center items-center">
        <CollapsibleTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem
              key={item.title}
              style={{ padding: '1rem' }}
              className="hover:bg-gray-200 flex justify-center "
            >
              {item.title}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <p className="text-sm text-gray-500">© 2024 CineAtlas</p>
      </SidebarFooter>
    </Sidebar>
  );
}
