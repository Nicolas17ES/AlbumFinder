import { SiDiscogs } from "react-icons/si";
import SearchBar from "../common/SearchBar";
import { useLocation } from 'react-router-dom';
import { useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

const Header = (): JSX.Element => {

    const {dispatch} = useContext(Context)
    const location = useLocation();
    const path = location.pathname
    const navigate = useNavigate();

    const resetAlbums = (): void => {
       if(path !== '/') {
         dispatch({type: 'GET_ALBUMS', payload: null});
            navigate('/');
       }
    }
    
    return (
        <nav className="nav-navigation-container">
            <ul className="nav-ordered-list">
                <div onClick={resetAlbums}  className="page-name">
                     <SiDiscogs size={25}/>
                    <h2 > Record Finder</h2>
                </div>
                {location.pathname === '/' && <SearchBar/>}
            </ul>
        </nav>
    )
}
;
export default Header