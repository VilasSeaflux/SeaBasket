import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { Cookies } from "react-cookie";

const useAuth = () => {
    const [isAuth,setIsAuth] = useState(false);
    const router = useRouter();
    const cookies = new Cookies();
    const token = cookies.get('token');

    useEffect(() => {        
        if(token){
            setIsAuth(true)
        }
    },[router,token]);
    return {token,isAuth};
}

export default useAuth;