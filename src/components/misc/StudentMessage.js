/**
 * A component to display a message submitted by the student (user).
 */
import React, { useEffect } from 'react';

function StudentMessage({ message, index, onCompleted  }) {
    // Call onCompleted once the component is mounted
    useEffect(() => {
        if (onCompleted) {
            onCompleted();
        }
    }, []);  // Empty dependency array ensures this runs only once after mount

    return (
        <p 
            className="system-message"
            key={index}
        >
            {message.text}
        </p>
    );
}

export default StudentMessage;
