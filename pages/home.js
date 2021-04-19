import React from 'react';
import "../App.css";
// import welcome from "../Components/images/welcome.jpg";

function Home() {
    return (
        <div className="Main">
            {/* <img src={welcome} /> */}

            <div className="pointcard">
                <div className="left">
                    <h2>Current Points: </h2>
                    <p>idk</p>
                </div>

                <div className="right">
                    <h3>Ranking:</h3>
                    <p>42%</p>
                </div>

            </div>
            
        </div>
    );
     
}

export default Home;