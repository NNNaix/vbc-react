import React, {Component} from 'react';
import axios from 'axios'
/* 评论项*/
class CommentItem extends Component{
    render(){
        return(
            <div className="comment-item">
                <div className="author">{this.props.author||'Anonym'}</div>
                <div className="comment-content">
                    <section>
                        {this.props.content}
                    </section>
                </div>
                <div className="bottom-bar">
                    <span className="index">{`#${this.props.index+1}`}</span>
                    <span className="date">{this.props.date}</span>
                </div>
            </div>
        )
    }
}
/* 帖子评论*/

class Comment extends Component {
    constructor(props) {
        super(props);
        this.createItem =this.createItem.bind(this);
        this.addItems = this.addItems.bind(this);
        this.state = {
            content:"",
            date:"",
            commentItems: [],
            isInsufficient:true,
        }
    }
    componentWillMount(){
        // 初始化post列表数据
        axios.get('/api/comment/initial',{
            params:{
                pid:this.props.pid
            }
        }).then((res)=>{
            const data = res.data;
            this.setState({
                commentItems:Array.from(data.items),
            });
        }).catch((err)=>{
            console.log(err);
        });
        window.addEventListener('scroll',this.addItems)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.addItems)
    }

    /**
     * 创建评论
     */
    createItem(){
        //表单数据验证
        if(!this.state.content) {
            alert("input can not be empty");
            return false;
        }
        const newItem = {
            comment_author:this.props.username,
            comment_content:this.state.content,
            comment_publish_time:new Date().toLocaleDateString().replace(/\//g,'-'),
            pid:this.props.pid
        }
        axios.post('/api/comment/create',newItem
        ).then((res)=>{
            const data= res.data;
            if(!data.success){
                console.log(data.message)
            }
        }).catch((err)=>{
            console.log(err);
        })
        //修改状态将新的commentItem渲染
        this.setState((prevState)=>{
            const newCommentItems = prevState.commentItems.slice(0);
            newCommentItems.unshift(newItem);
            return {
                content:"",
                commentItems: newCommentItems
            }})

    }

    /**
     * 加载新的post数据
     */
    addItems(e) {
        let scrollTop = document.body.scrollHeight - window.innerHeight - document.documentElement.scrollTop;
        if (scrollTop < 500) {
            // 节流防止多次触发添加重复的数据
            if(!this.timer){
                this.timer = setTimeout(()=>{
                    if(!this.state.isInsufficient){
                        axios.get('/api/comment/load',{
                            params:{
                                descRow:this.state.commentItems[this.state.commentItems.length-1].cid,
                                pid:this.props.pid
                            }
                        }).then((res)=>{
                            const data = res.data;
                            this.setState((prevState) => {
                                return {
                                    postItems: prevState.postItems.concat(Array.from(data.items)),
                                    isInsufficient:data.isInsufficient
                                }
                            });
                        }).catch((err)=>{
                            console.log(err);
                        });
                    }
                    this.timer= null;
                },500)
            }
        }
        //ajax 向后台根据uid排序 依次获取十项数据

    }


    /* 删除评论 */
    // removeCommentItem(index){
    //     this.setState((preState)=>{
    //         return{
    //             commentItems:preState.commentItems.splice(index,1)
    //         }
    //     })
    // }
    render(){
        return(
            <div className="comment">
                <div className={this.state.content?"comment-editor active":"comment-editor"}>
                    <textarea
                        cols="80"
                        rows="5"
                        required
                        value={this.state.content}
                        onInput={(e)=>{this.setState({content:e.target.value})}}
                        className="comment-input"
                        placeholder="Please abide by the relevant policies and regulations of the Internet, and prohibit the release of pornographic, violent and reactionary comments."
                    />
                    <div className="add-comment" onClick={this.createItem}>comment</div>
                </div>
                <div className="comment-list">
                    {this.state.commentItems.map((item,index,items)=>{
                        return <CommentItem key={index}
                                            index={items.length-index-1}
                                            author={item.comment_author}
                                            content={item.comment_content}
                                            date={item.comment_publish_time}
                        />
                    })}
                </div>
                <h1 style={{"text-align":"center"}}>{this.state.isInsufficient?"no more comments":""}</h1>
            </div>
        )
    }
}
/* 帖子查看器 弹窗 */
export default class PostBrowser extends Component {
    constructor(){
        super()
        this.findItem = this.findItem.bind(this);
        this.state = {
            item:{}
        }
    }
    componentWillMount(){
        this.findItem(this.props.pid)
    }
    /**
     * 根据pid 查找 postItem
     * @param pid
     * @return {*}
     */
    findItem(pid) {
        axios.get('/api/post/find',{
            params:{
                pid:pid
            }
        }).then((res)=>{
            console.log(res.data)
           this.setState({
               item:res.data
           }) 
        }).catch((err)=>{
            console.log(err)
        });
    }
    render() {
        return (
            <div className="post-browser">
                <div className="browser-popup">
                        <div className="popup-wrapper">
                            <div className="banner">
                                <img alt="banner" src={require("../img/technology.png")}/>
                            </div>
                            <div className="header">
                                <h1 className="title">{this.state.item.post_title}</h1>
                                <div className="details">
                                    <div className="category">
                                        <i className="iconfont"></i>
                                        <div className="text">{(()=>{
                                            switch (this.state.item.post_categroy){
                                                case 1:
                                                    return 'Details of SLRs';
                                                case 2:
                                                    return 'Skills to Share';
                                            }})()}</div>
                                    </div>
                                    <div className="info">
                                        <span className="author">{this.state.item.post_author}
                                            <span className="dot">•</span>
                                        </span>
                                        <span className="date"> {this.state.item.post_publish_time}</span>
                                    </div>
                                </div>
                            </div>
                            <article className="article-content" dangerouslySetInnerHTML={{__html:this.state.item.post_content}}/>
                            <Comment pid={this.props.pid} username={this.props.username}/>
                        </div>
                    </div>
            </div>
        )
    }
}