import gsap from "gsap";
import { Album } from "../types";

export const animateAlbumCards = (
  albums:Partial<Album>[], 
  albumListRef: React.RefObject<HTMLDivElement[]>
) => {
  if (albums && albums.length !== 0 && albumListRef.current && albumListRef.current.length !== 0) {
    albumListRef.current.forEach((el, index) => {
      gsap.to(el, {
        x: `${(index + 1) * 100}%`,
        opacity: 1,
        duration: 1.1,
        delay: 0.3,
        ease: "power1.out",
      });
    });
  }
};

export const resetAlbumCardsAnimation = (
  isUserSearching: boolean, 
  albumListRef: React.RefObject<HTMLDivElement[]>
) => {
  if (isUserSearching && albumListRef.current) {
    albumListRef.current.forEach((el, index) => {
      gsap.to(el, {
        x: `-${(index + 1) * 100}%`,
        opacity: 0,
        duration: 1.1,
        delay: 0.3,
        ease: "power1.out",
      });
    });
  }
};



export const animateOtherAlbums = (
  clickedIndex: number,
  albumListRef: React.RefObject<HTMLDivElement[]>,
  setResetListRef: React.Dispatch<React.SetStateAction<boolean>>, 
  dispatch: (action: { type: 'IS_MODAL_OPEN'; payload: { index: number; isOpen: boolean } }) => void 
) => {
  setResetListRef(true);

  setTimeout(() => {
    const clickedElement = albumListRef.current[clickedIndex];
    const clickedRect = clickedElement.getBoundingClientRect();

    const containerRect = albumListRef.current[0]?.parentElement?.getBoundingClientRect();

    const clickedPosition = {
      top: clickedRect.top - (containerRect ? containerRect.top : 0),
      left: clickedRect.left - (containerRect ? containerRect.left : 0),
      width: clickedRect.width,
      height: clickedRect.height,
    };

    albumListRef.current.forEach((el, index) => {
      if (index !== clickedIndex) {
        const newPosition = {
          left: clickedPosition.left + clickedPosition.width,
          top: clickedPosition.top,
        };

        gsap.to(el, {
          x: `-${(index + 1) * 100}%`,
          duration: 1.1,
          ease: "power1.out",
        });

        gsap.to(el, {
          opacity: 0,
          x: newPosition.left,
          y: newPosition.top,
          duration: 1.1,
          zIndex: 0,
          ease: "power1.out",
          onComplete: () => {
            setResetListRef(false);
            dispatch({
              type: 'IS_MODAL_OPEN',
              payload: {
                index: clickedIndex,
                isOpen: true,
              },
            });
          },
        });
      }
    });
  }, 100);
};

