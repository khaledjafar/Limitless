import React from 'react';
import './styles.css';

const Footer = () => {
  return (
    <>
    <div className='footer-position'>

      

    <footer className="footer">
    <div className="footer-container">
              <div className='footer-details'>
          
                    <div className="footer-about">
                      <h3>About Me</h3>
                      <p>I'm Khaled Jafar, a passionate frontend developer <br /> dedicated to crafting clean, efficient, and modern web experiences.</p>
                    </div>
                  <div className='aboutme-div'>
                    <p className='aboutme-text1'>
                    Expand your ideas effortlessly. <br />My designs prioritize user
                    engagement and interaction,<br /> bringing your vision to life.
                    </p>
                  </div>
       
            </div>
     
     
      <div className='footer-details2'>
        {/* <div className="footer-links">
          <ul>
            <li className='footer-home-li'><a href="#Home">Home</a></li>
            <li className='footer-home-li'><a href="#Projects">Projects</a></li>
            <li className='footer-home-li'><a href="#Footer">About</a></li>
            <li className='footer-home-li'><a href="#Footer">Contact</a></li>
          </ul>
        </div> */}
        
        <div className="footer-contact">
          <h3>Contact</h3>
          <p className='footer-home-li'>Email: khaledjafarmoh@gmail.com</p>
          <p className='footer-home-li'>LinkedIn: <a href="https://www.linkedin.com/in/khaled-jafar-abu-ijdea-a-547483274/" target="_blank" rel="noopener noreferrer">linkedin.com/in/khaledjafar</a></p>
          <p className='footer-home-li'>GitHub: <a href="https://github.com/khaledjafar" target="_blank" rel="noopener noreferrer">github.com/khaledjafar</a></p>
        </div>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Khaled Jafar. All Rights Reserved.</p>
      </div>
    </footer>

    </div>

    </>
  );
};

export default Footer;
