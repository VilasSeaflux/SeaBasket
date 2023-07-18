import CredentialsProvider from "next-auth/providers/credentials";
import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import NextAuth from "next-auth/next";
import axios from "@/Helper/axios";
import { LOGIN } from "@/Helper/CONSTANTS";

 export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                emailOrPhoneNo: { label: "emailOrPhoneNo", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials,req){
                const {emailOrPhoneNo,password} = credentials as any;
                const res = await axios.post(
                    LOGIN,
                    JSON.stringify({emailOrPhoneNo,password})
                );
                const user = await res.data;

                if(res.statusText && user){
                    return user;
                }else return null;
            }
        })

    ],
    session: {
        strategy: "jwt"
    }
 }

 export default NextAuth(authOptions);


