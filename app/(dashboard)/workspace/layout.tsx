import { CreateWorkSpace } from "./_components/CreateWorkSpace";
import { UserNav } from "./_components/UserNav";
import { WorkspaceList } from "./_components/WorkspaceList";
import { orpc } from "@/lib/orpc";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";

export default async function WorkspaceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(orpc.workspace.list.queryOptions());
    return (
        <div className="flex w-full h-screen">
            <div className="flex h-full w-16 flex-col items-center bg-secondary py-3 px-2 border-r border-border">
                <HydrateClient client={queryClient}>
                    <WorkspaceList />
                </HydrateClient>

                <div className="mt-4">
                    <CreateWorkSpace />
                </div>

                <div className="mt-auto">
                    <HydrateClient client={queryClient}>
                        <UserNav />
                    </HydrateClient>
                </div>
            </div>
            {children}
        </div>
    );
}
