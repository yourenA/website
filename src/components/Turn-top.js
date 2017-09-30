/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './turn-top.less'
export default class TurnTop extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {}
    }

    componentDidMount() {
        const that=this;
        window.addEventListener('scroll',that.scrollEvent)
    }
    scrollEvent=()=>{
        const that=this;
    }
    componentWillUnmount=()=>{
        const that=this;
        window.removeEventListener('scroll',that.scrollEvent)
    }
    render() {
        return (
            <div className="turn-top" ref="pageTitle">
            </div>
        )
    }
}
TurnTop.propTypes = {}