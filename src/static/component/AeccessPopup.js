import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'

const regConfig = {
    username: /^[a-zA-Z0-9_-]{4,16}$/,
    password: /^[a-zA-Z0-9_-]{6,16}$/,
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    errorPrompt: {
        username: "Please enter 4-16 username including numbers, letters, underscores and minus signs.",
        password: "Please enter 6-16 password including numbers, letters, underscores and minus signs.",
        email: "Please enter a valid e-mail format"
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleInputClass = this.handleInputClass.bind(this);
        this.verify = this.verify.bind(this);
        this.submit = this.submit.bind(this);
        this.initial = {
            //登陆-用户名表单项状态
            isLoginUsernameInput: false,
            isLoginUsernameAvailable: false,
            //登陆-密码表单项状态
            isLoginPasswordInput: false,
            isLoginPasswordAvailable: false,
        };
        this.state = {
            //登陆-用户名表单项状态
            isLoginUsernameInput: false,
            isLoginUsernameAvailable: false,
            //登陆-密码表单项状态
            isLoginPasswordInput: false,
            isLoginPasswordAvailable: false,
            username: "",
            password: "",
            isLogin:false
        };
    }

    //处理input表单项的不同状态的样式类切换
    handleInputClass(isInput, isAvailable) {
        if (isInput) {
            if (isAvailable) {
                return "input-module-mini input-module input-module-inputing";
            }
            else {
                return "input-module-mini-alert input-module input-module-inputing"
            }
        } else {
            return "input-module"
        }
    }

    //验证表单输入值
    verify(inputName, inputVal, isInput, isAvailable) {
        if (inputVal !== "") {
            regConfig[inputName].test(inputVal) ? this.setState({
                [isInput]: true,
                [isAvailable]: true,
                [inputName]: inputVal
            }) : this.setState({
                [isInput]: true,
                [isAvailable]: false
            });
        } else {
            this.setState({
                [isInput]: false,
                [isAvailable]: false,
            })
        }
    }

    submit() {
        if (this.state.isLoginPasswordAvailable && this.state.isLoginUsernameAvailable) {
            const paramObj = {
                username: this.state.username,
                password: this.state.password,
            };
            axios.post('/api/access/login',paramObj).then((res) => {
                const data= res.data;
                console.log(data);
                if(data.success){
                    this.setState({
                        isLogin:true
                    });
                    window.location.reload();
                }else{
                    alert(data.message)
                }
            }).catch((err)=>{
                console.log(err);
            })
        }else {
            alert("Forms can not be null, and to fill in the correct format")
        }
    }

    // componentWillmount() {
    //     this.setState(this.initial);
    // }

    render() {
        if(this.state.isLogin){
            return <Redirect to="/" />
        }
        return (
            <div className="popup">
                <div className="popup-mask">
                    <div className="popup-wrapper">
                        <div className="decoration-bg">
                        </div>
                        <div className="main-content">

                                <div className="close-btn" onClick={()=>{
                                    this.props.history.goBack();
                                }}>
                                    <i className="iconfont icon-close"></i>
                                </div>
                            <div className="prompt-header">
                                <i className="iconfont icon-aperture prompt-icon"></i>
                                <div className="prompt-text">Log in</div>
                            </div>
                            <form id="login" className="access-form">
                                <fieldset
                                    className={this.handleInputClass(this.state.isLoginUsernameInput, this.state.isLoginUsernameAvailable)}>
                                    <input name="username" type="text" value={this.state.username} onInput={(e)=>{
                                        this.setState({
                                            username:e.target.value
                                        })
                                    }} onBlur={(e) => {
                                        this.verify('username', e.target.value, 'isLoginUsernameInput', 'isLoginUsernameAvailable')
                                    }} id="login-username"/>
                                    <label htmlFor="login-username">Username</label>
                                    <div className="error-prompt">{regConfig.errorPrompt.username}</div>
                                    <i className={this.state.isLoginUsernameAvailable ? "iconfont icon-tick" : "iconfont icon-alert"}></i>
                                </fieldset>
                                <fieldset
                                    className={this.handleInputClass(this.state.isLoginPasswordInput, this.state.isLoginPasswordAvailable)}>
                                    <input type="password" value={this.state.password} onInput={(e)=>{
                                        this.setState({
                                            password:e.target.value
                                        })
                                    }} onBlur={(e) => {
                                        this.verify('password', e.target.value, 'isLoginPasswordInput', 'isLoginPasswordAvailable')
                                    }} id="login-password" name="password"/>
                                    <label htmlFor="login-password">Password</label>
                                    <div className="error-prompt">{regConfig.errorPrompt.password}</div>
                                    <i className={this.state.isLoginPasswordAvailable ? "iconfont icon-tick" : "iconfont icon-alert"}></i>
                                </fieldset>

                                <a className="access-submit button-dark" onClick={this.submit} type="submit">log in</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleInputClass = this.handleInputClass.bind(this);
        this.verify = this.verify.bind(this);
        this.submit = this.submit.bind(this);
        this.initial = {
            //注册-用户名表单项状态
            isSignupUsernameInput: false,
            isSignupUsernameAvailable: false,
            //注册-密码表单项状态
            isSignupPasswordInput: false,
            isSignupPasswordAvailable: false,
            //注册-邮箱表单项状态
            isSignupEmailInput: false,
            isSignupEmailAvailable: false,
        };
        this.state = {
            //注册-用户名表单项状态
            isSignupUsernameInput: false,
            isSignupUsernameAvailable: false,
            //注册-密码表单项状态
            isSignupPasswordInput: false,
            isSignupPasswordAvailable: false,
            //注册-邮箱表单项状态
            isSignupEmailInput: false,
            isSignupEmailAvailable: false,
            username: "",
            password: "",
            email: "",
            isCompletedSignup:false
        };
    }

    //处理input表单项的不同状态的样式类切换
    handleInputClass(isInput, isAvailable) {
        if (isInput) {
            if (isAvailable) {
                return "input-module-mini input-module input-module-inputing";
            }
            else {
                return "input-module-mini-alert input-module input-module-inputing"
            }
        } else {
            return "input-module"
        }
    }

    //验证表单输入值
    verify(inputName, inputVal, isInput, isAvailable) {
        if (inputVal !== "") {
            regConfig[inputName].test(inputVal) ? this.setState({
                [isInput]: true,
                [isAvailable]: true,
                [inputName]: inputVal
            }) : this.setState({
                [isInput]: true,
                [isAvailable]: false
            });
        } else {
            this.setState({
                [isInput]: false,
                [isAvailable]: false,
            })
        }
    }

    //提交注册表单项
    submit() {
        if (this.state.isSignupEmailAvailable && this.state.isSignupPasswordAvailable && this.state.isSignupUsernameAvailable) {
            const paramObj = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            };
            axios.post('/api/access/signup',paramObj).then((res) => {
                const data = res.data;
                if(data.success){
                    this.setState({
                        isCompletedSignup:true
                    });
                    this.props.history.goBack();
                }else{
                    alert(data.message)
                }
            }) .catch((err)=>{
                console.log(err);
            })
        }else {
            alert("Forms can not be null, and to fill in the correct format -")
        }
    }

    // componentWillmount() {
    //     this.setState(this.initial);
    // }

    render() {
        return (
            <div className="popup">
                <div className="popup-mask">
                    <div className="popup-wrapper">
                        <div className="decoration-bg"></div>
                        <div className="main-content">
                                <div className="close-btn" onClick={()=>{
                                    this.props.history.goBack();
                                }}>
                                    <i className="iconfont icon-close"></i>
                                </div>
                            <div className="prompt-header">
                                <i className="iconfont icon-aperture prompt-icon"></i>
                                <div className="prompt-text">Sign up</div>
                            </div>
                            <form id="signup" className="access-form" action="/signup" method="post">
                                <fieldset
                                    className={this.handleInputClass(this.state.isSignupUsernameInput, this.state.isSignupUsernameAvailable)}>
                                    <input name="username" value={this.state.username} onInput={(e)=>{
                                        this.setState({
                                            username:e.target.value
                                        })
                                    }} type="text" onBlur={(e) => {
                                        this.verify("username", e.target.value, "isSignupUsernameInput", "isSignupUsernameAvailable")
                                    }} id="signup-username"/>
                                    <label htmlFor="signup-username">Username</label>
                                    <div className="error-prompt">{regConfig.errorPrompt.username}</div>
                                    <i className={this.state.isSignupUsernameAvailable ? "iconfont icon-tick" : "iconfont icon-alert"}></i>
                                </fieldset>
                                <fieldset
                                    className={this.handleInputClass(this.state.isSignupPasswordInput, this.state.isSignupPasswordAvailable)}>
                                    <input type="password" value={this.state.password} onInput={(e)=>{
                                        this.setState({
                                            password:e.target.value
                                        })
                                    }} onBlur={(e) => {
                                        this.verify("password", e.target.value, "isSignupPasswordInput", "isSignupPasswordAvailable")
                                    }} id="signup-password" name="password"/>
                                    <label htmlFor="signup-password">Password</label>
                                    <div className="error-prompt">{regConfig.errorPrompt.password}</div>
                                    <i className={this.state.isSignupPasswordAvailable ? "iconfont icon-tick" : "iconfont icon-alert"}></i>
                                </fieldset>
                                <fieldset
                                    className={this.handleInputClass(this.state.isSignupEmailInput, this.state.isSignupEmailAvailable)}>
                                    <input type="email" value={this.state.email} onInput={(e)=>{
                                        this.setState({
                                            email:e.target.value
                                        })
                                    }} onBlur={(e) => {
                                        this.verify("email", e.target.value, "isSignupEmailInput", "isSignupEmailAvailable")
                                    }} id="signup-email" name="email"/>
                                    <label htmlFor="signup-email" >Email</label>
                                    <div className="error-prompt">{regConfig.errorPrompt.email}</div>
                                    <i className={this.state.isSignupEmailAvailable ? "iconfont icon-tick" : "iconfont icon-alert"}></i>
                                </fieldset>
                                <a className="access-submit button-dark" onClick={this.submit} type="submit">sign up</a>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


const AccessPopup = {Login, Signup};

/* 登陆&&注册弹窗 组件 */
export default AccessPopup
