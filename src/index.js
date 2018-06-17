import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, withRouter, Switch, Route,} from 'react-router-dom';
import './static/style/css/index.css';
import './static/style/css/iconfont.css'
import TopBar from './static/component/TopBar';
import SideBar from './static/component/SideBar';
import Home from './static/component/Home'
import PostBrowser from './static/component/PostBrowser'
import AccessPopup from './static/component/AeccessPopup'
import MarkDownEditor from './static/component/MarkdownEditor'
import axios from 'axios'

import registerServiceWorker from './registerServiceWorker';

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

const Scroll2Top = withRouter(ScrollToTop);


class App extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.addItems = this.addItems.bind(this);

        this.initial = this.initial.bind(this);
        this.filterInitial = this.filterInitial.bind(this);
        this.state = {
            isLogin: false,
            username: null,
            uid: null,
            postItems: [],
            officialItems:[],
            isInsufficient: false,
            filter: null,

        }
    }

    componentWillMount() {
        // 验证用户是否登录
        axios.get('/api/access/isLogined')
            .then( (res)=> {
                const data = res.data;
                if (data.isLogin) {
                    this.setState({
                        username: data.userName,
                        uid: data.userId
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        this.initial();
    }
    // 初始化post列表数据
    initial(){
        axios.get('/api/post/initial').then((res) => {
            const data = res.data;
            this.setState({
                postItems: Array.from(data.items),
                isInsufficient:data.isInsufficient,
                filter:null,
                officialItems:Array.from(data.officialItems),
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    /**
     * 添加新的post数据
     */
    addItems(filter) {
        if (!this.state.isInsufficient) {
            let url = '/api/post/load';
            if (filter) {
                url = 'api/post/filterLoad'
            }
            axios.get(url, {
                params: {
                    pid: this.state.postItems[this.state.postItems.length-1]["pid"],
                    filter: filter
                }
            }).then((res) => {
                const data = res.data;
                console.log(data)
                this.setState((prevState) => {
                    return {
                        postItems: prevState.postItems.concat(Array.from(data.items)),
                        isInsufficient: data.isInsufficient
                    }
                });
            }).catch((err) => {
                console.log(err);
            });
        } else {
            this.setState({
                currentCount: this.state.totalCount
            })
        }
    }

    // //同步 post 数据
    // syncItems(postItems,pattern){
    //     switch (pattern){
    //         case 'initial':
    //             this.setState({
    //                 postItems:postItems
    //             });
    //             break;
    //         case 'add':
    //             this.setState((prevState)=>{
    //                 return {
    //                     postItems:prevState.postItems.concat(postItems)
    //                 }
    //             })
    //             break;
    //        default:
    //             this.setState({
    //                 postItems:postItems
    //             });
    //             break;
    //     }
    // }
    /**
     * 退出登录态
     */
    logout() {
        //初始化react状态
        this.setState({
            username: null,
            uid: null,
        });
        //清除session
        axios.delete("/api/access/logout").then((res) => {
            const data = res.data;
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    /**
     * 按范畴筛选post
     * @param filter{Number}
     */
    filterInitial(filter) {
        this.setState({
            filter:filter
        });
        axios.get('/api/post/filterInitial',{
            params:{
                filter:filter
            }
        }).then((res)=>{
            const data = res.data;
            this.setState({
                postItems: Array.from(data.items),
                isInsufficient:data.isInsufficient
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
            <div className="app">
                <TopBar username={this.state.username} initial={this.initial} postFilter={this.filterInitial} logout={this.logout}/>
                <SideBar/>
                <div className="mainbody">
                    <Switch>
                        <Route exact path={`/post/:pid`} component={({match}) => {
                            return <PostBrowser  username={this.state.username}
                                                pid={match.params.pid}/>
                        }}/>
                        <Route exact path="/publish" component={MarkDownEditor}/>
                        <Route exact path="/" component={() => {
                            return <Home
                                postItems={this.state.postItems}
                                officialItems={this.state.officialItems}
                                isInsufficient={this.state.isInsufficient}
                                filter={this.state.filter}
                                addItems={this.addItems}/>
                            }
                        }/>
                    </Switch>
                    <Route path="/login" component={AccessPopup.Login}/>
                    <Route path="/signup" component={AccessPopup.Signup}/>
                </div>
            </div>)
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Scroll2Top>
            <App/>
        </Scroll2Top>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
