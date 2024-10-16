// UploadContext.tsx

import React, { createContext, useReducer, ReactNode } from 'react';
import type { ContextState, ContextAction, Album, ModalObject } from '../types'; // Adjust path as needed
import contextReducer from './ContextReducer.tsx';

// Initial state
export const initialState: ContextState = {
    album: null,
    albums: null,
    isUserSearching: false,
    isModalOpen: null,
    globalDebouncedValue: null,
};

interface ContextType {
    album: Album | null,
    albums: Partial<Album>[] | null,
    isUserSearching: boolean,
    isModalOpen: ModalObject | null,
    globalDebouncedValue: string | null,
    dispatch: React.Dispatch<ContextAction>;
}
// Create the context with separate state values
const Context = createContext<ContextType>({
    album: initialState.album,
    albums: initialState.albums,
    isUserSearching: initialState.isUserSearching,
    isModalOpen: initialState.isModalOpen,
    globalDebouncedValue: initialState.globalDebouncedValue,
    dispatch: () => undefined, // Default no-op dispatch function
});

interface ProviderProps {
    children: ReactNode
}

export const ContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(contextReducer, initialState);

    return (
        <Context.Provider value={{
            album: state.album,
            albums: state.albums,
            isUserSearching: state.isUserSearching,
            isModalOpen: state.isModalOpen,
            globalDebouncedValue: state.globalDebouncedValue,
            dispatch,
        }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
