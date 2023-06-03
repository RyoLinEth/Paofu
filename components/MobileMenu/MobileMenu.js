import React, { Fragment, useState } from 'react';
import { Link } from 'react-scroll'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const menus = [
    {
        id: 1,
        title: 'Home',
        link: 'home',
    },

]


const MobileMenu = () => {

    const [openId, setOpenId] = useState(0);
    const [menuActive, setMenuState] = useState(false);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div>
            <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
                <div className="menu-close">
                    <div className="clox" onClick={() => setMenuState(!menuActive)}><i className="ti-close"></i></div>
                </div>

                <ul className="responsivemenu">
                    <li className="menu-item-has-children">
                        <AnchorLink href='#scrool'>Home</AnchorLink>
                    </li>
                    <li>
                        <Link activeClass="active" to="about" spy={true} smooth={true} duration={500}>IDO</Link>
                    </li>
                    <li><Link activeClass="active" to="service" spy={true} smooth={true} duration={500}>About Safe LP</Link></li>
                    <li>
                        <Link activeClass="active" to="experience" spy={true} smooth={true} duration={500}>Invitation Link</Link>
                    </li>
                    <li>
                        <Link activeClass="active" to="portfolio" spy={true} smooth={true} duration={500} >Claim Token</Link>
                    </li>
                </ul>

            </div>

            <div className="showmenu" onClick={() => setMenuState(!menuActive)}>
                <button type="button" className="navbar-toggler open-btn">
                    <span className="icon-bar first-angle"></span>
                    <span className="icon-bar middle-angle"></span>
                    <span className="icon-bar last-angle"></span>
                </button>
            </div>
        </div>
    )
}

export default MobileMenu;