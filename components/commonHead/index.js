
import React from 'react'
import Head from 'next/head'

const CommonHead = (props) => {
    return (
        <Head>
            <title>TED IDO</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <meta name="description" content="TED IDO DAPP" />
            <link rel="icon"
                href="/TED.png"
            />
        </Head>
    )
}

export default CommonHead;
