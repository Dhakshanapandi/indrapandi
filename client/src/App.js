import react from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from "./info/Dashboard";
import Getreport from "./info/Getreport";
import Login from "./info/login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
       
       <Route path="/" element={<Dashboard/>}>  </Route>
       <Route path = "/getreport" element={<Getreport/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
