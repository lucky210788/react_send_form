import React from 'react';
import Button from "../UI/Button";
import useUsers from "../../hooks/useUsers";
import Title from "../UI/Title";
import {Link} from "react-scroll";
import "./FirstScreen.scss"

const FirstScreen = () => {
    const auth = useUsers();

    return (
        <section className="first-screen">
            <div className="container">
                <Title className="title title__first-screen">Test assignment for front-end developer</Title>
                <p className="first-screen__text">What defines a good front-end developer is one that has skilled
                    knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building
                    web interfaces with accessibility in mind. They should also be excited to learn, as the world of
                    Front-End Development keeps evolving.</p>
                <Link to="postRequest" smooth={true} duration={500}>
                    <Button
                        className="btn btn__small"
                        disabled={auth.userRegistered}
                    >
                        Sign up
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default FirstScreen;