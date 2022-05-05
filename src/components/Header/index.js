import React from 'react';
import logo from "../../assets/img/logo.svg"
import Button from "../UI/Button";
import useUsers from "../../hooks/useUsers";
import {Link} from "react-scroll";
import './Header.scss';

const Header = () => {
    const auth = useUsers();

    return (
        <header className="header">
            <div className="container">
                <img src={logo} alt="logo" className="header__logo"/>
                <div className="header__right">
                    <Link to="getRequest" smooth={true} duration={500}>
                        <Button
                            className="btn btn__small btn__header btn__header__ml"
                        >
                            Users
                        </Button>
                    </Link>
                    <Link to="postRequest" smooth={true} duration={500}>
                        <Button
                            className="btn btn__small btn__header"
                            disabled={auth.userRegistered}
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;