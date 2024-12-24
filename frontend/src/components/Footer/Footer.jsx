import React from 'react'

import './footer.css'
import footer_logo from '../../assets/images/logo_big.png'
import instagram_icon from '../../assets/images/instagram_icon.png'
import pintester_icon from '../../assets/images/pintester_icon.png'
import whatsapp_icon from '../../assets/images/whatsapp_icon.png'
import fb_icon from '../../assets/images/fb_icon.png'
function Footer() {
    return (
        <div className='footer'>
            <hr />
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Product</li>
                <li>Office</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icons">

                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={fb_icon} alt="Instagram icon" width="30" height="30" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instagram_icon} alt="Instagram icon" width="30" height="30" />
                </a>

                <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
                    <img src={instagram_icon} alt="Instagram icon" width="30" height="30" />
                </a>

                <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                    <img src={instagram_icon} alt="whatsapp_icon" width="30" height="30" />
                </a>

            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
