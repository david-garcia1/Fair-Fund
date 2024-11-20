import { useState, useEffect, useLayoutEffect } from 'react';
// import { retrieveUsers } from '';
// import type { UserData } from ''

import ErrorPage from './ErrorPage';
// import UserList from '';
// import auth from '';

const Home = () => {

    const [users, setUsers] = useState<T[]>([]); 
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);   

    useEffect(() => {
        if (loginCheck) {
            // fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        // checkLogin();
    }, []);

    const checkLogin = () => {
        // if (auth.loggedIn()) {
        //     setLoginCheck(true);
        // }
    };

    const fetchUsers = async () = {
        try {
            // const data = await retrieveUsers();
            // setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if(error) {
        return <ErrorPage />;
    }


    return (
        <>
            {
                !loginCheck ? (
                    <div className=''>
                        <h1>
                            Log in!
                        </h1>
                    </div>
                ) : (
                    <div>placeholder</div>
                    // <UserList users={users} />
                )
            }
        </>
    )
}

export default Home;