"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const workspaces = [
    {
        id: "1",
        name: "TeamFlow 1",
        avatar: "TF",
    },
    {
        id: "2",
        name: "TeamFlow 2",
        avatar: "TF",
    },
    {
        id: "3",
        name: "TeamFlow 3",
        avatar: "TF",
    },
];

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
    return (
        <TooltipProvider>
            <div className="flex flex-col gap-2">
                {workspaces.map((ws) => (
                    <Tooltip key={ws.id}>
                        <TooltipTrigger asChild>
                            <Button
                                size={"icon"}
                                className={cn("size-12 transition-all duration-200", getWorkSpaceColor(ws.id))}
                            >
                                <span className="text-sm font-semibold">{ws.avatar}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>{ws.name}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    );
}
