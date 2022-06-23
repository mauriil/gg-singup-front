import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
 

function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    loggedInUser ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, []);


  const Private = ({Component}) => {
    return isAuthenticated ? <Component /> : <Register  loginFunction={setIsAuthenticated}/>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Private Component={Login} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
