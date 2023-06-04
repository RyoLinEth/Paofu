import React from 'react'

const SubmitHandler = (e) => {
    e.preventDefault()
}

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
                                        <li>
                                            <a href="https://t.me/SafeLP_Global">
                                                <i
                                                    className="ti-location-arrow"
                                                    style={{
                                                        border: "1px solid white",
                                                        borderRadius: "40px",
                                                        fontSize: "5px",
                                                        padding: "3px"
                                                    }}>
                                                </i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/SafeLP_Global">
                                                <i className="ti-twitter-alt"
                                                    style={{
                                                        border: "1px solid white",
                                                        borderRadius: "40px",
                                                        fontSize: "5px",
                                                        padding: "3px"
                                                    }}>
                                                </i>
                                            </a>
                                        </li>
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
                        <p className="copyright">Copyright &copy; 2023 Safe LP. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;