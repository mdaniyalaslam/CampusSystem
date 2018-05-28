import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupAction } from '../store/action/action';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
    paper: {
        height: 440,
        width: 350,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        padding: 10,
        borderRadius : 15
    },
    btn: {
        margin: 12,
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

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            userName: '',
            password: '',
            check: ''
        }


        this.signup = this.signup.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangeUserName = this._onChangeUserName.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
        this.checker = this.checker.bind(this)

    }




    signup() {
        let check = this.state.check
        let studentInfo = {
            email: this.state.email,
            username: this.state.userName,
            password: this.state.password,
            user: check
        }
        let companyInfo = {
            email: this.state.email,
            username: this.state.userName,
            password: this.state.password,
            user: check
        }

        if (check === 'student'){
            this.props.signupwithEmailPassword(studentInfo)
        }
        else (
            this.props.signupwithEmailPassword(companyInfo)
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
    _onChangeUserName(event) {
        this.setState({
            userName: event.target.value
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
                    <Paper style={styles.paper} zDepth={2} >
                        <h1>Signup</h1>
                        <TextField floatingLabelText="Email"
                            hintText="Enter Email Here"
                            name="email"
                            value={this.state.email} onChange={this._onChangeEmail}
                        />
                        <TextField floatingLabelText="User Name"
                            hintText="Enter Name Here"
                            name="username"
                            value={this.state.userName} onChange={this._onChangeUserName}
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

                        <p>Already Have an account?</p>
                        <RaisedButton label="Signup"
                            style={styles.btn}
                            primary={true}
                            onClick={this.signup}
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
        signupwithEmailPassword: (info) => { dispatch(signupAction(info)); }

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);

