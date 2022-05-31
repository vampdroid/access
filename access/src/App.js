import React,{ useState } from 'react';
import { Sidebar } from './Pages/Sidebar/Sidebar';
import {Home} from './Pages/Home/Home'
import { AccessRequest } from './Pages/AccessRequest/AccessRequest';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import {AllRoutes} from './AllRoutes';

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
    <div className={`App bg-${theme} text-${theme=='light'?'dark':'light'}}"`} style={{display:"flex",flexDirection: "row",marginTop:"-10rem !important"}}>
    {console.log(params)}

      <div style={{width:"280px"}}>
      <Sidebar theme={theme} settheme={changeTheme} current="0"/>
      </div>
      <div style={{width:"72rem"}}>
       <AllRoutes theme={theme}/>
        </div>
        
    </div>
    </Router>
  );
}

export default App;
