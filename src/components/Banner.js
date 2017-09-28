/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import './banner.less'
import {Link} from 'react-router-dom'
import pc1 from './pc1.jpg'
export default class Banner extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            showMobileMenu: false
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="banner">
                <div className="banner-img">
                    <img src={pc1} alt=""/>
                </div>
                <div className="banner-desc">
                    <p className="company-name">辂轺科技</p>
                    <p className="company-name-en">AMware</p>
                    <p className="company-name-slogan">专注于汽车ECU（电子控制单元）产品开发</p>
                    <Link to='/'>查看更多</Link>
                </div>
            </div>
        )
    }
}
Banner.propTypes = {
}