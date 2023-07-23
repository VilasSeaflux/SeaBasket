"use client"
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Col } from "react-bootstrap";
import Image from "next/image";
import laptop from '../../../public/images/cat_laptop.jpg';

const CategoryCard: FC = (props:any) => {
    const route = useRouter();
    return (
        <Col sm={6} md={3}>
            <div className="card" onClick={() => route.push(`category/${props.title}`)}>
                <div className="card-body">
                    <Image src={laptop} alt="categoryImage" className="category img-fluid" />
                    <div className="card-text">
                        <p className="small">{props.title}</p>
                    </div>
                </div>
            </div>
        </Col>
    );
}

export default CategoryCard;