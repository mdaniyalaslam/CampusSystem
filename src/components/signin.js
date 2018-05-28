import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinAction } from '../store/action/action';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
    paper: {
        height: 440,
        width: 350,
        margin: 40,
        textAlign: 'center',
        display: 'inline-block',
        padding: 10,
        borderRadius : 15
        
    },
    btn: {
        margin: 12,
        marginTop: 20,
        width: 300
        
    },
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 20,
    },

};

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            userName: '',
            password: '',
            check: ''
        }


        this.signin = this.signin.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
        this.checker = this.checker.bind(this)

    }




    signin() {
        let check = this.state.check
        let studentInfo = {
            email: this.state.email,
            password: this.state.password,
            user: check
        }
        let companyInfo = {
            email: this.state.email,
            password: this.state.password,
            user: check
        }

        if (check === 'student'){
            this.props.signinwithEmailPassword(studentInfo)
        }
        else (
            this.props.signinwithEmailPassword(companyInfo)
        )


        this.setState({
            email: '',
            userName: '',
            password: '',
        })
    }
    _onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
 
    _onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    checker(e) {
        let check = this.state.check
        console.log(check, "radion vlue")
        // bharwy koi garbar nhi hai phele set kar raha hai baad me print

        this.setState({ check: e.target.value })
        // this.setState({
        //     check : e.target.value,
        // })

    }


    render() {
        return (
            <div className="row">
                <div className="col"></div>
                <div className="col-sm-4">
                    <Paper style={styles.paper} zDepth={5} >
                        <h1>Signin</h1>
                        <TextField floatingLabelText="Email"
                            hintText="Enter Email Here"
                            name="email"
                            value={this.state.email} onChange={this._onChangeEmail}
                        />
         
                        <TextField floatingLabelText="Password"
                            hintText="Enter Password Here"
                            name="password"
                            value={this.state.password} onChange={this._onChangePassword}
                        />

                        <RadioButtonGroup style={{ display: "flex" }} name="shipSpeed" defaultSelected="not_light">
                            <RadioButton
                                value="student"
                                label="Student"
                                style={styles.radioButton}
                                onClick={this.checker}
                            />
                            <RadioButton
                                value="company"
                                label="Company"
                                style={styles.radioButton}
                                onClick={this.checker}
                            />
                        </RadioButtonGroup>

                        <RaisedButton label="Signin"
                            style={styles.btn}
                            primary={true}
                            onClick={this.signin}
                        />
                    </Paper>
                </div>
                <div className="col"></div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        // userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signinwithEmailPassword: (info) => { dispatch(signinAction(info)); }

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);

