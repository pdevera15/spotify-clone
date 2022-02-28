import type { NextPage } from "next"
import Dastboard from "../components/Dashboard"
import NavBar from "../components/NavBar"
import { Toaster } from "react-hot-toast"

const Home: NextPage = ({ genres }: any) => {
  return (
    <div className="flex">
      <Toaster />
      <NavBar />
      <Dastboard />
    </div>
  )
}

export default Home
