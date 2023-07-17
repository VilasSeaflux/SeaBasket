'use client'
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Cookies } from "react-cookie";

const Profile: FC = () => {
    // const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();
    const {isAuth,token} = useAuth();
    console.log(token,isAuth);

    // const token = JSON.stringify(localStorage.getItem('token'));
    // console.log(token);
    // const cookies = new Cookies();
    // console.log(cookies);
    // const cToken = cookies.get('token');

    // useEffect(() => {
    //     (async () => {
    //         if(!cToken) {
    //             return router.push('/login');
    //         }
    //     })();
    //     setIsAuth(true);
    // },[router,cToken]);

    if(!isAuth){
       return <p>Loading....</p>
    }

    return (
        <h1>Profile page</h1>
    )
}

export default Profile