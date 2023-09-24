import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import CreateBook from "./components/CreateBook"
import UpdateBook from "./components/UpdateBook"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/create" element={<CreateBook></CreateBook>}></Route>
          <Route path="/update/:id" element={<UpdateBook></UpdateBook>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
