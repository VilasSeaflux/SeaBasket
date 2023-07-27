import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const useAuth = () => {
    const [isAuth,setIsAuth] = useState(false);
    const router = useRouter();
    const token = JSON.parse(localStorage.getItem('token' || ''));

    useEffect(() => {        
        if(token){
            setIsAuth(true)
        }
    },[router,token]);
    return {token,isAuth};
}

export default useAuth;