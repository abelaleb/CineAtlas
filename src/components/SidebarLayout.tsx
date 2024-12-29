// components/SidebarLayout.tsx
import { Compass, Popcorn, Star, TrendingUp, Tv } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar';
import CollapsibleTrigger from './CollapsibleTrigger';
import { Link } from 'react-router-dom';

export default function SidebarLayout() {
  const { state, toggleSidebar } = useSidebar();
  const sidebarItems = [
    { title: 'Browse', url: '/browser', icon: Compass },
    { title: 'Trending', url: '/trending', icon: TrendingUp },
    { title: 'Movies', url: '/movies', icon: Popcorn },
    { title: 'TV Shows', url: '/tvshows', icon: Tv },
    { title: 'People', url: '/actor', icon: Star },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className={` fixed left-0 top-0 z-20 h-full border-r border-gray-800 bg-white ${
        state === 'collapsed' ? 'w-20' : 'w-64'
      }`}
    >
      <SidebarHeader
        className=" hover:bg-gray-300 flex justify-center items-center p-4"
        onClick={toggleSidebar}
      >
        <CollapsibleTrigger />
      </SidebarHeader>
      <SidebarContent className="col-span-3">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem
              key={item.title}
              style={{ padding: '1rem' }}
              className="hover:bg-gray-200 flex justify-start"
            >
              {state === 'expanded' ? (
                <div className="pl-4 flex gap-4 justify-start items-center">
                  <Link to={item.url} className="flex items-center ">
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.title}{' '}
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <Link to={item.url}>
                    <item.icon className="h-5 w-5" />
                  </Link>
                </div>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {state === 'expanded' ? (
          <p className="text-sm text-gray-500">© 2024 CineAtlas</p>
        ) : (
          <TrendingUp className="h-5 w-5" />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
