import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
// import {changeUserName} from '../store/action/action';

class CompanyPage extends Component {

    // _changeData(){
    //     console.log('event called');
    //     this.props.changeUserName();
    // }

    render() {
        return (
            <div>
                
                sdafadsf
            </div>
        )
    }
}

function mapStateToProp(state){
    return({
        // userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch){
    return({
        // changeUserName: ()=>{dispatch(changeUserName())}
    })
}

export default connect(mapStateToProp,mapDispatchToProp)(CompanyPage);
