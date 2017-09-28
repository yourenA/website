/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import './advantage.less'
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
            <div className="advantage">
                <div className="advantage-content">
                    <ul>
                        <li>
                            <div className="circle">
                                <i className="fa fa-taxi"></i>
                            </div>
                            <p className="circle-desc">我们的优势</p>
                        </li>
                        <li>
                            <div className="circle">
                                <i className="fa fa-bolt"></i>
                            </div>
                            <p className="circle-desc">我们的优势</p>
                        </li>
                        <li>
                            <div className="circle">
                                <i className="fa fa-paper-plane-o"></i>
                            </div>
                            <p className="circle-desc">我们的优势</p>
                        </li>
                        <li>
                            <div className="circle">
                                <i className="fa fa-edge"></i>
                            </div>
                            <p className="circle-desc">我们的优势</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
Category.propTypes = {
}