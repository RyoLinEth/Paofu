import React, { useState, useEffect } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import swal from 'sweetalert'
import { ethers } from 'ethers'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ExprienceSec = (props) => {
    const defaultInviteLink = "钱包未链接";
    const [inviteLink, setInviteLink] = useState(defaultInviteLink);
    const [invitationAmount_1, setInvitationAmount_1] = useState(0);
    const [invitationAmount_2, setInvitationAmount_2] = useState(0);
    const [usdtDecimal, setUsdtDecimal] = useState(9);
    const [copied, setCopied] = useState(false);

    const Expriences = [
        {
            title: '邀请链接',
            content: inviteLink,
            isButton: true,
            button_content: "复制链接",
        },
        {
            title: '直推收益 (3%) ',
            content: invitationAmount_1,
            isButton: false,
            button_content: "",
        },
        {
            title: '间推收益 (2%) ',
            content: invitationAmount_2,
            isButton: false,
            button_content: "",
        }
    ]


    const generateLink = (value) => {
        let tempLink = window.location.origin + "/?inviter=" + value;
        setInviteLink(tempLink);
    }


    const handleCopyLink = () => {
        if (inviteLink === defaultInviteLink) {
            swal("错误", "尚未连结钱包", "error")
            return;
        }
        swal("成功", `已成功复制连结 ${inviteLink}`, "success")
        return;
    }

    useEffect(() => {
        if (props.defaultAccount !== null) {
            generateLink(props.defaultAccount);
        }
    }, [props.defaultAccount])

    const hexToDecimal = (value) => {
        return ethers.utils.formatUnits(`${value}`, usdtDecimal);
    }

    useEffect(() => {
        if (props.isCorrectNetwork !== true) return;
        const getContractValue = async () => {
            if (props.contract === null) return;

            let tempInvitationAmount_1 = await props.contract.invitationAmount_1(props.defaultAccount);
            setInvitationAmount_1(hexToDecimal(tempInvitationAmount_1));

            let tempInvitationAmount_2 = await props.contract.invitationAmount_2(props.defaultAccount);
            setInvitationAmount_2(hexToDecimal(tempInvitationAmount_2));

            let tempDecimal = await props.usdtContract.decimals();
            setUsdtDecimal(tempDecimal);
        }
        getContractValue();
    }, [props.contract, props.defaultAccount, props.isCorrectNetwork])

    return (
        <div className="wpo-work-area section-padding" id="experience">
            <div className="container">
                <SectionTitle Title={'我的邀请链接'} />
                <div className="wpo-work-wrap">
                    {Expriences.map((exprience, exp) => (
                        <div className="wpo-work-item" key={exprience.title}>
                            <ul>
                                <li className="date">
                                    {exprience.title}
                                </li>

                                <li style={{ wordWrap: 'break-word', maxWidth: '80vw' }}>
                                    {
                                        exprience.isButton &&
                                        exprience.content
                                    }
                                    {
                                        !exprience.isButton && props.defaultAccount !== null &&
                                        <span style={{ marginLeft: '10px' }}>
                                            {exprience.content} USDT
                                        </span>
                                    }
                                </li>
                                {
                                    !exprience.isButton && props.defaultAccount === null &&
                                    <li style={{ wordWrap: 'break-word', maxWidth: '80vw' }}>
                                        链接钱包查看邀请收益
                                    </li>
                                }
                                {
                                    exprience.isButton &&
                                    <CopyToClipboard text={
                                        inviteLink === defaultInviteLink ? window.location.origin : inviteLink
                                    }
                                        onCopy={() => setCopied(true)}
                                    >
                                        <li
                                            onClick={handleCopyLink}
                                        >
                                            <a style={{ cursor: 'pointer' }}>复制链接</a>
                                        </li>
                                    </CopyToClipboard>
                                }
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="shape-wk">
                <svg width="1500" height="1500" viewBox="0 0 1500 1500" fill="none">
                    <g opacity="0.45" filter="url(#filter0_f_39_4214)">
                        <circle cx="750" cy="750" r="200" />
                    </g>
                    <defs>
                        <filter id="filter0_f_39_4214" x="0" y="0" width="1500" height="1500"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="275" result="effect1_foregroundBlur_39_4212" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

export default ExprienceSec;