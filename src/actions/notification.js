import { Actions } from "src/configs";
require("dotenv").config();

export const updateListNotification =
  (data, statusNotif) => async (dispatch) => {
    dispatch({
      type: Actions.UPDATE_NOTIFICATION_SUCCESS,
      payload: {
        data: data,
        type: statusNotif,
      },
    });
  };
