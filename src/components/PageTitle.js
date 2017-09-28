/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './pageTitle.less'
export default class PageTiyle extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {}
    }

    componentDidMount() {
        const that=this;
        if(that.refs.pageTitle.offsetTop<(document.body.scrollTop+document.body.clientHeight-100)){
            that.refs.pageTitleContent.className='animated fadeInRight'
        }
        window.addEventListener('scroll',that.scrollEvent)
    }
    scrollEvent=()=>{
        const that=this;
        // console.log(that.refs.pageTitle.offsetTop)
        // console.log(document.body.scrollTop)
        // console.log(document.body.clientHeight)
        if(that.refs.pageTitle.offsetTop<(document.body.scrollTop+document.body.clientHeight-100)){
            that.refs.pageTitleContent.className='animated fadeInRight'
        }
    }
    componentWillUnmount=()=>{
        const that=this;
        window.removeEventListener('scroll',that.scrollEvent)
    }
    render() {
        return (
            <div className="page-title" ref='pageTitle'>
                <div className="page-title-content">
                    {this.props.showLeftLine?<span className="left-line"></span>:null}
                    <div ref="pageTitleContent">
                        <h3 >{this.props.title}</h3>
                        <p >{this.props.desc}</p>
                    </div>
                </div>

            </div>
        )
    }
}
PageTiyle.propTypes = {}