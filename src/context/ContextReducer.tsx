import type { ContextState, ContextAction } from '../types';

const contextReducer = (state: ContextState, action: ContextAction): ContextState => {
    switch (action.type) {
        case 'GET_ALBUM':
            return { ...state, album: action.payload };
        case 'GET_ALBUMS':
            return { ...state, albums: action.payload };
        case 'IS_USER_SEARCHING':
            return { ...state, isUserSearching: action.payload };
        case 'IS_MODAL_OPEN':
            return { ...state, isModalOpen: action.payload };
        case 'SET_DEBOUNCED_VALUE':
            return { ...state, globalDebouncedValue: action.payload };
        default:
            return state;
    }
};

export default contextReducer;
