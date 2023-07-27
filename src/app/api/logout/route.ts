import { NextResponse } from "next/server";

export async function GET() {
    try{
        const response = NextResponse.json({
            message : "Logout Successfull",
            success: true,
        });
    
        return response;
    }catch(error:any){
        console.log(error)
        return NextResponse.json({error: error.message},{status : 500});
    }
}