import type { NextPage } from "next"
import Dastboard from "../components/Dashboard"
import NavBar from "../components/NavBar"

const Home: NextPage = () => {
  return (
    <div className="flex">
      <NavBar />
      <Dastboard />
    </div>
  )
}

export default Home
