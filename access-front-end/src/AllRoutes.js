
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AccessRequest } from "./Pages/AccessRequest/AccessRequest";
import { AccessedData } from "./Pages/AccessedData/AccessedData";
import { RequestData } from "./Pages/RequestData/RequestData";

import { YourData } from "./Pages/YourData/YourData";
import { Register } from "./Pages/Register/Register";
import { Login } from "./Pages/Login/Login";
import { Sidebar } from "./Pages/Sidebar/Sidebar";

export const AllRoutes = (props) => {
    return (

                    <Routes>
                        <Route path="/" element={<AccessRequest theme={props.theme} settheme={props.settheme} />} />
                        <Route path="/yourdata" element={<YourData theme={props.theme} settheme={props.settheme} />} />
                        <Route path="/requestdata" element={<RequestData theme={props.theme} settheme={props.settheme}/>} />
                        <Route path="/accessibledata" element={<AccessedData theme={props.theme} settheme={props.settheme}/>} />
                    </Routes>
    );
};

export default Routes;