import { useContext, useRef, useEffect, useState } from "react";
import Context from "../context/Context";
import AlbumCard from "./AlbumCard";
import { Album } from "../types";
import Loader from "../common/Loader";
import { animateAlbumCards, resetAlbumCardsAnimation, animateOtherAlbums } from "../animations/albumAnimations";

const Main = (): JSX.Element => {

    const {albums, isUserSearching, dispatch} = useContext(Context);
    const[resetListRef, setResetListRef] = useState<boolean>(false)

    const albumListRef = useRef<HTMLDivElement[]>([]);

    const addToRef = (el: HTMLDivElement | null): void => {
        if (el && !albumListRef.current.includes(el)) {
            albumListRef.current.push(el);
        }
    };

    useEffect(() => {
        if(albums) {
            animateAlbumCards(albums, albumListRef);
        }
    }, [albums]);

    useEffect(() => {
        resetAlbumCardsAnimation(isUserSearching, albumListRef);
    }, [isUserSearching]);

    useEffect(() => {
        if(!resetListRef){
            albumListRef.current = []; 
        }
        
    }, [albums, resetListRef]);
  

    const handleAnimateOtherAlbums = (clickedIndex: number) => {
        animateOtherAlbums(clickedIndex, albumListRef, setResetListRef, dispatch);
    };


    return (
        <>

            <h2 className="main-title">Top Picks of the Week</h2>
                <section  className="main-content"> 
                    {albums ? (
                        albums.length > 0 ? (
                            albums.map((album: Partial<Album>, index) => (
                            <div
                                className="album-container"
                                key={album.master_id}
                                ref={addToRef}
                                style={{
                                backgroundImage: `url(${album.cover_image})`,
                                zIndex: 5 -index,
                                }}
                            >
                                <AlbumCard album={album} index={index} animateOtherAlbums={handleAnimateOtherAlbums}/>
                            </div>
                            ))
                        ) : (
                            <div className="loader-container"><h4 className="album-notfound">No albums found.</h4></div>
                        )
                        ) : (
                             <Loader/>
                        )}
            </section>
            
        </>
    )
}
;
export default Main