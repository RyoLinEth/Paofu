import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { ethers } from 'ethers'
import { useRouter } from 'next/router';
import Loading from '../Loading';
import SectionTitle from "../SectionTitle/SectionTitle";

const defaultInviter = "0x364B3DeabfdEFA49684dFe0984af9CF8BB4f8951";

const About = (props) => {
    console.log(props)
    const [inviterAddress, setInviterAddress] = useState(defaultInviter)
    const [isInviterSet, setIsInviterSet] = useState(false)

    const [isJoined, setIsJoined] = useState(false);
    const [isIDOActive, setIsIDOActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGetOnce, setIsGetOnce] = useState(false);
    const [usdtDecimal, setUsdtDecimal] = useState(18);

    useEffect(() => {
        console.log(props.contract, props.isCorrectNetwork)
        if (props.isCorrectNetwork !== true) return;
        const getContractValue = async () => {
            if (props.contract === null) return;

            let tempJoin = await props.contract.isAddressJoined(props.defaultAccount);
            console.log("The address has joined? " + tempJoin)
            setIsJoined(tempJoin);

            let tempIDOActive = await props.contract.isIDOActive();
            console.log("The ido is active? " + tempIDOActive)
            setIsIDOActive(tempIDOActive);

            let tempDecimal = await props.usdtContract.decimals();
            setUsdtDecimal(tempDecimal);

            console.log(
                `
            isJoined : ${tempJoin}
            isIDOActive : ${tempIDOActive}
            `
            )
        }

        getContractValue()
    }, [props.defaultAccount, props.contract, props.isCorrectNetwork])

    const checkBalance = async () => {
        let tempBalanceHex = await props.usdtContract.balanceOf(props.defaultAccount);
        let tempBalance = ethers.utils.formatUnits(`${tempBalanceHex}`,usdtDecimal);
        console.log("My balance is " + tempBalance);
        return tempBalance;
    }

    const checkAllowance = async () => {
        console.log("Checking Allowance...");
        let allowance = await props.usdtContract.allowance(props.defaultAccount, props.contract.address);
        const allowanceAmount = ethers.utils.formatUnits(`${allowance}`,usdtDecimal)
        return allowanceAmount;
    }

    const checkAllowanceAgain = async (value) => {
        let result = await checkAllowance()
        console.log("In check allowance again : " + result);

        if (result < value) {
            setIsLoading(true);
            setTimeout(async () => {
                await checkAllowanceAgain(value)
                return;
            }, 3000)
        }
        else
            handleContribute(value);
    }

    const handleContribute = async (value) => {
        setIsLoading(false);
        try {
            let etherAmount;
            etherAmount = ethers.utils.parseUnits(`${value}`,usdtDecimal);
            console.log("In handle contribute")
            console.log(`
            Inviter : ${inviterAddress}
            USDT Amount : ${etherAmount}`)
            let result = await props.contract.makeIDO(
                inviterAddress, etherAmount,
                { gasLimit: "1000000" }
            );

            if (!result) {
                swal("错误", "认购失败", "error");
            } else {
                setIsJoined(true);
                swal("成功", "成功认购", "success");
            }
        } catch (err) {
            console.log(err)
        }

    }

    const joinIDO = async (value) => {
        if (props.isCorrectNetwork === false) {
            swal("错误", "请连结到正确网路 并重新整理页面", "error");
            return;
        }

        if (props.defaultAccount === null) {
            swal("错误", "请先连结钱包", "error");
            return;
        }
        if (isIDOActive === false) {
            swal("错误", "IDO 未开启", "error");
            return;
        }
        if (isJoined === true) {
            swal("错误", "您已参加过IDO", "error");
            return;
        }
        let balance = await checkBalance()

        if (value > balance) {
            swal("错误", "您没有足够的USDT", "error");
            return;
        }

        let result = await checkAllowance()
        const approveAmount = ethers.utils.parseUnits(value.toString(),usdtDecimal);

        if (result >= value) {
            console.log(`Allowance ${result}`)
            console.log(`ApproveAmount ${approveAmount}`)
            console.log(`Allowance is enought for ${value} USDT`)
            handleContribute(value)
        }

        else
            try {
                console.log(`Allowance is NOT enought for ${value} USDT`)
                let result2 = await props.usdtContract.approve(
                    props.contract.address, approveAmount
                );
                if (result2)
                    checkAllowanceAgain(value);
            } catch {
                swal("错误", "授权USDT失败", "error");
            }
    }

    const router = useRouter();
    const { pathname, query } = router;

    const analyzeLink = () => {
        if (inviterAddress !== defaultInviter) return;
        if (isInviterSet === true) return;
        let tempInviter = query['inviter']

        if (tempInviter !== undefined) {
            setInviterAddress(tempInviter);
            console.log("The Inviter Set to : " + tempInviter);
        }
    }


    analyzeLink()


    return (
        <div className="wpo-about-area section-padding" id='about'>
            <div className="container">
                <SectionTitle Title={'Safe LP IDO'} />
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-12 col-sm-12">

                        <div onClick={() => setIsLoading(false)}>
                            {
                                isLoading &&
                                <Loading />
                            }
                        </div>

                        <div className="wpo-about-exprience-wrap">
                            <div className="wpo-about-exprience">
                                <h2>IDO</h2>
                                <span>Participate IDO</span>
                            </div>
                            <div className="client">
                                <h3><span data-count="100">100</span>%</h3>
                                <p>Smart<br />Contract</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 col-md-12 col-sm-12">
                        <div className="wpo-about-content">
                            <div className="wpo-about-title">
                                <h2>Safe LP </h2>
                                <hr />
                            </div>

                            <h5>IDO With USDT</h5>
                            <div className="wpo-about-funfact">
                                <div className="grid" style={{ cursor: "pointer" }}>
                                    <div className="grid-inner" onClick={() => joinIDO(50)}>
                                        <h3><span data-count="95">50</span></h3>
                                        <p>USDT</p>
                                    </div>
                                </div>
                                <div className="grid" style={{ cursor: "pointer" }}>
                                    <div className="grid-inner" onClick={() => joinIDO(100)}>
                                        <h3><span data-count="72">100</span></h3>
                                        <p>USDT</p>
                                    </div>
                                </div>
                                <div className="grid" style={{ cursor: "pointer" }}>
                                    <div className="grid-inner" onClick={() => joinIDO(200)}>
                                        <h3><span data-count="43">200</span></h3>
                                        <p>USDT</p>
                                    </div>
                                </div>
                                <div className="grid" style={{ cursor: "pointer" }}>
                                    <div className="grid-inner" onClick={() => joinIDO(300)}>
                                        <h3><span data-count="11">300</span></h3>
                                        <p>USDT</p>
                                    </div>
                                </div>
                            </div>
                            <h5 style={{ color: 'red' }}>** Participate Safe LP IDO With The Button Above **</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ab-shape">
                <svg width="995" height="1495" viewBox="0 0 995 1495" fill="none">
                    <g opacity="0.3" filter="url(#filter0_f_39_4267)">
                        <circle cx="247.5" cy="747.5" r="247.5" fill="#FFE500" />
                    </g>
                    <defs>
                        <filter id="filter0_f_39_4267" x="-500" y="0" width="1495" height="1495"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_39_4267" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="ab-shape-s2">
                <svg width="1252" height="1901" viewBox="0 0 1252 1901" fill="none">
                    <g opacity="0.15" filter="url(#filter0_f_39_4265)">
                        <circle cx="950" cy="950.004" r="450" />
                    </g>
                    <defs>
                        <filter id="filter0_f_39_4265" x="-0.00012207" y="0.00402832" width="1900" height="1900"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_39_4265" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="line-shape-1">
                <img src="images/about/shape1.png" alt="" />
            </div>
            <div className="line-shape-2">
                <img src="images/about/shape2.png" alt="" />
            </div>
        </div >
    )
}

export default About;