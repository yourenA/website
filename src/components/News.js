/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'

import adatar from './../image/avatar.png'
import './news.less'
export default class News extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            data:[{image:'http://img.weiot.net/portal/201401/29/200809um073mx02zoxdk7p.gif',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内,描述文字字数限制在140以内,描述文字字数限制在140以内,描述文字字数限制在140以内，描述文字字数限制在140以内,描述文字字数限制在140以内,描述文字字数限制在140以内,描述文字字数限制在140以内.'},
                {image:'http://f12.baidu.com/it/u=1505322598,1727959990&fm=72 ',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内'},
                {image:'http://f12.baidu.com/it/u=1505322598,1727959990&fm=72',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内'},
                {image:'http://f12.baidu.com/it/u=1505322598,1727959990&fm=72',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内'},
                {image:'http://f12.baidu.com/it/u=1505322598,1727959990&fm=72',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内'},]
        }
    }

    componentDidMount() {
    }
    render() {
        const renderNews=this.state.data.map(function (item,index) {
            return(
                <li key={index}>
                    <div className="avatar">
                        <div className="avatar-img"><img src={adatar} alt=""/></div>
                    </div>
                    <div className="content">
                        <div className="desc">{item.desc}</div>
                        <div className="image"><img src={item.image} alt=""/></div>
                    </div>
                </li>
            )
        })
        return (
            <div className="news-box">
                <div className="news">
                    <ul>
                        {renderNews}
                    </ul>
                </div>
            </div>
        )
    }
}
News.propTypes = {
}