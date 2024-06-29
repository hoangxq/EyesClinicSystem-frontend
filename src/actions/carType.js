import { Actions } from 'src/configs';
import axios from 'axios';

require('dotenv').config();

export async function getCarTypeThunk(dispatch, getState) {
    await axios.get(`${process.env.REACT_APP_API}/car-type`)
    .then(res => {
        dispatch({
            type: Actions.GET_CAR_TYPE_SUCCESS,
            payload: {
                car_type_list: res.data.data.car_type_list,
            }
        });
    }).catch(err => {
        if (err.response) {
            dispatch({
                type: Actions.GET_CAR_TYPE_FAIL,
                payload: {
                    message: err.response.data.message
                }
            });
        }
    });    
}