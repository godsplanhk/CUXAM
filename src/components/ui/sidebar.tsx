import { cn } from "@/lib/utils"
import { Button } from "./button"
import { RiAiGenerate } from "react-icons/ri";
import { FaDatabase } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { TypewriterEffectSmooth } from "./typewriter";
import { TbSettings } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isSidebarOpenState } from "@/state/atoms/sidebar";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { LogOut } from "lucide-react";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({ className }: SidebarProps){
  const isSidebarOpen = useRecoilValue(isSidebarOpenState); 
  const navigate = useNavigate();
  const signOut =useSignOut();
  const auth = useAuthUser<{name:string}>();
  const words = [
    {
      text: auth==null?"No Name":auth.name,
      className: "text-red-500 dark:text-red-500"
    }
    
  ]

  return (
    <div className={cn("pb-1 flex flex-col justify-between w-40", className, {"hidden":!isSidebarOpen})}>
      <div className="space-y-2 py-2 items-stretch">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Actions
          </h2>
          <div className="space-y-1">
            <Button onClick={()=>{
              navigate('/generate');
            }} variant="secondary" className="w-full justify-start">
             <RiAiGenerate className="mr-2 h-4 w-4"/>
              Generate
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FaDatabase className="mr-2 h-4 w-4"/>
              Database
            </Button>
          <h2 className="px-7 text-lg font-semibold tracking-tight self-stretch">
            History
          </h2>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col mt-3 mx-3 border-2 rounded-lg my-1 border-white-300"   >
        <div className="grid grid-cols-2 justify-between object-center">
          <RxAvatar className="h-8 w-8 m-2"/>
          <TbSettings className="h-6 w-6 hover:shadow-md justify-self-end m-2"/>
        </div>
        <div className="mx-2 flex justify">
          <TypewriterEffectSmooth className="m-0 w-min" words={words}></TypewriterEffectSmooth>
        </div>
      </div>
      <Button variant="outline" size="sm" className="mr-20  md:hidden w-full gap-3" onClick={()=>{
        signOut();
        navigate('/login');
      }}>
        <LogOut/>LogOut
      </Button>
    </div>
  )
}