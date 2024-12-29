// Sidebar Component
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from './ui/sidebar';
import { Compass, TrendingUp, Popcorn, Tv, Star } from 'lucide-react';

const sidebarItems = [
  { title: 'Browse', url: '#', icon: Compass },
  { title: 'Trending', url: '#', icon: TrendingUp },
  { title: 'Movies', url: '#', icon: Popcorn },
  { title: 'TV Shows', url: '#', icon: Tv },
  { title: 'People', url: '#', icon: Star },
];

export function AppSidebar({ isCollapsed }) {
  return (
    <Sidebar
      side="left"
      className={`h-full border-r border-gray-200 bg-white ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300`}
    >
      <SidebarHeader className="p-4">
        <h1 className="text-lg font-bold">CineAtlas</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CineAtlas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <p className="text-sm text-gray-500">© 2023 CineAtlas</p>
      </SidebarFooter>
    </Sidebar>
  );
}
