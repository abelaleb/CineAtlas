"use client";

import type React from "react";

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
  const { state, isMobile } = useSidebar();
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
      className={`fixed left-0 top-0 h-full pt-[56px] z-60 border-r border-gray-800 bg-white shadow-lg will-change-transform
        ${
          isMobile
            ? "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] transform"
            : "transition-[width,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        }
        ${state === "collapsed" ? "w-12 translate-x-0" : "w-64 translate-x-0"}
        ${isMobile && state === "collapsed" && "-translate-x-full"}
      `}
    >
      <SidebarContent className="col-span-3 overflow-hidden">
        <SidebarMenu className="gap-0 p-0 m-0">
          <SidebarMenuItem className="h-[56px] bg-secondary md:hidden">
            <div className="flex items-center justify-start w-full transition-opacity duration-300 ease-in-out">
              <SidebarToggle />
              <Link to="/" className="ml-4">
                <div className="flex items-center gap-1 group transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                  <img
                    src={logo || "/placeholder.svg"}
                    alt="logo"
                    className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12"
                  />
                  <div className="text-lg font-bold transition-colors duration-300 group-hover:text-primary">
                    CineAtlas
                  </div>
                </div>
              </Link>
            </div>
          </SidebarMenuItem>
          {sidebarItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                <item.icon className="h-6 w-6 min-w-6 transition-transform duration-300" />
                <span
                  className={`font-normal whitespace-nowrap transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${
                      !isMobile && state === "collapsed"
                        ? "opacity-0 -translate-x-4"
                        : "opacity-100 translate-x-0"
                    }
                  `}
                >
                  {item.title}
                </span>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div
          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        >
          {state === "expanded" ? (
            <p
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
            >
              © 2024 CineAtlas
            </p>
          ) : (
            <img
              src={logo || "/placeholder.svg"}
              alt="logo"
              className="h-6 w-6 transition-transform duration-300 hover:rotate-12"
            />
          )}
        </div>
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
