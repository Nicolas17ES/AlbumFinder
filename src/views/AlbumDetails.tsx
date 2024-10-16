import { useRef, useContext, useEffect } from 'react';
import Context from '../context/Context';
import gsap from 'gsap';

const AlbumDetails = (): JSX.Element | null => {

    const {album, isModalOpen} = useContext(Context);

    const modalContentRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (isModalOpen?.isOpen && modalContentRef.current) {
            gsap.to(modalContentRef.current, {
                opacity: 1,           
                duration: 1.1,        
                ease: "power2.out",   
                delay: .65,          
            });
        } 
    }, [isModalOpen]);
    
    if(!album) return null;
    
    return (
        <div ref={modalContentRef}  className="album-details-container">
            <div className="sub-container">
                <section className="album-details-section">
                    <img src={album.images[0].resource_url} alt="" className="section-image" />
                </section>
                <section className="album-details-section">
                    <h3 className="details-artist-name"><span className='span-details'>ARTIST NAME:</span> <span className='span-value'>{album.artists[0].name}</span></h3>
                    <h3 className="details-artist-name"><span className='span-details'>ALBUM NAME:</span> <span className='span-value' >{album.title}</span></h3>
                    <h3 className="details-artist-name"><span className='span-details'>YEAR:</span> <span className='span-value'>{album.year}</span></h3>
                    <h3 className="details-artist-name"><span className='span-details'>LOWEST PRICE:</span> <span className='span-value'>{album.lowest_price}</span></h3>
                </section>
            </div>
        </div>
    )
}
;
export default AlbumDetails