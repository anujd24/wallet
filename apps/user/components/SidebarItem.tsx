"use client"
import { usePathname, useRouter } from "next/navigation";
import {ReactNode} from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-blue-900" : "text-slate-500"} cursor-pointer  p-2 pl-8 hover:text-blue-600`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-blue-500" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}