import { Actions } from 'src/configs';

const initialState = [];
const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_SERVICES_SUCCESS:
            return action.payload.services_list;
        default:
            return state;
    }
}

export default servicesReducer;