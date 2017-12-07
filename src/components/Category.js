/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import item2 from './../image/2.jpg'
import item3 from './../image/3.jpg'
import item4 from './../image/item4.jpg'
import item5 from './../image/5.jpg'
import axios from 'axios'
import configJson from 'configJson' ;
import './category.less'
export default class Category extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/classify`,
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
    clickCategory = (item)=> {
        console.log('item',item)
        this.props.history.push(`/products?q=${item.id}`)
    }
    showCategoryDetail = (index)=> {
    }

    render() {
        const that = this;
        const liMap = this.state.data.map(function (item, index) {
                return (
                    <li key={index} className={item.active ? "category-item active" : "category-item" }
                        onClick={()=>that.showCategoryDetail(item.index)}>
                        <div className="category-img">
                            <img src={`${configJson.prefix}${item.classifyUrl}`}  alt=""/>
                        </div>
                        <div className="category-name">
                            <h3 onClick={()=>{that.clickCategory(item)}} className="title">{item.name}</h3>
                            <p className="desc">{item.description}</p>
                            <Link to={`/products?q=${item.id}`}>查看详情</Link>
                        </div>

                    </li>
                )
        })
        return (
            <div className="category-box ">
                <div className="category">
                    <ul className="category-ul">
                        {liMap}
                    </ul>

                </div>
            </div>

        )
    }
}
Category.propTypes = {}