import React from 'react';
import "./Input.scss"

const Input = ({type}) => {
    return (
        <div className="input-wrapper">
            <input
                type={type}
                id="user"
                required
            />
                <label htmlFor="user">user name</label>



        </div>
    );
};

export default Input;