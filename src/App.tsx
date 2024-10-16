import Home from "./views/Home";
import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from "./context/Context";
import Header from "./components/Header";

function App() {

  
  return (
    <>
       <ContextProvider>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />      
          </Routes>
        </main>
      </ContextProvider>
    </>
  )
}

export default App
