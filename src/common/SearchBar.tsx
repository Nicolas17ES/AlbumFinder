import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import useDebounce from "../hooks/useDebounce";
import { searchAlbum, getAlbums } from "../context/Actions";
import { CiSearch } from "react-icons/ci";
import useTypingTimeout from "../hooks/useTypingTimeout";

const SearchBar = (): JSX.Element => {

    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    

    const {dispatch} = useContext(Context);

    const debouncedValue = useDebounce(searchTerm, 700);
    const { isUserTyping, startTypingTimeout } = useTypingTimeout(700);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchTerm(value);
        startTypingTimeout();
        dispatch({
            type: 'SET_DEBOUNCED_VALUE',
            payload: value,
        })
    };

    useEffect(() => {
        if(debouncedValue && debouncedValue !== '') {
            searchAlbum(dispatch, debouncedValue)
        } else if(searchTerm === '') {
            dispatch({
                type: 'GET_ALBUMS',
                payload: null,
            })
            getAlbums(dispatch)
        }
    }, [debouncedValue, dispatch]);

    useEffect(() => {
         dispatch({
                type: 'IS_USER_SEARCHING',
                payload: isUserTyping,
            })
    }, [isUserTyping, dispatch])


    return (
        
        <div className="search-container">
            <CiSearch className="search-icon" />
            <input
                className="search-bar"
                onChange={handleChange}
                value={searchTerm}
                type="search"
                name="search"
                id="search"
                autoComplete="off"
                placeholder="Search..."
            />
        </div>
    )
}
;
export default SearchBar