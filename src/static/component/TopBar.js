import React, {Component} from 'react';
import {NavLink,Link} from 'react-router-dom'
class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <i className="iconfont icon-aperture brand-img" alt="logo"/>
                <span className="brand-text"> Apertrue</span>
            </div>
        )
    }
}


class AccessButtonGroup extends Component {
    render() {
        if (typeof this.props.username === "string") {
            return (
                <div className="access-btn-group">
                    <Link to="/publish">
                        <div className="publish">
                            <i className="iconfont icon-publish"/>
                        </div>
                    </Link>
                    <Link to="/message">
                        <div className="message">
                            <i className="iconfont icon-message"/>
                        </div>
                    </Link>
                    <div className="user-btn-group">
                        <div className="username">
                            {this.props.username}
                        </div>
                        <ul className="btn-list">
                            <li className="item" onClick={this.props.logout}>
                                Log <i className="iconfont icon-logout"/>ut
                            </li>
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (<div className="access-btn-group">
                <Link to="/login">
                    <div className="login">
                        <div className="button-dark">
                            log in
                        </div>
                    </div>
                </Link>

                <div className="signup">
                    <Link to="/signup">
                        <div className="button-light">
                            sign up
                        </div>
                    </Link>
                </div>
            </div>)
        }
    }
}


class SearchBar extends Component {
    render() {
        return (
            <form className="search-bar" name="searchBar">
                <i className="iconfont icon-search"/>
                <input type="search" id="search" className="search-input" placeholder="Find a topic,post,or user"/>
                <i className="iconfont icon-close"/>
            </form>
        )
    }
}

class UserInfoButton extends Component {
    render() {
        return (
            <div className="userinfo-button">
                <i className="iconfont icon-tresure2"/>
            </div>
        )
    }
}

class Category extends Component{
    render(){
        return(
            <div className="category-list">
                <NavLink exact="true" to={{
                    pathname: '/',
                    search: '?filter=DetailsOfSLR',
                    state: { fromDashboard: true }
                }} onClick={()=>{
                    this.props.postFilter(1)
                }} isActive={(match,location)=>{
                    return location.search ==="?filter=DetailsOfSLR"
                }} activeClassName="active">
                <div className="category-item" >
                    <div className="inner">Details of SLRs</div>
                </div>
                </NavLink>
                <NavLink exact to={{
                    pathname: '/',
                    search: '?filter=SkillOfShare',
                    state: { fromDashboard: true }
                }} onClick={()=>{
                    this.props.postFilter(2)
                }} isActive={(match,location)=>{
                    return location.search ==="?filter=SkillOfShare"
                }} activeClassName="active">
                <div className="category-item">
                    <div className="inner">Skills to Share</div>
                </div>
                </NavLink>
            </div>
        )
    }
}

export default class TopBar extends Component {
    render() {
        return (
            <div className="topbar">
                <Link to="/post" style={{display: "inline-block", height: "100%"}}><UserInfoButton/></Link>
                <Link to="/" onClick={()=>{
                    this.props.initial();
                }} ><Logo/></Link>
                <Category postFilter={this.props.postFilter} />
                <SearchBar/>
                <AccessButtonGroup  username={this.props.username} logout={this.props.logout} />
            </div>
        )
    }
};


