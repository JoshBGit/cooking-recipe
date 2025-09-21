import React from "react";
import { signIn } from "../../../auth";
import { auth } from "../../../auth";

const Login = async () => {
  const session = await auth();
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
