import React, { useState, useEffect } from 'react';

const Loading = () => {
    const [spin, setSpin] = useState(0);
    const wrapperStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "40px",
        zIndex: "50",
    }

    const spinnerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "black",
        width: "100vw",
        maxWidth: "400px",
        height: "100px",
        flexDirection: "column",
    }

    const insideSpinnerStyle = {
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        transform: `rotate(${spin}deg)`,
        transition: 'transform 1s linear',
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSpin(spin + 10);
        }, 50);
        return () => clearInterval(intervalId);
    }, [spin]);

    return (
        <div className="spinner-wrapper" style={wrapperStyle}>
            <div className="loading-spinner" style={spinnerStyle}>
                <p>授權中...</p>
                <div className="spinner" style={insideSpinnerStyle} />
            </div>
        </div>
    );
};

export default Loading;
