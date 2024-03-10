import React from 'react';
import './middlepart.css';
import { Link } from 'react-router-dom';



const MiddlePart = () => {



  return (
    <>
      <div className="middlePart">
        <div className="boxes">
          <div className="leftBox">
            <h2 className='homeHeadlineText'>The All Inclusive Tool - AIT</h2>
            <br />
            <h4 className='homeDescriptionText'>The All Inclusive Tool enhances tech inclusivity by connecting diverse developers. Explore the Diverse Contributor Showcase, earn badges, and track achievements on our Dashboard Page. With a web extension for an inclusive coding space, we're making coding more awesome for everyone! Join us!</h4>
          </div>

          <div className="rightBox">
            <img src="https://media.discordapp.net/attachments/1216050867216846860/1216280263215153252/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.png?ex=65ffd044&is=65ed5b44&hm=8422a54553c0b8b0778053555ef93004bfff83b329305d0239ab28251ac1d5bb&=&format=webp&quality=lossless&width=918&height=612" />
          </div>
        </div>


        <center>
          <Link to="/sign-up"> <button className="getStartedButton">Get the extension! 🚀</button></Link>

        </center>


      </div>
    </>
  )
}

export default MiddlePart
