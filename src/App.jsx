import { ToastContainer } from "react-toastify"
import Contact from "./components/contact/Contact"
import Header from "./components/header/Header"

const App = () => {
  return (
  <>
  
  <Header/>
  <Contact/>
  <ToastContainer
        position="top-center"
        style={{ zIndex: "99999999" }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
  </>
  )
}

export default App





