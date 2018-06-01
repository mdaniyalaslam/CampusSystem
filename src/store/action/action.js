
import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';
import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()
// const hsitory = createBrowserHistory()

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBFuJjAovnV3Tm5uTwUDAwnd9ZH7RkO5mY",
    authDomain: "saylani-firebase.firebaseapp.com",
    databaseURL: "https://saylani-firebase.firebaseio.com",
    projectId: "saylani-firebase",
    storageBucket: "saylani-firebase.appspot.com",
    messagingSenderId: "997850868113"
  };
  firebase.initializeApp(config);


//SignupAction/////////////////////////////////////////
export function signupAction(info) {
    return dispatch => {
        let user = info.user
        if (user === 'student'){
            firebase.auth().createUserWithEmailAndPassword(info.email, info.password)
            .then((signedUpStudent) => {
                let studentId = signedUpStudent.uid
                alert('Signup Successfull !')
                firebase.database().ref('/').child(`campusRecruitmentUsers/Students/${studentId}`).set(info)
                history.push('/');
                
            })
            .catch((error) => {
                console.log(error.message)
                // dispatch({ type: ActionTypes.ERRORCOMPANYSN, payload: error.message });
            })
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(info.email, info.password)
            .then((signedUpCompany) => {
                let companyId = signedUpCompany.uid
                
                alert('Signup Successfull !')
                firebase.database().ref('/').child(`campusRecruitmentUsers/Company/${companyId}`).set(info)
                history.push('/');
                
            })
            .catch((error) => {
                console.log(error.message)
                // dispatch({ type: ActionTypes.ERRORCOMPANYSN, payload: error.message });
            })
        }
    }
}




//SigninAction/////////////////////////////////////////
export function signinAction(info) {
    return dispatch => {
        let user = info.user
        
        if (user === 'student'){
            firebase.auth().signInWithEmailAndPassword(info.email, info.password)
            .then((signedInStudent) => {
                let studentId = signedInStudent.uid
                // console.log('studentId', studentId)
                // alert('Signin Successfull !')
                
                firebase.database().ref('/').child(`campusRecruitmentUsers/Students/${studentId}`).once('value')
                .then((snap)=>{
                    
                    // console.log('snap',snap.key)
                    if(snap.val() !== null){
                        history.push('/studentPage')
                    }
                    else alert('User Not found!')
                    
                })

                
            })
            .catch((error) => {
                console.log(error.message)
                // dispatch({ type: ActionTypes.ERRORCOMPANYSN, payload: error.message });
            })
        }
        else if (user === 'company'){
            firebase.auth().signInWithEmailAndPassword(info.email, info.password)
            .then((signedUpCompany) => {
                let companyId = signedUpCompany.uid
                
                firebase.database().ref('/').child(`campusRecruitmentUsers/Company/${companyId}`).once('value')
                .then ((snap)=>{
                    console.log('snap',snap.val())
                    
                    if(snap.val() !== null){
                        history.push('/companyPage')
                    }
                    else alert('User Not found!')
                })
            })
            .catch((error) => {
                console.log(error.message)
                dispatch({ type: ActionTypes.ERROR, payload: error.message });
            })
        }
        else  dispatch({ type: ActionTypes.RADIOERROR, payload: 'Please select Signin Type' });
       
    }
}





