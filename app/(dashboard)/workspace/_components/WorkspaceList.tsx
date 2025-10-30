"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

const ColorsCombination = [
    "bg-blue-500 hover:bg-blue-600 text-white",
    "bg-emerald-500 hover:bg-emerald-600 text-white",
    "bg-red-500 hover:bg-red-600 text-white",
    "bg-yellow-500 hover:bg-yellow-600 text-white",
    "bg-green-500 hover:bg-green-600 text-white",
    "bg-purple-500 hover:bg-purple-600 text-white",
];

const getWorkSpaceColor = (id: string) => {
    const charSum = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

    const colorIndex = charSum % ColorsCombination.length;
    return ColorsCombination[colorIndex];
};

export function WorkspaceList() {
    const {
        data: { workspaces, currentWorkspace },
    } = useSuspenseQuery(orpc.workspace.list.queryOptions());
    return (
        <TooltipProvider>
            <div className="flex flex-col gap-2">
                {workspaces.map((ws) => {
                    const isActive = currentWorkspace.orgCode === ws.id;

                    return (
                        <Tooltip key={ws.id}>
                            <TooltipTrigger asChild>
                                <LoginLink orgCode={ws.id}>
                                    <Button
                                        size={"icon"}
                                        className={cn(
                                            "size-12 transition-all duration-200",
                                            getWorkSpaceColor(ws.id),
                                            isActive ? "rounded-lg" : "rounded-xl hover:rounded-lg",
                                        )}
                                    >
                                        <span className="text-sm font-semibold">{ws.avatar}</span>
                                    </Button>
                                </LoginLink>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>
                                    {ws.name} {isActive && "(current)"}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </TooltipProvider>
    );
}
