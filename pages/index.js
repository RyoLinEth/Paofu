import Head from 'next/head'
import React, { Fragment, useState, useEffect } from 'react';
import About from '../components/about/about';
import CommonHead from '../components/commonHead';
import ExprienceSec from '../components/Exprience/Exprience';
import Footer from '../components/footer/Footer';
import Hero from '../components/hero/hero';
import Navbar from '../components/Navbar/Navbar';
import ProjectSection from '../components/ProjectSection/ProjectSection';
import Scrollbar from '../components/scrollbar/scrollbar';
import ServiceSection from '../components/ServiceSection/ServiceSection';

import usdtABI from '../components/abi/usdtABI.json'
import contractABI from '../components/abi/idoABI.json'
import { ethers } from 'ethers'

// const usdtAddress = "0x8E34DD67cB379B7f0Ec93b3422fabcd91b584CD4";
// const contractAddress = "0x4abA5c9A82d326CEEba2826f946614aB977c1Ef5";
const usdtAddress = "0x55d398326f99059fF775485246999027B3197955";
const contractAddress = "0xDCfFB2C8c01a99b7baa95643684C3C4D1D49c0D1";

export default function Home() {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [usdtContract, setUsdtContract] = useState(null);

  const handleDefaultAccount = (value) => {
    setDefaultAccount(value);
  }

  const handleCorrectNetwork = (value) => {
    setIsCorrectNetwork(value)
  }

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, contractABI, tempSigner)
    setContract(tempContract);

    let tempUSDTContract = new ethers.Contract(usdtAddress, usdtABI, tempSigner)
    setUsdtContract(tempUSDTContract);
  }

  useEffect(() => {
    if (isCorrectNetwork === false) return;
    console.log("Change Account to : " + defaultAccount)
    if (defaultAccount !== null)
      updateEthers()
  }, [defaultAccount, isCorrectNetwork])

  return (
    <div id='scrool'>
      <CommonHead />
      <Fragment>
        <div className="br-app">
          <Navbar
            defaultAccountChange={handleDefaultAccount}
            isCorrectNetwork={handleCorrectNetwork}
          />
          <Hero />
          <About
            defaultAccount={defaultAccount}
            contract={contract}
            usdtContract={usdtContract}
            provider={provider}
            signer={signer}
            isCorrectNetwork={isCorrectNetwork}
          />
          <ServiceSection />
          <ExprienceSec
            defaultAccount={defaultAccount}
            contract={contract}
            usdtContract={usdtContract}
            provider={provider}
            signer={signer}
            isCorrectNetwork={isCorrectNetwork}
          />
          <ProjectSection
            defaultAccount={defaultAccount}
            contract={contract}
            usdtContract={usdtContract}
            provider={provider}
            signer={signer}
            isCorrectNetwork={isCorrectNetwork}
          />
          <Footer />
          <Scrollbar />
        </div>
      </Fragment>
    </div>
  )
}
