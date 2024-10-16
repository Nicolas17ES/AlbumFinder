import axios from 'axios';
import { Dispatch } from '../types';

const baseUrl = 'https://api.discogs.com/';
const token = 'PAOdZHYQRzOWffNcqfohlIBxfoDCZdUYJkEEfKCv'

export const getAlbums = async (dispatch: Dispatch): Promise<void> => {
    const searchParam = `database/search?genre=rock&per_page=5&token=${token}`;

    try{
        const response = await  axios.get(baseUrl + searchParam);
        const data = response.data.results;
        dispatch({
            type: 'GET_ALBUMS',
            payload: data,
        })

    } catch(error) {
        console.error("errror fetching data:", error);
    }

};

export const getAlbumById = async (dispatch: Dispatch, master_id: number): Promise<void> => {

    const searchParam = `masters/${master_id}?token=${token}`;

    try{
        const response = await  axios.get(baseUrl + searchParam);
        const data = response.data;

        dispatch({
            type: 'GET_ALBUM',
            payload: data
        })

    } catch(error) {
        console.error("errror fetching data:", error);
    }

};

export const searchAlbum = async(dispatch: Dispatch, query: string): Promise<void> => {

     dispatch({
        type: 'GET_ALBUMS',
        payload: null,
    })

    const type = 'master';
    const searchParam = `database/search?type=${type}&q=${query}&per_page=5&token=${token}`;
    
     try{
        const response = await  axios.get(baseUrl + searchParam);
        const data = response.data.results;

        dispatch({
            type: 'GET_ALBUMS',
            payload: data
        })

    } catch(error) {
        console.error("errror fetching data:", error);
    }
}