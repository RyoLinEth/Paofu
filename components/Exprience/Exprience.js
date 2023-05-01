import React, { useState, useEffect } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import swal from 'sweetalert'

const Expriences = [
    {
        date: '专属邀请连结',
    },
]


const ExprienceSec = (props) => {
    const defaultInviteLink = "尚未连结钱包";
    const [inviteLink, setInviteLink] = useState(defaultInviteLink);

    const generateLink = (value) => {
        let tempLink = window.location.origin + "/?inviter=" + value;
        setInviteLink(tempLink);
    }

    
    const copyLink = () => {
        if (inviteLink === defaultInviteLink) {
            swal("错误", "尚未连结钱包", "error")
            return;
        }
        navigator.clipboard.writeText(inviteLink).then(() => {
            swal("成功", `已成功复制连结 ${inviteLink}`, "success")
        }, (err) => {
            swal("错误", "复制失败 请手动复制连结", "error")
        })
    }

    useEffect(() => {
        if (props.defaultAccount !== null) {
            generateLink(props.defaultAccount);
        }
    }, [props.defaultAccount])

    return (
        <div className="wpo-work-area section-padding" id="experience">
            <div className="container">
                <SectionTitle Title={'我的邀请连结'} />
                <div className="wpo-work-wrap">
                    {Expriences.map((exprience, exp) => (
                        <div className="wpo-work-item" key={exp}>
                            <ul>
                                <li className="date">{exprience.date}</li>
                                <li style={{ wordWrap: 'break-word', maxWidth: '80vw' }}>{inviteLink}</li>
                                <li className="link" onClick={copyLink}>
                                    <a>复制连结</a>
                                </li>
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