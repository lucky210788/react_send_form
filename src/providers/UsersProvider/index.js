import React, {useMemo, useState, useEffect} from 'react';
import {UsersContext} from "../../context/UsersContext";
import api from "../../services/api";

const UsersProvider = (props) => {
    const [users, setUsers] = useState(null);
    const [userRegistered, setUserRegistered] = useState(false);

    const [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [isLoadingUsers, setIsLoadingUsers] = React.useState(false);

    async function loadData() {
        try {
            setIsLoadingUsers(true);
            const {data} = await api.auth.getUsers(page);
            setUsers(data.users);
            setTotalPages(data.total_pages);
            setIsLoadingUsers(false);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        loadData();
    }, [page]);

    const contextValue = useMemo(
        () => ({
            users,
            setUsers,
            userRegistered,
            setUserRegistered,
            page,
            setPage,
            totalPages,
            isLoadingUsers,
            loadData,
        }),
        [users, setUsers, userRegistered, setUserRegistered, page, setPage, totalPages, isLoadingUsers, loadData]
    );

    return (
        <UsersContext.Provider value={contextValue}>
            {props.children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;