import React from 'react';
import "./Title.scss"

const Title = ({children, ...props}) => {
    return (
        <h2 {...props}>
            {children}
        </h2>
    );
};

export default Title;