
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Col } from "react-bootstrap";

const CategoryCard: FC = (props:any) => {
    const route = useRouter();
    return (
        <Col sm={6} md={3}>
            <div className="card" onClick={() => route.push(`category/${props.title}`)}>
                <div className="card-body">
                    <div className="card-text">
                        <p className="small">{props.title}</p>
                    </div>
                </div>
            </div>
        </Col>
    );
}

export default CategoryCard;