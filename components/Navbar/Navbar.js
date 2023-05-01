import React from "react";
import Header from '../header/Header';

export default function Navbar(props) {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => setScroll(document.documentElement.scrollTop);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDefaultAccount = (value) => {
    props.defaultAccountChange(value)
  }
  const handleCorrectNetwork = (value) => {
    props.isCorrectNetwork(value)
  }


  const className = scroll > 80 ? "fixed-navbar active" : "fixed-navbar";

  return (
    <div className={className}>
      <Header
        hclass={props.hclass}
        Logo={props.Logo}
        topbarNone={props.topbarNone}
        defaultAccountChange={handleDefaultAccount}
        isCorrectNetwork={handleCorrectNetwork}
      />
    </div>
  );
}