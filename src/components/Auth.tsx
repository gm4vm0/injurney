import { signIn, signOut, useSession } from "next-auth/react";

const Auth = () => {
  const { data: session } = useSession();

  return (
    <header>
      {!session ? (
        <button onClick={() => signIn()}>Sign In</button>
      ) : (
        <div>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
        </div>
      )}
    </header>
  );
};

export default Auth;
