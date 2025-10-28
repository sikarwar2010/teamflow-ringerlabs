import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-between">
            <h1>Dashboard</h1>
            <LogoutLink>
                <Button >Logout</Button>
            </LogoutLink>
        </div>
    );
}
