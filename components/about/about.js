import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { ethers } from 'ethers'
import { useRouter } from 'next/router';
import Loading from '../Loading';
import SectionTitle from "../SectionTitle/SectionTitle";

const defaultInviter = "0xA263695d7487F16cb93655E90c9c7397d62cC30e";

const About = (props) => {
    const [inviterAddress, setInviterAddress] = useState(defaultInviter)
    const [isInviterSet, setIsInviterSet] = useState(false)

    const [isJoined, setIsJoined] = useState(false);
    const [isIDOActive, setIsIDOActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGetOnce, setIsGetOnce] = useState(false);
    const [usdtDecimal, setUsdtDecimal] = useState(18);

    useEffect(() => {
        if (props.isCorrectNetwork !== true) return;
        const getContractValue = async () => {
            if (props.contract === null) return;

            let tempJoin = await props.contract.isAddressJoined(props.defaultAccount);
            setIsJoined(tempJoin);

            let tempIDOActive = await props.contract.isIDOActive();
            setIsIDOActive(tempIDOActive);

            let tempDecimal = await props.usdtContract.decimals();
            setUsdtDecimal(tempDecimal);
        }

        getContractValue()
    }, [props.defaultAccount, props.contract, props.isCorrectNetwork])

    const checkBalance = async () => {
        let tempBalanceHex = await props.usdtContract.balanceOf(props.defaultAccount);
        let tempBalance = ethers.utils.formatUnits(`${tempBalanceHex}`, usdtDecimal);
        return tempBalance;
    }

    const checkAllowance = async () => {
        let allowance = await props.usdtContract.allowance(props.defaultAccount, props.contract.address);
        const allowanceAmount = ethers.utils.formatUnits(`${allowance}`, usdtDecimal)
        return allowanceAmount;
    }

    const checkAllowanceAgain = async (value) => {
        let result = await checkAllowance()

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
            etherAmount = ethers.utils.parseUnits(`${value}`, usdtDecimal);
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
        const approveAmount = ethers.utils.parseUnits(value.toString(), usdtDecimal);

        if (result >= value) {
            handleContribute(value)
        }

        else
            try {
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
        }
    }


    analyzeLink()


    return (
        <div className="wpo-about-area section-padding" id='about'>
            <div className="container">
                <SectionTitle Title={'TED IDO'} />
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
                                <span>
                                    参与 IDO
                                    <br />
                                    Web3智能合约生态挖矿平台天花板
                                </span>

                                <p style={{ textAlign: 'left', margin:'15px', wordBreak:'break-word' }} >
                                    1. 全球首发万币挖矿机制<br />
                                    2. 一年3.65倍出局<br />
                                    3. 代币价格只涨不跌<br />
                                    4. 上线放弃权限与LP打入黑洞<br />
                                    5. 一切机制合约执行平台安全有保障<br />
                                    6. 限时参与IDO，获得四倍算力<br />
                                    7. 100u参加可获得价值200u的矿机和200u的usd，一年可收益：200u × 3.65 × 3 = 2190u
                                </p>
                            </div>
                            <div className="client">
                                <h3><span data-count="100">100</span>%</h3>
                                <p>智能<br />合约</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 col-md-12 col-sm-12">
                        <div className="wpo-about-content">
                            <div className="wpo-about-title">
                                <h2>TED </h2>
                                <hr />
                            </div>

                            <h5>用 泰达币 ( USDT ) 参与 IDO</h5>
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
                            </div>
                            <h5 style={{ color: 'red' }}>** 使用上方按钮参加 TED IDO **</h5>
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