import type { NextPage } from "next"
import NavBar from "../components/NavBar"
import { signIn, signOut, useSession } from "next-auth/react"

const Home: NextPage = () => {
  const { data, status } = useSession()
  return (
    <div>
      <NavBar />
    </div>
  )
}

export default Home
