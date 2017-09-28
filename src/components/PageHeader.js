/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'


import './pageHeader.less'
export default class Category extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
        }
    }

    componentDidMount() {
    }
    render() {
        return (
            <div className="page-header">
                <div className="page-header-img">
                    <img src={this.props.bgSrc} alt=""/>
                </div>
            </div>
        )
    }
}
Category.propTypes = {
}