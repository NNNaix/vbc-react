import React, {Component} from 'react';
import {Link} from 'react-router-dom'

/* 帖子*/
class PostItem extends Component {
    constructor(){
        super()
    }
    render() {
        return (
            <article className="post-item">
                <div className="item-content">
                    <div className="details">
                        <div className="category">
                            <i className="iconfont "></i>
                            <span className="category-name">{this.props.categroy}</span>
                        </div>
                        <div className="info">
                            <span className="author">{this.props.author}
                                <span className="dot">•</span>
                            </span>
                            <span className="date"> {this.props.date}</span>
                        </div>
                    </div>
                    <Link onlyActiveOnIndex to={`/post/${this.props.pid}`} >
                        <img alt="cover" className="cover"
                             src={require("../img/technology.png")}
                             style={{width: "800px", height: "280px"}}/>
                    </Link>
                    <h2 className="title">{this.props.title}</h2>
                </div>
                <div className="bottom-bar">
                    <Link onlyActiveOnIndex to={`/post/${this.props.pid}`}>
                        <div className="read">
                            <span className="prompt-text">read more</span>
                            <i className="iconfont icon-right"></i>
                        </div>
                    </Link>
                    <div className="button-group">
                        <div className="prompt-text">share</div>
                        <i className="iconfont icon-twitter"></i>
                        <i className="iconfont icon-facebook"></i>
                        <i className="iconfont icon-reddit"></i>
                        <i className="iconfont icon-weibo"></i>
                    </div>
                </div>
            </article>
        )
    }
}


/* 帖子列表 */
class PostList extends Component {
    constructor(){
        super();
        this.scrollAdd=this.scrollAdd.bind(this);
        this.timer = null;
    }
    componentWillMount(){
        // 懒加载 - 滑动到底部自动添加新数据并渲染
        window.addEventListener('scroll', this.scrollAdd);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.scrollAdd)
    }
    scrollAdd(){
        let scrollTop = document.body.scrollHeight - window.innerHeight - document.documentElement.scrollTop;
        if (scrollTop < 100) {
            // 节流防止多次触发添加重复的数据
            if(!this.timer){
                this.timer = setTimeout(()=>{
                    //ajax 向后台根据uid排序 依次获取十项数据
                    this.props.addItems(this.props.filter)
                    this.timer= null;
                },250)
            }
        }
    }

    render() {
        return (
            <main className="post-group">
                <div className="post-items">
                    {this.props.postItems.map((item, index) => {
                        return <PostItem key={item.pid}
                                         categroy={(()=>{
                                             switch (item.post_categroy){
                                                 case 1:
                                                     return 'Details of SLRs';
                                                 case 2:
                                                     return 'Skills to Share';
                                             }})()}
                                         title={item.post_title}
                                         date={item.post_publish_time}
                                         author={item.post_author}
                                         coverUrl={item.coverUrl}
                                         pid = {item.pid}
                        />
                    })}
                </div>
                <h1 className="prompt">{this.props.isInsufficient?"There is no more post":""}</h1>
            </main>
        )
    }
}

/* 官方新闻 */
class OfficialNews extends Component{
    constructor(){
        super();
        this.state={
            isFixed:false
        }
    }
    componentWillMount(){
        window.addEventListener('scroll', (e) => {
            let scrollTop = document.documentElement.scrollTop;
            //滑动距离超过800时候position变为fixed
            if (scrollTop >=100) {
                this.setState({
                    isFixed:true
                })
            }else {
                this.setState({
                    isFixed:false
                })
            }
        });
    }
    render(){
        return(
            <aside className={this.state.isFixed?`official-news fixed`:`official-news`} >
                <div className="prompt-header">official news</div>
                <div className="official-news-list">{
                    this.props.officialItems?
                        this.props.officialItems.map((item,index)=>{
                            return(
                                <Link  to={`/post/${item.pid}`} key={index}>
                                <div className="official-news-item" >
                                    <div className="news-title">{item.post_title}</div>
                                </div>
                                </Link>
                            )
                        })
                        :
                        <div className="prompt-text">There is no official news for now.we'll see!</div>
                }
                </div>
            </aside>
        )
    }
}


export default class Home extends Component {
    constructor(){
        super();
        // this.newsItem=[
        //     {
        //         title:"we are heros!",
        //         pid:1
        //     },
        //     {
        //         title:"join the Overwatch!",
        //         pid:2
        //     },
        //     {
        //         title:"just last on dance~~~~",
        //         pid:3
        //     },
        //     {
        //         title:"we are heros!",
        //         pid:1
        //     },
        //     {
        //         title:"join the Overwatch!",
        //         pid:2
        //     },
        //     {
        //         title:"just last on dance~~~~just last on dance~~~~just last on dance~~~~just last on dance~~~~",
        //         pid:3
        //     }
        // ]
    }


    render() {
        return (
            <div className="home-wrapper">
                <div className="bg">
                    <div className="bg-decoration"></div>
                    <div className="bg-mask">
                        <h1>Through the Aperture,Watch the world</h1>
                    </div>
                </div>
                <PostList postItems={this.props.postItems} filter={this.props.filter || null} isInsufficient={this.props.isInsufficient} addItems={this.props.addItems} />
                <OfficialNews officialItems={this.props.officialItems}/>
            </div>
        )
    }
}