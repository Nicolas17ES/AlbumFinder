import { useContext, useEffect } from "react";
import Context from "../context/Context";
import { getAlbums } from "../context/Actions";
import Main from "../components/Main";

const Home = (): JSX.Element => {


    const { dispatch } = useContext(Context);

    useEffect(() => {
        getAlbums(dispatch);

        return () => {
            dispatch({
                type: 'GET_ALBUMS',
                payload: null
            })
        }
    }, [])

    return (
        <div className="home-container">
            <Main/>
        </div>
    )
}
;
export default Home