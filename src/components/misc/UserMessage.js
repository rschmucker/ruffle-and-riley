/**
 * A component to render the user messages.
 */
import React from 'react';

function UserMessage({ message, index }) {
    return (
        <p 
            className={`user-message ${message.misconception ? 'gray-bg' : ''}`} 
            key={index} 
        >
            {message.text}
        </p>
    );
}

export default UserMessage;
