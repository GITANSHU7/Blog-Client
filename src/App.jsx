import { Flowbite } from "flowbite-react";
import { Toaster } from "react-hot-toast";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import "./App.css";
import SideBar from "./conponents/SideBar";
import BlogList from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Dashboard from "./pages/Dashboard";
import AppFooter from "./conponents/Footer";

function App() {
  return (
    <>
    
        <Flowbite>
          <Toaster />

          <Router>
          <SideBar />

            <Routes>
              <Route>
                <Route path="/" element={<Dashboard />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
              
              
              </Route>
             
            </Routes>
            <AppFooter />
          </Router>
        </Flowbite>
      
    </>
  );
}

export default App;
