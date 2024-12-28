import { Popcorn, Compass, TrendingUp,  Tv,Star } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
  {
    title: 'browse',
    url: '#',
    icon: Compass,
  },
  {
    title: 'Trending',
    url: '#',
    icon: TrendingUp,
  },
  {
    title: 'Movies',
    url: '#',
    icon: Popcorn,
  },
  {
    title: 'TV Shows',
    url: '#',
    icon: Tv,
  },
  {
    title: 'People',
    url: '#',
    icon: Star
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CineAtlas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
