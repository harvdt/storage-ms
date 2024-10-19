'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBagCheckFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";

import { cn } from '../../utils/lib/cn'

const SideBar = () => {
  const path = usePathname();

  return (
    <div className={cn(
      "h-[45.5rem] w-[12rem] rounded-lg relative",
      "flex flex-col gap-y-6",
    )}>
      <Link
        href="/home"
        className={cn(
          "group relative bg-white h-10 w-40 rounded-lg [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]",
          "flex items-center gap-x-2 px-2 overflow-hidden",
          "font-bold font-lexend",
          path === "/home" ? "bg-gradient-to-r from-main to-secondary text-white [box-shadow:_0px_8px_4px_rgb(0_0_0_/_0.50)]" : "text-black",
          "transition-all duration-300 ease-in-out",
        )}
      >
        <FaHome className={cn("z-10 group-hover:text-white")} />
        <span className={cn("z-10 group-hover:text-white")}>
          Home
        </span>
        <div className="absolute inset-0 bg-third opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      </Link>

      <Link
        href="/inventory"
        className={cn(
          "group relative bg-white h-10 w-40 rounded-lg [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]",
          "flex items-center gap-x-2 px-2 overflow-hidden",
          "font-bold font-lexend",
          path === "/inventory" ? "bg-gradient-to-r from-main to-secondary text-white [box-shadow:_0px_8px_4px_rgb(0_0_0_/_0.50)]" : "text-black",
          "transition-all duration-300 ease-in-out",
        )}
      >
        <MdInventory className={cn("z-10 group-hover:text-white")} />
        <span className={cn("z-10 group-hover:text-white")}>
          Inventory
        </span>
        <div className="absolute inset-0 bg-third opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      </Link>

      <Link
        href="/transaction"
        className={cn(
          "group relative h-10 w-40 rounded-lg [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]",
          "flex items-center gap-x-2 px-2 bg-white overflow-hidden",
          "font-bold font-lexend",
          path === "/transaction" ? "bg-gradient-to-r from-main to-secondary text-white [box-shadow:_0px_8px_4px_rgb(0_0_0_/_0.50)]" : "text-black",
          "transition-all duration-300 ease-in-out",
        )}
      >
        <BsBagCheckFill className={cn("z-10 group-hover:text-white")} />
        <span className={cn("z-10 group-hover:text-white")}>
          Transaction
        </span>
        <div className="absolute inset-0 bg-third opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      </Link>

      <Link
        href="/info"
        className={cn(
          "group relative bg-white h-10 w-40 rounded-lg [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]",
          "flex items-center gap-x-2 px-2 overflow-hidden",
          "font-bold font-lexend",
          path === "/info" ? "bg-gradient-to-r from-main to-secondary text-white [box-shadow:_0px_8px_4px_rgb(0_0_0_/_0.50)]" : "text-black",
          "transition-all duration-300 ease-in-out",
        )}
      >
        <FaCircleInfo className={cn("z-10 group-hover:text-white")} />
        <span className={cn("z-10 group-hover:text-white")}>
          Info
        </span>
        <div className="absolute inset-0 bg-third opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
      </Link>
    </div>
  )
}

export default SideBar;
