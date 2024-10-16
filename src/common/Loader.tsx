import { SiDiscogs } from "react-icons/si";
import { createPortal } from 'react-dom';

const Loader = (): JSX.Element => {

    
    return createPortal(
        <div className="loader-container">
            <SiDiscogs className="spinner"/>
        </div>,
        document.body
    )
}
;
export default Loader