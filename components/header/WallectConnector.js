import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import swal from 'sweetalert'

const WalletConnect = ({ defaultAccountChange, isCorrectNetwork }) => {
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [correctNetwork, setCorrectNetwork] = useState(null);
    const [connectButtonText, setConnectButtonText] = useState("连接钱包")

    useEffect(() => {
        changingAccount();
        defaultAccountChange(defaultAccount);
    }, [defaultAccount])

    async function changingAccount() {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                connectWalletHandler()
            })
        }
    }

    const connectWalletHandler = async () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(async (result) => {
                    await accountChangeHandler(result[0]);
                    setConnectButtonText(`${result[0].slice(0, 4)}...${result[0].slice(-4)}`);
                })
        } else {
            alert('Need to install MetaMask!')
        }
    }

    const accountChangeHandler = async (newAccount) => {
        checkCorrectNetwork();
        setDefaultAccount(newAccount);
    }

    const checkCorrectNetwork = async () => {
        const { ethereum } = window
        let chainId = await ethereum.request({ method: 'eth_chainId' })
        // console.log('Connected to chain:' + chainId)

        // const netWorkID = '0x42'
        const netWorkID = '0x61'
        // const netWorkID = '0x38'

        if (chainId !== netWorkID) {
            // setCorrectNetwork(network => network = false)
            setCorrectNetwork(false)
            isCorrectNetwork(false)
            swal("Error", "Please Connect to the Correct Network", "error")
        } else {
            isCorrectNetwork(true)
            setCorrectNetwork(true)
        }
    }
    const styles = {
        button: {
            position: 'fixed',
            right: '5vw',
            top: '10px',
            maxWidth: '120px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
        }
    };
    return (
        <div className="btnConnect">
            <button
                onClick={connectWalletHandler}
                className="btn btn-primary rounded-pill"
                style={styles.button}
            >{connectButtonText}</button>
        </div>
    )
}

export default WalletConnect
