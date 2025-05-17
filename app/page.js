import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      ehllo 
      <SignInButton/>
      <SignOutButton/>
      <UserButton/>
    </div>
  );
}
