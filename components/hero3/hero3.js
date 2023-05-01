import React from "react";
import { Link } from 'react-scroll'

const Hero3 = () => {
    return (
        <section className="hero wpo-hero-style-3">
            <div className="hero-static">
                <div className="hero-inner">
                    <div className="slider-image">
                        <img src='images/slider/slide-3.jpg' alt="" className="slider-bg"/>
                    </div>
                    <div className="container">
                        <div className="slide-content">
                            <div data-swiper-parallax="300" className="slide-title">
                                <h2><span>Hello,</span>
                                    I am Aliza.</h2>
                            </div>
                            <div data-swiper-parallax="300" className="slide-sub-title">
                                <h5>Fashion Designer</h5>
                            </div>
                            <div data-swiper-parallax="400" className="slide-text">
                                <p>Must explain to how all this mistaken idea denouncing pleasure pain
                                    the system and expound the actua.</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="slide-btn"><Link className="theme-btn" to="contact" spy={true} smooth={true} duration={500}>Hire Me</Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dark_svg">
                <svg x="0px" y="0px" viewBox="0 186.5 1920 113.5">
                    <polygon points="0,300 655.167,210.5 1432.5,300 1920,198.5 1920,300 " />
                </svg>
            </div>
        </section>
    )
}

export default Hero3;