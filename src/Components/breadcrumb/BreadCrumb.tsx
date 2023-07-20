import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";
import './breadcrumb.css';
export default function BreadCrumb(props){
    return(
        <Breadcrumb id="breadcrumb" className="pb-0 mb-0">
            <Breadcrumb.Item className="item pt-1">
                <Link href="/">
                    Home
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="item pt-1">
                Category
            </Breadcrumb.Item>
            <Breadcrumb.Item active={true} className="pt-1">
                {props.name}
            </Breadcrumb.Item>
        </Breadcrumb>
    );
}