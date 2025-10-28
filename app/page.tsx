import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Create Next App</h1>
            <LoginLink>Login</LoginLink>
        </div>
    );
}
