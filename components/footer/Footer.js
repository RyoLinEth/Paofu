import React from 'react'

const SubmitHandler = (e) => {
    e.preventDefault()
}

const Links = [
    {
        className: 'ti-location-arrow',
        link: 'https://t.me/SafeLP_Global',
    },
    {
        className: 'ti-twitter-alt',
        link: 'https://twitter.com/SafeLP_Global',
    }
]

const Footer = (props) => {
    return (
        <footer className="wpo-site-footer">
            <div className="upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="widget about-widget">
                                <div className="social-icons">
                                    <ul>
                                        {/* {
                                            Links.map((Link, index) => {
                                                return (
                                                    <li key={Link.className}>
                                                        <a href={Link.link}>
                                                            <i
                                                                className={Link.className}
                                                                style={{
                                                                    border: "1px solid white",
                                                                    borderRadius: "40px",
                                                                    fontSize: "5px",
                                                                    padding: "3px"
                                                                }}>
                                                            </i>
                                                        </a>
                                                    </li>
                                                )
                                            })
                                        } */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="separator"></div>
                        <p className="copyright">Copyright &copy; 2023 TED. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;