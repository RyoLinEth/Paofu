import React from "react";
import Slider from "react-slick";
import { Link} from 'react-scroll'

const settings = {
    dots: false,
    arrows: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    fade: true
};

const Hero2 = () => {
    return (
        <section className="wpo-hero-slider hero-style-2">
            <div className="hero-container">
                <div className="hero-wrapper">
                    <Slider {...settings}>
                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/slider/slide-1.jpg'})` }}>
                                <div className="container">
                                    <div className="slide-content">
                                        <div data-swiper-parallax="300" className="slide-title">
                                            <h2><span>Hello,</span>
                                                I am Ronald.</h2>
                                        </div>
                                        <div data-swiper-parallax="300" className="slide-sub-title">
                                            <h5>UI/UX Designer</h5>
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

                        <div className="hero-slide">
                            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/slider/slide-2.jpg'})` }}>
                                <div className="container">
                                    <div className="slide-content">
                                        <div data-swiper-parallax="300" className="slide-title">
                                            <h2><span>Hello,</span>
                                                I am Ronald.</h2>
                                        </div>
                                        <div data-swiper-parallax="300" className="slide-sub-title">
                                            <h5>UI/UX Designer</h5>
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
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Hero2;