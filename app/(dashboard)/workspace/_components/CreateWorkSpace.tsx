"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { workspaceSchema, WorkspaceSchemaType } from "@/schema/workspace";
import { useMutation } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function CreateWorkSpace() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof workspaceSchema>>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: "",
        },
    });

    const createWorkspaceMutation = useMutation(
        orpc.workspace.create.mutationOptions({
            onSuccess: (newWorkspace) => {
                toast.success(`Workspace ${newWorkspace.workspaceName} created successfully`);

                queryClient.invalidateQueries({
                    queryKey: orpc.workspace.list.queryKey(),
                });

                form.reset();
                setOpen(false);
            },

            onError: () => {
                toast.error("Failed to create workspace");
            },
        }),
    );

    function onSubmit(values: WorkspaceSchemaType) {
        createWorkspaceMutation.mutate(values);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="size-12 rounded-xl border-2 border-dashed border-muted-foreground/50 text-muted-foreground hover:border-muted-foreground hover:text-foreground hover:rounded-lg transition-all duration-200"
                        >
                            <Plus className="size-5" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Create Workspace</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                    <DialogDescription>Create a new workspace to organize your projects and tasks.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My Workspace" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={createWorkspaceMutation.isPending} type="submit">
                            {createWorkspaceMutation.isPending ? "Creating..." : "Create"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
