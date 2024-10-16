import { Album } from "../types";
import { useRef } from "react";
import { getAlbumById } from "../context/Actions";
import Context from "../context/Context";
import { useContext } from "react";
import React, { Suspense } from "react";

const LazyCurtainModal = React.lazy(() => import("../common/ModalCurtain"));

interface AlbumCardProps {
    album: Partial<Album>;
    index: number;
    animateOtherAlbums: (clickedIndex: number) => void; // New prop to animate other albums
}

const AlbumCard = ({ album, index, animateOtherAlbums }: AlbumCardProps): JSX.Element => {

    const {dispatch} = useContext(Context)
    const albumRef = useRef<HTMLDivElement>(null);

    const handleAlbumClick = (master_id: number): void => {
        getAlbumById(dispatch, master_id);
        animateOtherAlbums(index);
    };

    return (
        <div
            ref={albumRef}
            className="card-main-content"
            onClick={() => handleAlbumClick(album.master_id!)}
        >
            <div className="card-header">
                <h3 className="card-album-title">{album.title}</h3>
                <p className="card-album-year">{album.year}</p>
            </div>
            <Suspense >
                <LazyCurtainModal index={index} />
            </Suspense>
        </div>
    );
};

export default AlbumCard;
