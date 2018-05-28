import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
// import {changeUserName} from '../store/action/action';

class StudentPage extends Component {

    // _changeData(){
    //     console.log('event called');
    //     this.props.changeUserName();
    // }

    render() {
        return (
            <div>
                <h1>Hello StudentPage</h1>
             
            </div>
        )
    }
}

function mapStateToProp(state){
    return({
        userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch){
    return({
        // changeUserName: ()=>{dispatch(changeUserName())}
    })
}

export default connect(mapStateToProp,mapDispatchToProp)(StudentPage);

