import React, { useState, useEffect } from 'react';
import swal from 'sweetalert'


const ProjectSection = (props) => {

    const [isClaimActive, setIsClaimActive] = useState(true);
    const [isJoined, setIsJoined] = useState(false);
    const [hasClaimed, setHasClaimed] = useState(false);

    useEffect(() => {
        if (props.isCorrectNetwork !== true) return;
        const getContractValue = async () => {
            if (props.contract === null) return;

            let tempClaimActive = await props.contract.isClaimActive();
            console.log("The claim is active? " + tempClaimActive)
            setIsClaimActive(tempClaimActive);

            let tempJoin = await props.contract.isAddressJoined(props.defaultAccount);
            console.log("The address has joined? " + tempJoin)
            setIsJoined(tempJoin);

            let tempHasClaimed = await props.contract.isAddressClaimed(props.defaultAccount);
            console.log("The address has claimed? " + tempHasClaimed)
            setHasClaimed(tempHasClaimed);

            console.log(`
            isClaimActive : ${tempClaimActive}
            isJoined : ${tempJoin}
            hasClaimed : ${tempHasClaimed}
            `
            )
        }
        getContractValue()
    }, [props.defaultAccount, props.contract, props.isCorrectNetwork])

    const handleClaim = async () => {
        if (props.isCorrectNetwork === false) {
            swal("错误", "请连结到正确网路 并重新整理页面", "error");
            return;
        }

        if (!isClaimActive) {
            swal("错误", "未开放提币", "error")
            return;
        }

        if (!isJoined) {
            swal("错误", "您并未参加IDO", "error")
            return;
        }

        if (hasClaimed) {
            swal("错误", "您已经提币", "error")
            return;
        }

        if (props.contract === null) {
            swal("错误", "请连接钱包", "error")
            return;
        }

        props.contract.claimToken({ gasLimit: "1000000" }).then((result) => {
            console.log(result);
            swal("成功", "已成功提币", "success")
        }, (err) => {
            console.log(err);
        })
        return;
    }

    return (
        <div className="wpo-project-area section-padding" id='portfolio'>
            <div className="container">
                <div className="wpo-section-title-s2">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-12">
                            <div className="title">
                                <h2>提币</h2>
                                <p>点击按钮即可领币</p>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-2">
                            <div className="sec-title-icon" onClick={handleClaim}>
                                <i className="fi flaticon-self-growth"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectSection;