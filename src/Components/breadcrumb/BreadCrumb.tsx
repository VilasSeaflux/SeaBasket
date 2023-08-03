import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/navigation";
import './breadcrumb.css';
const BreadCrumb: FC = (props: any) => {
    const router = useRouter();
    return (
        <Breadcrumb id="breadcrumb" className="pb-0 mb-0">
            <Breadcrumb.Item className="item pt-2 ps-2" onClick={() => router.push('/')}>
                Home
            </Breadcrumb.Item>
            <Breadcrumb.Item className="item pt-2">
                Category
            </Breadcrumb.Item>
            {
                props.endpoint ? (
                    <>
                        <Breadcrumb.Item className="item pt-2">
                            <span onClick={() => router.back()}>{props.name}</span>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item active={true} className="item pt-2">
                            {props.endpoint.substring(0, 20) + '...'}
                        </Breadcrumb.Item>
                    </>
                ) : (
                    <Breadcrumb.Item active={true} className="item pt-2">
                        {props.name}
                    </Breadcrumb.Item>
                )
            }
        </Breadcrumb>
    );
}
export default BreadCrumb;