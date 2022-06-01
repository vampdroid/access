import React,{ useState } from 'react';
import { Sidebar } from './Pages/Sidebar/Sidebar';
import {Home} from './Pages/Home/Home'
import { AccessRequest } from './Pages/AccessRequest/AccessRequest';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import {AllRoutes} from './AllRoutes';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';

function App() {
  const [theme, settheme] = useState("dark")
  let params = useParams();
  console.log(params);
  function changeTheme(){
    if(theme==="dark")
    {
      settheme("light")
    }
    else
    {
      settheme("dark")
    }
  }

  return (
    <Router>
     
      <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      </Routes>
      <AllRoutes theme={theme} settheme={changeTheme}/>
    </Router>
  );
}

export default App;
