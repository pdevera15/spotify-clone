import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"

const Login = React.memo(function Login() {
  const { data, status } = useSession()

  return (
    <>
      {data && status === "authenticated" ? (
        <div className="my-4 text-xs">
          <span className="text-sm">{data?.user?.name}</span>
          <br />
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <button
          className="rounded-lg bg-emerald-500 px-5 py-2 text-white"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </>
  )
})
export async function getStaticProps() {
  return {
    props: { genres: ["test1", "test2"] },
  }
}

export default Login
