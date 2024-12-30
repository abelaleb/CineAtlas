// components/SidebarLayout.tsx
import { Compass, Home, Popcorn, Star, TrendingUp, Tv } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar';
import { Link } from 'react-router-dom';

export default function SidebarLayout() {
  const { state } = useSidebar();
  const sidebarItems = [
    { title: 'Browse', url: '/search', icon: Compass },
    { title: 'Trending', url: '/trending', icon: TrendingUp },
    { title: 'Movies', url: '/movies', icon: Popcorn },
    { title: 'TV Shows', url: '/tvshows', icon: Tv },
    { title: 'People', url: '/actor', icon: Star },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className={` fixed left-0 top-0 h-full  pt-[68px] z-60 border-r border-gray-800 bg-white  `}
      style={{
        transition: 'width 0.2s',
        width: state === 'collapsed' ? '3rem' : '16rem',
      }}
    >
      <SidebarHeader
        className=" hover:bg-gray-300 flex justify-center items-center p-4"
      >
        {state === 'expanded' ? (
          <div className="p-4 flex gap-4 justify-start items-center">
            <Link to="/" className="flex justify-start items-center gap-2">
              <Home className=" h-5 w-5" />
              Home
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Link to="/">
              <Home className="h-5 w-5" />
            </Link>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className="col-span-3">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem
              key={item.title}
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem',
              }}
              className="hover:bg-gray-200 "
            >
              {state === 'expanded' ? (
                <div className="p-4 flex gap-4 justify-start items-center">
                  <Link
                    to={item.url}
                    className="flex justify-start items-center gap-2"
                  >
                    <item.icon className=" h-5 w-5" />
                    {item.title}
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
