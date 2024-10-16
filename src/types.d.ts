export interface ContextState {
    album: Album | null;
    albums: Partial<Album>[] | null;
    isUserSearching: boolean,
    isModalOpen: ModalObject | null,
    globalDebouncedValue: strign | null,
}

interface ModalObject {
    index: number,
    isOpen: boolean,
}


export type ContextAction =
    | { type: 'GET_ALBUM'; payload: Album | null }
    | { type: 'GET_ALBUMS'; payload: Partial<Album>[] | null }
    | { type: 'IS_USER_SEARCHING'; payload: boolean }
    | { type: 'IS_MODAL_OPEN'; payload: ModalObject | null }
    | { type: 'SET_DEBOUNCED_VALUE'; payload: string | null };



export type Dispatch = React.Dispatch<ContextAction>

export interface Album {
    master_id: number,
    year: string,
    cover_image: string,
    title: string,
    lowest_price: number,
    images: Image[]
}

export interface Image {
    resource_url: string;
    type: string
}