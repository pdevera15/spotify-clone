import { signIn, signOut, useSession } from "next-auth/react"

const Login = () => {
  const { data, status } = useSession()

  return (
    <>
      {data && status === "authenticated" ? (
        <div className="flex justify-between my-4">
          Hi! {data?.user?.name} <br />
          <a onClick={() => signOut()}>Logout</a>
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
}
export default Login
