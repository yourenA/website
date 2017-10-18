/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './pageTitle2.less'
export default class PageTiyle extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {}
    }

    componentDidMount() {
        const that=this;
        if(that.refs.pageTitle.offsetTop<(document.body.scrollTop+document.body.clientHeight-500)){
            document.getElementById('pageTitleContent').className='down'
        }
        window.addEventListener('scroll',that.scrollEvent)
    }
    scrollEvent=()=>{
        const that=this;
        // console.log(that.refs.pageTitle.offsetTop)
        // console.log(document.body.scrollTop)
        // console.log(document.body.clientHeight)
        if(that.refs.pageTitle.offsetTop<(document.body.scrollTop+document.body.clientHeight-500)){
            // that.refs.pageTitleContent.className='down';
            document.getElementById('pageTitleContent').className='down'
        }
    }
    componentWillUnmount=()=>{
        const that=this;
        window.removeEventListener('scroll',that.scrollEvent)
    }
    render() {
        return (
            <div className="page-title2" ref="pageTitle">
                <div className="logo-line"></div>
                <div className="title-logo">
                    <h4>AMware</h4>
                </div>
                <div className="page-title-desc" >
                    <p  ref="pageTitleContent" id="pageTitleContent" >{this.props.title}</p>
                </div>
            </div>
        )
    }
}
PageTiyle.propTypes = {}