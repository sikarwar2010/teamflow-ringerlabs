import { KindeOrganization, KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { base } from "@/app/middlewares/base";
import { requiredAuthMiddelware } from "@/app/middlewares/auth";
import { requiredWorkspaceMiddelware } from "@/app/middlewares/workspace";
import { z } from "zod";
import { workspaceSchema } from "@/schema/workspace";
import { init, Organizations } from "@kinde/management-api-js";

export const listWorkSpaces = base
    .use(requiredAuthMiddelware)
    .use(requiredWorkspaceMiddelware)
    .route({
        method: "GET",
        path: "/workspaces",
        summary: "List all workspaces",
        tags: ["workspace"],
    })
    .input(z.void())
    .output(
        z.object({
            workspaces: z.array(
                z.object({
                    id: z.string(),
                    name: z.string(),
                    avatar: z.string(),
                }),
            ),
            user: z.custom<KindeUser<Record<string, unknown>>>(),
            currentWorkspace: z.custom<KindeOrganization<unknown>>(),
        }),
    )
    .handler(async ({ context, errors }) => {
        const { getUserOrganizations } = getKindeServerSession();

        const organizations = await getUserOrganizations();

        if (!organizations) {
            throw errors.FORBIDDEN();
        }

        return {
            workspaces: organizations?.orgs.map((org) => ({
                id: org.code,
                name: org.name ?? "",
                avatar: org.name?.charAt(0) ?? "",
            })),
            user: context.user,
            currentWorkspace: context.workspace,
        };
    });

export const createWorkspace = base
    .use(requiredAuthMiddelware)
    .use(requiredWorkspaceMiddelware)
    .route({
        method: "POST",
        path: "/workspaces",
        summary: "Create a new workspace",
        tags: ["workspace"],
    })
    .input(workspaceSchema)
    .output(
        z.object({
            orgCode: z.string(),
            workspaceName: z.string(),
        }),
    )
    .handler(async ({ context, errors, input }) => {
        init();

        let data;

        try {
            data = await Organizations.createOrganization({
                requestBody: {
                    name: input.name,
                },
            });
        } catch {
            throw errors.FORBIDDEN();
        }

        if (!data.organization?.code) {
            throw errors.FORBIDDEN({
                message: "Organization code is not found",
            });
        }

        try {
            await Organizations.addOrganizationUsers({
                orgCode: data.organization.code,
                requestBody: {
                    users: [
                        {
                            id: context.user.id,
                            roles: ["admin"],
                        },
                    ],
                },
            });
        } catch {
            throw errors.FORBIDDEN();
        }

        const { refreshTokens } = getKindeServerSession();

        await refreshTokens();

        return {
            orgCode: data.organization.code,
            workspaceName: input.name,
        };
    });
