import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { base } from "@/app/middlewares/base";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const requiredAuthMiddelware = base
    .$context<{ session?: { user?: KindeUser<Record<string, unknown>> } }>()
    .middleware(async ({ context, next }) => {
        const session = context.session ?? (await getSession());

        if (!session.user) {
            return redirect("/api/auth/login");
        }

        return next({
            context: { user: session.user },
        });
    });

const getSession = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser<Record<string, unknown>>();

    return {
        user,
    };
};
