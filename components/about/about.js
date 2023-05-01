import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { ethers } from 'ethers'
import { useRouter } from 'next/router';
import Loading from '../Loading';

const defaultInviter = "0xE5C13C82dd555960c0aB9A00969fd52a16bD986B";

const About = (props) => {
    console.log(props)
    const [inviterAddress, setInviterAddress] = useState(defaultInviter)
    const [isInviterSet, setIsInviterSet] = useState(false)

    const [isJoined, setIsJoined] = useState(false);
    const [isIDOActive, setIsIDOActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGetOnce, setIsGetOnce] = useState(false);

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
        let tempBalance = ethers.utils.formatEther(`${tempBalanceHex}`)
        console.log("My balance is " + tempBalance);
        return tempBalance;
    }

    const checkAllowance = async () => {
        console.log("Checking Allowance...");
        let allowance = await props.usdtContract.allowance(props.defaultAccount, props.contract.address);
        const allowanceAmount = ethers.utils.formatEther(`${allowance}`)
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
            etherAmount = ethers.utils.parseEther(`${value}`);
            console.log("In handle contribute")
            console.log(`
            Inviter : ${inviterAddress}
            USDT Amount : ${etherAmount}`)
            let result = await props.contract.makeIDO(
                inviterAddress, etherAmount, { gasLimit: "1000000" }
            );

            if (!result) {
                swal("错误", "认购失败", "error");
            } else {
                setIsJoined(true);
                if (value === 50)
                    swal("成功", "成功认购 50 USDT", "success");
                if (value === 100)
                    swal("成功", "成功认购 100 USDT", "success");
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
        const approveAmount = ethers.utils.parseEther(value.toString());

        if (result >= value) {
            console.log(`Allowance ${result}`)
            console.log(`ApproveAmount ${approveAmount}`)
            console.log(`Allowance is enought for ${value} USDT`)
            handleContribute(value)
        }
        else
            try {
                console.log(`Allowance is NOT enought for ${value} USDT`)
                let result2 = await props.usdtContract.approve(props.contract.address, approveAmount);
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
                                <h2>Paofu </h2>
                                <hr />
                            </div>
                            <h5>Token Vesting Mechanism</h5>
                            <div className="wpo-about-funfact">
                                <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div className="grid">
                                        <div className="grid-inner">
                                            <h3><span data-count="98">1</span> USDT</h3>
                                            <p>Unlocked</p>
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <div className="grid-inner">
                                            <h3><span data-count="92">100</span> USDT</h3>
                                            <p>Locked</p>
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <div className="grid-inner">
                                            <h3><span data-count="88">101</span> USDT</h3>
                                            <p>Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>IDO With 50 / 100 USDT</h5>
                            <div className="wpo-about-funfact">
                                <div className="grid" style={{ cursor: "pointer" }}>
                                    <div className="grid-inner" onClick={() => joinIDO(50)}>
                                        <h3><span data-count="72">50</span></h3>
                                        <p>USDT</p>
                                    </div>
                                </div>
                                <div className="grid" style={{ cursor: "pointer" }}>
                                    <div className="grid-inner" onClick={() => joinIDO(100)}>
                                        <h3><span data-count="43">100</span></h3>
                                        <p>USDT</p>
                                    </div>
                                </div>
                            </div>
                            <h5 style={{ color: 'red' }}>** Participate Paofu IDO With The Button Above **</h5>
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