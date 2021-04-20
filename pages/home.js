import React from 'react';
import "../App.css";
import "../styles/home.css";

import slide1 from '../components/images/slideshow/1.jpg';
import slide2 from '../components/images/slideshow/2.jpg';
import slide3 from '../components/images/slideshow/3.jpg';
import slide4 from '../components/images/slideshow/4.jpg';


function Home() {
    var counter = 1;
    setInterval(function(){
        var element = document.getElementById('radio' + counter);
        // if (element !== null && element.checked === true) {
        if (element !== null && element.checked === true) {
            counter++;
            if(counter > 4){
                counter = 1;
            }
        }
        else if (element !== null) {
            element.checked = true;
        }
        else {
            setTimeout(setInterval, 10000);
        }
      
        // document.getElementById('radio' + counter).checked = true;
        
    }, 5000);



    return (
        <div className="Main">
            <div className="body-left">
                <div class="slider">
                    <div class="slides">
                        <input type="radio" name="radio-btn" id="radio1" />
                        <input type="radio" name="radio-btn" id="radio2" />
                        <input type="radio" name="radio-btn" id="radio3" />
                        <input type="radio" name="radio-btn" id="radio4" />

                        <div class="slide first">
                            <img src={slide1} alt="me and the girlies are graduating!!!!" />
                        </div>
                        <div class="slide">
                            <img src={slide2} alt="me studying with my friends" />
                        </div>
                        <div class="slide">
                            <img src={slide3} alt="me teaching some class" />
                        </div>
                        <div class="slide">
                            <img src={slide4} alt="me and the girls staring at the sun" />
                        </div>

                        <div class="navigation-auto">
                            <div class="auto-btn1"></div>
                            <div class="auto-btn2"></div>
                            <div class="auto-btn3"></div>
                            <div class="auto-btn4"></div>
                        </div>
                    </div>

                    <div class="navigation-manual">
                        <label for="radio1" class="manual-btn"></label>
                        <label for="radio2" class="manual-btn"></label>
                        <label for="radio3" class="manual-btn"></label>
                        <label for="radio4" class="manual-btn"></label>
                    </div>
                </div>

            </div>


            <div className="body-right">
                <h2>Welcome back<br />to <span>WECE</span>.</h2>
                <p>WECE is a student-run, diversity-focused organization whose purpose is to foster community among <span>women in the Electrical and Computer Engineering (ECE) fields</span> at the University of Florida.</p>
                <div className="pointsbox">
                    <h3>Current Points: <br /><span>69</span></h3>
                    <label for="eventCode">Enter Event Code:</label> <br />
                    <input type="text" id="eCode" name="eCode" /> <br />
                    <input type="submit" value="Validate" />

                </div>
            </div>
            
        </div>
    );
     
}


export default Home;