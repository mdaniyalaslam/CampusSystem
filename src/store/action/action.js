
import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
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
                    dispatch({ type: ActionTypes.ERROR, payload: error.message });

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
                    dispatch({ type: ActionTypes.ERROR, payload: error.message });

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
                    firebase.database().ref('/RecruitmentJobs').child(user.uid).child(id).update({ key: id, uid: user.uid })


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
export function submitStudentDetailsAction(studentDetails) {
    console.log('action')
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref('/RecruitmentStudentsQualification').child(user.uid).set(studentDetails)
                .then((snap) => {
                    firebase.database().ref('/RecruitmentStudentsQualification').child(user.uid).update({ key: user.uid, isEdit: false })
                })
        })
    }
}


export function fetchStudentDetailsAction() {
    // console.log('fetch student')
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref('/RecruitmentStudentsQualification').child(user.uid).once('value', (snap) => {
                var thatStudent = snap.val()
                // console.log('student', thatStudent)

                dispatch({ type: ActionTypes.CURRENTSTUDENT, payload: thatStudent })
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
export function deleteAppliedJobAction(key) {
    console.log(key)
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref('/RecruitmentStudentsQualification').child(user.uid).child('appliedJobs').child(key).remove()
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
export function allJobsFetchFirebaseAction() {
    return dispatch => {
        var allCompanyJobs = []
        var sameArr = []
        firebase.database().ref('/RecruitmentJobs').on('child_added', (snap) => {
            var dbData = snap.val()
            for (var key in dbData) {
                allCompanyJobs.push(dbData[key])
            }
            // console.log('allCompanyJobs',allCompanyJobs)

            dispatch({ type: ActionTypes.ALLCOMPANYJOBS, payload: allCompanyJobs })
        })

    }
}
export function fetchAppliedJobAction() {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            var appliedJobs = []

            firebase.database().ref('/RecruitmentStudentsQualification').child(user.uid).child('appliedJobs').once("value", (snap) => {
                // console.log('applied action fetch firebase', snap.val())
                let dbAppliedData = snap.val()
                for (var i in dbAppliedData) {
                    appliedJobs.push(dbAppliedData[i])
                }
                dispatch({ type: ActionTypes.APPLIEDJOBS, payload: appliedJobs })

            })
        })
    }

}

export function applyJobAction(key, uid) {
    // console.log('action', key, uid)
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref('/RecruitmentStudentsQualification').child(user.uid).once('value', snap => {
                if (snap.val() !== null) {
                    firebase.auth().onAuthStateChanged((user) => {
                        firebase.database().ref('/RecruitmentJobs').child(uid).child(key).once('value', (snap) => {
                            var thisJob = snap.val()
                            firebase.database().ref('/RecruitmentStudentsQualification').child(user.uid).child('appliedJobs').child(key).set(thisJob)
                        })
                    })
                }
                else alert('Please add profile first!')
            })
        })


    }
    fetchAppliedJobAction()
}

export function fetchAllStudentsAction() {
    return dispatch => {
        var allStudents = []
        firebase.database().ref('/RecruitmentStudentsQualification').on('child_added', (snap) => {
            var dbData = snap.val();
            allStudents.push(dbData)


            // for(var i=0; i<=dbData.length; i++){
            //     if(dbData[1] !== null){
            //         allStudents.push(dbData[1])
            //     }
            // }
            // for (var key in dbData) {
            //     allStudents.push(dbData[key])
            // }
            // console.log('allstudents',allStudents)
            dispatch({ type: ActionTypes.ALLSTUDENTS, payload: allStudents })
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

export function deleteJobFromAdminAction(key, uid) {
    return dispatch => {

        firebase.database().ref('/RecruitmentJobs').child(uid).child(key).remove();
    }




}
export function deleteStudentFromAdminAction(key) {
    return dispatch => {
        firebase.database().ref('/RecruitmentStudentsQualification').child(key).remove();
    }
}


