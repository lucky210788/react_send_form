import React, {useEffect} from 'react';
import Title from "../UI/Title";
import Button from "../UI/Button";
import User from "../User";
import Loader from "../UI/Loader";
import useUsers from "../../hooks/useUsers";
import "./GetRequest.scss"

const GetRequest = () => {
    const auth = useUsers();

    const handleClick = () => {
        auth.setPage(auth.page + 1);
    }

    useEffect(() => {
        auth.loadData();
    }, [auth.page]);

    return (
        <section className="get-request" id="getRequest">
            <div className="container">
                <Title className="title">Working with GET request</Title>
                {
                    auth.isLoadingUsers
                        ? <Loader/>
                        : <div className="users-list">
                            {
                                auth.users && auth.users.map(user => (
                                    <User
                                        key={user.id}
                                        name={user.name}
                                        email={user.email}
                                        phone={user.phone}
                                        position={user.position}
                                        photo={user.photo}/>
                                ))
                            }
                        </div>
                }
                {
                    auth.page !== auth.totalPages && <Button
                        className="btn"
                        onClick={handleClick}
                        disabled={auth.isLoadingUsers}
                    >
                        Show more
                    </Button>
                }
            </div>
        </section>
    );
};

export default GetRequest;