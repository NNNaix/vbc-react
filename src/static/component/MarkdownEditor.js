import React, {Component} from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import {Link,Redirect} from 'react-router-dom'
import 'codemirror/lib/codemirror.css'
import "codemirror/theme/monokai.css"
import "codemirror/theme/dracula.css"
import 'codemirror/addon/fold/foldgutter.css'
import 'highlight.js/styles/monokai.css'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/fold/markdown-fold'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/edit/closetag'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/lib/languages/markdown'
import axios from 'axios'

marked.setOptions({
    highlight(code) {
        return highlight.highlightAuto(code).value
    }
});

/* markdown 编辑器 */
export default class MarkDownEditor extends Component {
    constructor(props) {
        super(props);
        this.publish = this.publish.bind(this);
        this.state = {
            title: "",
            categroy:"",
            cover:"",
            markdownRender: "",
            isPublished:false
        }
    }

    publish() {
        if(!this.state.title||this.state.title.length>70){
            alert("The title should be less than 70 characters and not empty")
        }else if(!this.state.categroy){
            alert("Please select a category")
        }else if(!this.state.markdownRender){
            alert("The content of the post cannot be empty.")
        }else{
            axios.post('/api/post/publish', {
                title: this.state.title,
                categroy:this.state.categroy,
                content: this.state.markdownRender,
            }).then((res)=>{
                const data = res.data;
                this.setState({
                    isPublished:true
                })
                window.location.reload();
            }).catch()
        }
    }

    render() {
        if(this.state.isPublished){
            return  <Redirect to="/"/>
        }else {
            return (
                <div className="publish-container">
                    <h1 className="header">Aperture MarkDown Editor</h1>
                    <div className="post-form">
                        <div className="post-title">
                            <label htmlFor="title">Title: </label>
                            <input type="text" value={this.state.title} onInput={(e)=>{
                                this.setState({
                                    title:e.target.value
                                })
                            }} name="title" id="title"/>
                        </div>
                        <div className="post-category">
                            <label htmlFor="category">Category: </label>
                            <select name="title" id="title" value={this.state.categroy} onChange={(e)=>{
                                this.setState({
                                    categroy:e.target.value
                                })
                            }}>
                                <option> </option>
                                <option value="1">Details of SLRs</option>
                                <option value="2">Skills to Share</option>
                            </select>
                        </div>
                        <div className="markdown-container">
                            <CodeMirror
                                value=""
                                className="markdown-editor"
                                options={{
                                    mode: 'markdown',
                                    theme: "monokai",
                                    lineNumbers: true,
                                    lineWrapping: true,
                                    foldGutter: true,
                                    gutter: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                                    matchBrackets: true,
                                    autoCloseTags: true,
                                }}
                                onChange={(editor, data, value) => {
                                    this.setState({
                                        markdownRender: marked(value, {breaks: true})
                                    })
                                }}
                            />
                            <div className="markdown-render mainbody-body"
                                 dangerouslySetInnerHTML={{__html: this.state.markdownRender}}/>
                        </div>
                        <div className="button-dark markdown-publish" onClick={this.publish}>
                            publish
                        </div>
                    </div>
                </div>
            )
        }


    }
}



