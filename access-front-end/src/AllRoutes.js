
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AccessRequest } from "./Pages/AccessRequest/AccessRequest";
import { AccessedData } from "./Pages/AccessedData/AccessedData";
import { RequestData } from "./Pages/RequestData/RequestData";

import { YourData } from "./Pages/YourData/YourData";
import { Register } from "./Pages/Register/Register";
import { Login } from "./Pages/Login/Login";
import { Sidebar } from "./Pages/Sidebar/Sidebar";
import { YourDataa } from "./Pages/YourData/YourDataa";
import { RequestDataa } from "./Pages/RequestData/RequestDataa";

export const AllRoutes = (props) => {
    const token = localStorage.getItem('token');
    
    // if(!token){
    //     window.location.href = '/'
    // }
    return (
                    <Routes>
                        <Route path="/accessrequest" element={<AccessRequest theme={props.theme} settheme={props.settheme} />} />
                        <Route path="/yourdata" element={<YourDataa theme={props.theme} settheme={props.settheme} />} />
                        <Route path="/requestdata" element={<RequestData theme={props.theme} settheme={props.settheme}/>} />
                        <Route path="/accessibledata" element={<AccessedData theme={props.theme} settheme={props.settheme}/>} />
                    </Routes>
    );
};

export default Routes;