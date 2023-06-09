import {Spinner} from "@/components/bootstrap";

type Props = {}
function Loading() {
    return <Spinner animation='border' className='d-block m-auto' />
}

export default Loading;