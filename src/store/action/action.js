
import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';
// import createBrowserHistory from 'history/createBrowserHistory';
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

var thisCompanyId;


//SignupAction/////////////////////////////////////////
export function signupAction(info) {
    return dispatch => {
        let user = info.user
        if (user === 'student') {
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
        else {
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

        if (user === 'student') {
            firebase.auth().signInWithEmailAndPassword(info.email, info.password)
                .then((signedInStudent) => {
                    let studentId = signedInStudent.uid
                    // console.log('studentId', studentId)
                    // alert('Signin Successfull !')

                    firebase.database().ref('/').child(`campusRecruitmentUsers/Students/${studentId}`).once('value')
                        .then((snap) => {

                            // console.log('snap',snap.key)
                            if (snap.val() !== null) {
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
        else if (user === 'company') {
            firebase.auth().signInWithEmailAndPassword(info.email, info.password)
                .then((signedUpCompany) => {
                    let companyId = signedUpCompany.uid
                    thisCompanyId = companyId

                    firebase.database().ref('/').child(`campusRecruitmentUsers/Company/${companyId}`).once('value')
                        .then((snap) => {
                            console.log('snap', snap.val())

                            if (snap.val() !== null) {
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
        else dispatch({ type: ActionTypes.RADIOERROR, payload: 'Please select Signin Type' });

    }
}

export function submitAction(jobDetails) {
    return dispatch => {

        firebase.auth().onAuthStateChanged((user) => {

            firebase.database().ref('/RecruitmentJobs').child(user.uid).push(jobDetails)
                .then((snap) => {
                    let id = snap.key
                    firebase.database().ref('/RecruitmentJobs').child(user.uid).child(id).update({ key: id })

             
                // 
                let thisUserJobs = []
                firebase.auth().onAuthStateChanged((user) => {
                    let currentUser = user.uid
                    firebase.database().ref('/RecruitmentJobs').child(currentUser).on('value', (snap) => {
                        var dbData = snap.val()
                        for (var key in dbData) {
                            thisUserJobs.push(dbData[key])
        
                        }
                        // console.log('snpa', thisUserJobs)
                        dispatch({ type: ActionTypes.CURRENTCOMPANYJOBS, payload: thisUserJobs })
                    })
                })
            })
        })
    }
}
export function deleteJobAction(key) {
    console.log(key)
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref('/RecruitmentJobs').child(user.uid).child(key).remove()
        })


}
}

export function fetchFirebaseAction() {
    return dispatch => {
        let thisUserJobs = []
        firebase.auth().onAuthStateChanged((user) => {
            let currentUser = user.uid
            firebase.database().ref('/RecruitmentJobs').child(currentUser).on('value', (snap) => {
                var dbData = snap.val()
                for (var key in dbData) {
                    thisUserJobs.push(dbData[key])

                }
                // console.log('snpa', thisUserJobs)
                dispatch({ type: ActionTypes.CURRENTCOMPANYJOBS, payload: thisUserJobs })
            })
        })
    }
}

export function signoutAction() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            window.location.reload();
            // localStorage.clear()
            // setTimeout(function () {
                history.push('/')
            // }, 3000);
        }).catch(function (error) {
            alert(error.msg)
        });
    }
}




