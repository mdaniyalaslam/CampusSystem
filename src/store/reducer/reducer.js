import ActionTypes from '../constant/constant';

const INITIAL_STATE = {

    radioError: '',
    error:'',
    currentCompanyJobs:'',
    allCompanyJobs:'',
    currentStudent:'',
    appliedJobs:'',
    allStudents:[],
    radioError:''
}

export default (state = INITIAL_STATE, action) => {
    // console.log('red', appliedJobs)
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
        case ActionTypes.CURRENTSTUDENT:
            return ({
                ...state,
                currentStudent: action.payload
            })
        case ActionTypes.APPLIEDJOBS:
            return ({
                ...state,
                appliedJobs: action.payload
            })
        case ActionTypes.ALLSTUDENTS:
        // console.log('red', action.payload)
            return ({
                ...state,
                allStudents: action.payload
            })
        case ActionTypes.RADIOERROR:
        // console.log('red', action.payload)
            return ({
                ...state,
                radioError: action.payload
            })
       
        default:
            return state;
    }

}