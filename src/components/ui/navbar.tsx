import React from "react";
import { Turn as Hamburger } from 'hamburger-react'
import { cn } from '../../lib/utils';
import { useRecoilState } from 'recoil';
import { isSidebarOpenState } from '@/state/atoms/sidebar';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement>{
    children?: React.ReactNode;
    className?: string;
}
export function Navbar({className, children, ...props}: NavbarProps){
    const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState); 
    return <div className={cn("flex justify-between items-center h-16", className)} {...props}>
              <Hamburger size={26} toggled={isSidebarOpen} toggle={setIsSidebarOpen}></Hamburger>
        {children}
        </div>
    }