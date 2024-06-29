import { Actions } from 'src/configs';
import axios from 'axios';

require('dotenv').config();

export async function getAirportThunk(dispatch, getState) {
    await axios.get(`${process.env.REACT_APP_API}/airport`)
    .then(res => {
        dispatch({
            type: Actions.GET_AIRPORT_SUCCESS,
            payload: {
                airport_list: res.data.data.airport_list,
            }
        });
    }).catch(err => {
        if (err.response) {
            dispatch({
                type: Actions.GET_AIRPORT_FAILED,
                payload: {
                    message: err.response.data.message
                }
            });
        }
    });    
}