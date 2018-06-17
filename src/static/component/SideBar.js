import React, {Component} from 'react';

class UserInfo extends Component{
    render(){
        return(
            <div className="userinfo">

            </div>
        )
    }
}

export default class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <UserInfo/>
            </div>
        )
    }
};