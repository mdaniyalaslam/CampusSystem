import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: 'Haider',
    currentUser:'',
    users: [],
    messages: {},
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
        case ActionTypes.CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })   
        case ActionTypes.ALLUSERS:
            return ({
                ...state,
                users: action.payload
            }) 
        case ActionTypes.CHANGERECPUID:
            return ({
                ...state,
                recipientID: action.payload
            })
        case ActionTypes.MESSAGES:
            return ({
                ...state,
                messages: action.payload
            })
        default:
            return state;
    }

}