export function companySignupAction(info) {
    return dispatch => {
        let user = info.user


        firebase.auth().signInWithEmailAndPassword(info.email, info.password)
            .then((signedInStudent) => {
                // let studentId = signedInStudent.uid
                firebase.database().ref('users/students/').push(signedInStudent)
                // .then((userData) => {
                //     if (userData.val() === null) {
                //         alert("user not found");
                //         signedInStudent.delete()
                //         history.push('/companypage')
                //     } else {
                //         setTimeout(() => {
                //             history.push('/jobpost');
                //         }, 2000)
                //     }
                // })
            })
            // .catch((error) => {
            //     dispatch({ type: ActionTypes.ERRORCOMPANYSN, payload: error.message });
            // })
    }
}

// firebase.auth().signInWithEmailAndPassword(info.email, info.password)
        //     .then((signedInStudent) => {
        //         let studentId = signedInStudent.uid
        //         firebase.database().ref('users/students/').push(signedInStudent)
        //         .then((userData) => {
        //             if (userData.val() === null) {
        //                 alert("user not found");
        //                 signedInStudent.delete()
        //                 history.push('/companypage')
        //             } else {
        //                 setTimeout(() => {
        //                     history.push('/jobpost');
        //                 }, 2000)
        //             }
        //         })
        //     })
        //     .catch((error) => {
        //         dispatch({ type: ActionTypes.ERRORCOMPANYSN, payload: error.message });
        //     })