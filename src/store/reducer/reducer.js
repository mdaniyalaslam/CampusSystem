import ActionTypes from '../constant/constant';

const INITIAL_STATE = {

    radioError: '',
    error:'',
    currentCompanyJobs:'',
    allCompanyJobs:''
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
        case ActionTypes.CURRENTCOMPANYJOBS:
            return ({
                ...state,
                currentCompanyJobs: action.payload
            })
        case ActionTypes.ALLCOMPANYJOBS:
        
            return ({
                ...state,
                allCompanyJobs: action.payload
            })
       
        default:
            return state;
    }

}