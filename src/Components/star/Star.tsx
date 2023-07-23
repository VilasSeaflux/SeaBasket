import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";

export default function Star({rating}:{rating:number}){
    // console.log(rating)
    const isInt = Number.isInteger(rating);
    const toRound = Math.floor(rating);
    // console.log(isInt);
    return(
        <div>
            {
                [toRound].map((num,index) => (
                    <BiSolidStar key={index} fill="#FFBF00" className="h4"/>
                ))
            }
            {
                !isInt ? <BiSolidStarHalf  fill="#FFBF00" className="h4"/> : ''
            }
        </div>
    )
}