"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogoutLink, PortalLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { CreditCard, LogOut, User } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { getAvatar } from "@/lib/get-avatar";

const user = {
    picture: "https://avatars.githubusercontent.com/u/55553432?v=4",
    given_name: "John",
};

export function UserNav() {
    const {
        data: { user },
    } = useSuspenseQuery(orpc.workspace.list.queryOptions());

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    className="size-12 rounded-xl hover:rounded-lg transition-all duration-200 bg-background/50 border-border/50 hover:bg-accent hover:text-accent-foreground"
                >
                    <Avatar>
                        <AvatarImage
                            src={getAvatar(user.picture, user.email!)}
                            alt="user image"
                            className="object-cover"
                        />
                        <AvatarFallback>{user.given_name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" alignOffset={8} className="w-[200px]">
                <DropdownMenuLabel className="font-normal flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="relative rounded-lg size-8">
                        <AvatarImage />
                        <AvatarFallback>{user.given_name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <p className="truncate font-medium">{user.given_name}</p>
                        <p className="text-muted-foreground truncate text-xs">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <PortalLink>
                            <User />
                            Account
                        </PortalLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <PortalLink>
                            <CreditCard />
                            Billing
                        </PortalLink>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <LogoutLink>
                        <LogOut />
                        Log Out
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
