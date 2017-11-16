/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import AngleTop from './AngleTop'
import AngleBottom from './AngleBottom'
import Nav from './Nav'
import Footer from './Footer'
import adatar from './../image/avatar.png'
import './news.less'
import axios from 'axios'
import configJson from 'configJson' ;
import moment from 'moment'
export default class News extends React.Component {

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
            url: `${configJson.prefix}/introduction`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data.rows
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    render() {
        console.log(this.state)
        const renderNews = this.state.data.reverse().map(function (item, index) {
            return (
                <li key={index}>
                    <div className="avatar">
                        <div className="avatar-img"><img src={adatar} alt=""/></div>
                    </div>
                    <div className="content">
                        <div className="desc">{item.description}</div>
                        <div className="image"><img src={`${configJson.prefix}${item.imageUrl}`} alt=""/></div>
                        <div className="date">{moment(item.createdAt).format("YYYY-MM-DD HH:mm")}</div>
                    </div>
                </li>
            )
        })
        return (
            <div className="" style={{overflow: 'hidden'}}>
                <Nav history={this.props.history}/>
                <div className="news-box">
                    <h3>辂轺新闻</h3>
                    <AngleTop />
                   <div className="news-content">
                       <div className="news">
                           <ul>
                               {renderNews}
                           </ul>
                       </div>
                   </div>
                    <AngleBottom />
                </div>
                <Footer />
            </div>

        )
    }
}
News.propTypes = {}