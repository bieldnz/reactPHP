import { AiOutlineLoading } from "react-icons/ai";
import Styles from "../style/loading.module.css";

type LoadingType = {
    loading: boolean
}

const Loading = ({ loading }: LoadingType) => {
    return (
        <>
            {loading ? <div className={Styles.loading}>
                <AiOutlineLoading />
            </div> : ""}
        </>
    )
}

export default Loading