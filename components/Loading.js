import React, { useState, useEffect } from 'react';

const Loading = () => {
    const [spin, setSpin] = useState(0);
    const loadingAnimationStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        transition: 'opacity 0.3s ease',
    };

    const insideSpinnerStyle = {
        border: '16px solid #f3f3f3',
        borderTop: '16px solid #3498db',
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        transform: `rotate(${spin}deg)`,
        transition: 'transform 1s linear',
        margin: 'auto'
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSpin(spin + 10);
        }, 50);
        return () => clearInterval(intervalId);
    }, [spin]);

    return (
        <div className="spinner-wrapper" style={loadingAnimationStyle}>
            {/* <p>Loading...</p> */}
            <div className="spinner" style={insideSpinnerStyle} />
        </div>
    );
};

export default Loading;
