/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import {Link} from 'react-router-dom'
export default class Swipe extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {}
    }

    render() {
        return (
            <div className="banner">
                <div className="banner-img">
                    <img src={this.props.data.imageUrl} alt=""/>
                </div>
                <div className="banner-desc">
                    <div >
                        <p className="company-name">{this.props.data.title}</p>
                        <p className="company-name-slogan">{this.props.data.desc}</p>
                    </div>
                    <Link to='/'>查看更多</Link>
                    <div className="border border-top"></div>
                    <div className="border border-right"></div>
                    <div className="border border-bottom"></div>
                    <div className="border border-left"></div>
                </div>
            </div>
        )
    }
}
Swipe.propTypes = {}