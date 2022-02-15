import type { NextPage } from "next"
import Dastboard from "../components/Dashboard"
import NavBar from "../components/NavBar"

const Home: NextPage = ({ genres }: any) => {
  return (
    <div className="flex">
      <NavBar />
      <Dastboard />
    </div>
  )
}

export default Home
