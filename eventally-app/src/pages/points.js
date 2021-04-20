import React from 'react';
import "../App.css";
// import {SidebarData} from './components/SidebarData.js';
// import welcome from "images/welcome.jpg";

function Points() {
    return (
        <div className="pointspage">
            <h2>Points</h2>

            <div className="leaderboard">
                <div className="left">
                    <h3>Current Points: </h3>
                    <p>idk</p>
                </div>
                <div className="right">
                    <h3>Ranking:</h3>
                    <p>42%</p>
                </div>

            </div>

            <div className="recentactivity">
                <h3>Recent Activity</h3>

                <ul className="allEntries">
                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                    <li className="recentEntry">
                        <p className="title">Weekly Meeting 04/10</p>
                        <p className="date">04/10/21</p>
                        <p className="points">+4 pts</p>
                    </li>

                </ul>

            </div>

        </div>
    );
     
}

export default Points;
