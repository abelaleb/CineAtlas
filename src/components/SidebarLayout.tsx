import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Link, NavLink } from "react-router-dom";
import { Home, Search, Dices, Film, Tv } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import SidebarToggle from "./Navbar/SidebarToggle";
import { useEffect, useRef } from "react";

export function SidebarLayout() {
  const { state } = useSidebar();
  const sidebarItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "Browse", url: "/search", icon: Search },
    { title: "Movies", url: "/movies", icon: Film },
    { title: "TV Shows", url: "/tvshows", icon: Tv },
    { title: "Random", url: "/random", icon: Dices },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 top-0 h-full pt-[56px] z-60 border-r border-gray-800"
      style={{
        transition: "width 0.1s",
        width: state === "collapsed" ? "3rem" : "16rem",
      }}
    >
      <SidebarContent className="col-span-3 ">
        <SidebarMenu className="gap-0 p-0 m-0">
          <SidebarMenuItem
            className={`h-[56px] bg-secondary md:hidden flex items-center justify-start transition duration-300 ease-in-out gap-4 lg:gap-8 `}
          >
            <SidebarToggle />
            <Link to="/">
              <div className="flex items-center justify-center gap-1 text-center group transition-transform duration-200 hover:scale-105 active:scale-95">
                <img
                  src={logo}
                  alt="logo"
                  className="h-6 w-6 transition-transform duration-200 group-hover:rotate-12"
                />
                <div className="text-lg font-bold transition-colors duration-200 group-hover:text-primary">
                  CineAtlas
                </div>
              </div>
            </Link>
          </SidebarMenuItem>
          {sidebarItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  `flex items-center justify-start gap-3 p-3 transition duration-300 ease-in-out ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-200 hover:text-gray-900 "
                  }`
                }
              >
                <item.icon className="h-6 w-6" />
                {state === "expanded" && (
                  <div className="font-semibold">{item.title}</div>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {state === "expanded" ? (
          <p className="text-sm text-gray-500">© 2024 CineAtlas</p>
        ) : (
          <img src={logo} alt="logo" className="h-6 w-6" />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
export function ClickOutsideWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setOpen } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return <div ref={sidebarRef}>{children}</div>;
}