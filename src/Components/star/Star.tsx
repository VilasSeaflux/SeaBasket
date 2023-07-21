import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";

export default function Star({rating}:{rating:number}){
    const isInt = Number.isInteger(rating);
    const toRound = parseInt(rating);
    console.log(isInt);
    return(
        <div>
            {
                [...Array(toRound)].map((num,index) => (
                    <BiSolidStar key={index} fill="#FFBF00" className="h4"/>
                ))
            }
            {
                !isInt ? <BiSolidStarHalf  fill="#FFBF00" className="h4"/> : ''
            }
        </div>
    )
}