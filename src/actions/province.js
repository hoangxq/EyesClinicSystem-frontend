import { Actions } from 'src/configs';
import axios from 'axios';

require('dotenv').config();

export async function getProvinceThunk(dispatch, getState) {
    await axios.get(`${process.env.REACT_APP_API}/province`)
    .then(res => {
        dispatch({
            type: Actions.GET_PROVINCE_SUCCESS,
            payload: {
                province_list: res.data.data.province_list,
            }
        });
    }).catch(err => {
        if (err.response) {
            dispatch({
                type: Actions.GET_PROVINCE_FAIL,
                payload: {
                    message: err.response.data.message
                }
            });
        }
    });    
}