// CSS
import './App.css';

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About/About";

// React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "./context/AuthContext";

// Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const userLoading = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  console.log("Component App user", user);

  return (
    <div className="App">
      <AuthProvider value={{ user }} >
        <BrowserRouter>
          {userLoading ? <Loading type="main" /> : (
            <>
            <Navbar />
              <div className="container">
                <Routes>
                  <Route 
                    path="/" 
                    element={user ? <Home /> : <Navigate to="/login" />} 
                  />
                  <Route 
                    path="/login" 
                    element={!user ? <Login /> : <Navigate to="/" />}
                  />
                  <Route 
                    path="/register" 
                    element={!user ? <Register /> : <Navigate to="/" />} 
                  />
                  <Route 
                    path="/about" 
                    element={user ? <About /> : <Navigate to="/login" />} 
                  />
                </Routes>
              </div>
            <Footer />
          </>
          )}
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
