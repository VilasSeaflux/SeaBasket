import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";
import './breadcrumb.css';
import { useRouter } from "next/navigation";
export default function BreadCrumb(props: any) {
    const router = useRouter();
    return (
        <Breadcrumb id="breadcrumb" className="pb-0 mb-0">
            <Breadcrumb.Item className="item pt-1">
                <span onClick={() => router.push('/')}>
                    Home
                </span>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="item pt-1">
                Category
            </Breadcrumb.Item>
            {
                props.endpoint ? (
                    <>
                        <Breadcrumb.Item className="item pt-1">
                            <span onClick={() => router.back()}>{props.name}</span>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item active={true} className="item pt-1">
                            {props.endpoint.substring(0, 20) + '...'}
                        </Breadcrumb.Item>
                    </>
                ) : (
                    <Breadcrumb.Item active={true} className="item pt-1">
                        {props.name}
                    </Breadcrumb.Item>
                )
            }
        </Breadcrumb>
    );
}