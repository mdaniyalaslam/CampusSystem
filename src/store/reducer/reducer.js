import ActionTypes from '../constant/constant';

const INITIAL_STATE = {

    radioError: '',
    error:''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionTypes.ERROR:
            return ({
                
                ...state,
                error: action.payload
            })
        case ActionTypes.RADIOERROR:
            return ({
                ...state,
                radioError: action.payload
            })
       
        default:
            return state;
    }

}