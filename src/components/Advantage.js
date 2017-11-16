/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './advantage.less'
import axios from 'axios'
import configJson from 'configJson' ;
export default class Category extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        this.getInfo()
    }
    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/advantage`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    render() {
        return (
            <div className="advantage">
                <div className="advantage-content">
                    <ul>
                        {this.state.data.map(function (item,index) {
                            return(
                                <li key={index}>
                                    <div className="circle">
                                        <i className={`fa ${item.icon}`}></i>
                                    </div>
                                    <p className="circle-desc">{item.description}</p>
                                </li>
                            )
                        })}

                    </ul>
                </div>
            </div>
        )
    }
}
Category.propTypes = {
}