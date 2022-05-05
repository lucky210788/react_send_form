import React from 'react';
import Title from "../UI/Title";
import successImage from '../../assets/img/success-image.svg'
import './SuccessfullyRegistered.scss'

const SuccessfullyRegistered = () => {
    return (
        <section className="successfully-registered">
            <div className="container">
                <Title className="title">User successfully registered</Title>
                <img src={successImage} alt="" className="successfully-registered__img"/>
            </div>
        </section>
    );
};

export default SuccessfullyRegistered;