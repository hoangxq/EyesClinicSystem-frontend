import { Actions } from "src/configs";
import axios from "axios";

require("dotenv").config();

export async function getDistrictThunk(dispatch, getState) {
  await axios
    .get(`${process.env.REACT_APP_API}/district/province/1`)
    .then((res) => {
      dispatch({
        type: Actions.GET_DISTRICT_SUCCESS,
        payload: {
          district_list: res.data.data.district_list,
        },
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: Actions.GET_DISTRICT_FAIL,
          payload: {
            message: err.response.data.message,
          },
        });
      }
    });
}
