import { Sidebar } from "@/components/ui/sidebar";
import { Routes,Route, Outlet } from "react-router-dom";
import { Generate } from "./Generate";

export function Dashboard(){
    return (
        <div className="static inset-0 flex">
            <Sidebar className="static inset-0 justify-left w-52  border-r rounded-r-lg shadow-sm"></Sidebar>
            <Outlet></Outlet>
        </div>
    )
}