import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import noPhoto from "../../assets/img/photo-cover.svg";
import "./User.scss"

const User = ({name, email, phone, position, photo}) => {
    return (
        <div className="user">
            <div className="user__photo">
                <img src={photo ? photo : noPhoto} alt=""/>
            </div>
            <p className="user__name">{name}</p>
            <p className="user__position">{position}</p>
            <Tippy
                arrow={false}
                content={email}
                placement="bottom"
            >
                <a href={"mailto:" + email} className="user__email">{email}</a>
            </Tippy>
            <p className="user__phone">{phone}</p>
        </div>
    );
};

export default User;