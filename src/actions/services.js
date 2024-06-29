import { Actions } from 'src/configs';
import axios from 'axios';

require('dotenv').config();

export async function getServicesThunk(dispatch, getState) {
    await axios.get(`${process.env.REACT_APP_API}/services`)
    .then(res => {
        dispatch({
            type: Actions.GET_SERVICES_SUCCESS,
            payload: {
                services_list: res.data.data.services_list,
            }
        });
    }).catch(err => {
        if (err.response) {
            dispatch({
                type: Actions.GET_SERVICES_FAILED,
                payload: {
                    message: err.response.data.message
                }
            });
        }
    });    
}