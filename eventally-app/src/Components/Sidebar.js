import React from 'react';
import "../App.css";
import {SidebarData} from './SidebarData.js';
import logo from "./logo.png";

function Sidebar() {
    return (
        <div className="Sidebar">
            <img src={logo} />
            <ul className="SidebarList">
                {SidebarData.map((val, key)=> {
                    return (
                        <li 
                        key={key} 
                        className="row"
                        onClick={()=> {
                            window.location.pathname = val.link;
                        }}
                        > 
                          
                            <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>

    );
     
}

export default Sidebar;