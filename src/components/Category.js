/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import item1 from './../image/1.jpg'
import item2 from './../image/2.jpg'
import item3 from './../image/3.jpg'
import item4 from './../image/item4.jpg'
import item5 from './../image/5.jpg'
import mac from './../image/mac.png'
import './category.less'
export default class Category extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            data:[{index:0,image:item2,name:'EPB电子驻车制动系统',desc:'电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
            {index:1,image:item3,name:'EPB电子驻车制动系统',desc:'电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
            {index:2,image:item4,name:'EPB电子驻车制动系统',desc:'电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
            {index:6,image:item4,name:'EPB电子驻车制动系统',desc:'电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
            {index:7,image:item5,name:'EPB电子驻车制动系统',desc:'电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'}],
            tempData:[]
        }
    }

    componentDidMount() {
        this.setState({
            tempData:this.state.data
        })
    }
    clickCategory=()=>{
        this.props.history.push('/')
    }
    showCategoryDetail=(index)=>{
    }
    render() {
        const that=this;
        const liMap=this.state.tempData.map(function (item,index) {

            if(item.type==='detail'){
                const detailliMap=item.products.map(function (item2,index2) {
                    return(
                        <li key={index2}>
                            <h4>{item2.name}</h4>
                            <div>{item2.desc}</div>
                        </li>
                    )
                })
                return(
                    <div key={index} className="category-detail category-detail-show">
                        <h3>{item.category}</h3>
                        <ul>
                            {detailliMap}
                        </ul>
                    </div>
                )
            }else{
                return (
                    <li key={index}  className={item.active?"category-item active" :"category-item" } onClick={()=>that.showCategoryDetail(item.index)}>
                        <div className="category-img">
                            <img src={item.image} alt=""/>
                        </div>
                        <div className="category-name">
                            <h3 onClick={()=>{that.props.history.push('/products')}} className="title" >{item.name}</h3>
                            <p className="desc">{item.desc}</p>
                            <Link to="/products">查看详情</Link>
                        </div>

                    </li>
                )
            }


        })
        return (
            <div className="category-box ">
                <div className="category">
                    {this.props.showAll?
                        <ul className="category-ul">
                            {liMap}
                        </ul>:
                        <ul className="category-ul">
                            {liMap}
                        </ul>
                    }

                </div>
            </div>

        )
    }
}
Category.propTypes = {
}