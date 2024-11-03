import React from 'react'
import './loading.css'; // Import the CSS for styling

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-animation">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        </div>
    )
}

export default Loading