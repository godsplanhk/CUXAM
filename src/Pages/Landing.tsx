import { LoginForm } from "@/components/forms/LoginForm";
import { ModeToggle } from "@/components/mode-toggle";
import { WavyBackground } from "@/components/ui/wavy-background";

export function Landing(){
    return (
        <WavyBackground>
            <ModeToggle></ModeToggle>
            <LoginForm></LoginForm>
        </WavyBackground>
    )
}