/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import item1 from './../../image/1.jpg'
import item2 from './../../image/2.jpg'
import item3 from './../../image/3.jpg'
import item4 from './../../image/item4.jpg'
import item5 from './../../image/5.jpg'
import pd1 from './../../image/product1.jpg'
import './categoryInfeo.less'
import ColorLine from './ColorLine'
export default class CategoryInfo extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            data: [{
                index: 0,
                image: item2,
                name: 'EPB电子驻车制动系统E',
                desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'
            },
                {index: 1, image: item3, name: 'EPB电子驻车制动系统', desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
                {index: 2, image: item4, name: 'EPB电子驻车制动系统', desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
                {index: 3, image: item5, name: 'EPB电子驻车制动系统', desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
                {index: 4, image: item2, name: 'EPB电子驻车制动系统', desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'}],
            tempData: [],
            products: [{category:0,title:'EPB电子驻车制动系统EPB电子驻车制动系统',data:[{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1}]},
                {category:1,title:'EPB电子驻制动系统',data:[{name:'产品0001',image:item2},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1}]},
                {category:2,title:'EPB电子驻车制动系统EPB电系统',data:[{name:'产品0001',image:item3},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1}]},
                {category:3,title:'EPB电子驻车制子驻车制动系统',data:[{name:'产品0001',image:item4},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1}]},
                {category:4,title:'EEPB电子驻车制',data:[{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1}]}],
            activeIndex:0
        }
    }

    componentDidMount() {
    }
    showDetail = (index) => {
        this.setState({
            activeIndex:index
        })
        // const detailUl=document.querySelector('.categoryInfo-content ul');
        // const categoryInfoH=document.querySelector('.categoryInfo').clientHeight;
        // console.log('categoryInfoH',categoryInfoH);
        // detailUl.style.top=-(categoryInfoH*index)+'px'
    }
    render() {
        const that=this;
        const categoryInfoSlider=this.state.data.map(function (item,index) {
            return(
                <li key={index} onClick={()=>that.showDetail(index)} className={index===that.state.activeIndex?"active":""}>
                    <img src={item.image} alt=""/>
                    <p> <span>{item.name}</span></p>
                </li>
            )
        })
        const categoryInfoContent=this.state.products.map(function (item,index) {
            return(
                <li key={index} id={item.category} name={item.category} className={index===that.state.activeIndex?"animated fadeIn":"animated myFadeOut"}>
                    <h3>{item.title}</h3>
                    {item.data.map(function (item2,index2) {
                        return(
                            <div key={index2} className="detail-item">
                                <div className="detail-img">
                                    <img src={item2.image} alt=""/>
                                </div>
                                <ColorLine num={3}/>
                                <div className="detail-desc" >
                                    <p>{item2.name}</p>
                                    <Link to='/products/10001'>查看详情</Link>
                                </div>
                            </div>
                        )
                    })}
                </li>
            )
        })
        return (
            <div className="categoryInfo-box">
                <div className="categoryInfo">
                    <div  className="categoryInfo-slider">
                        <ul>
                            {categoryInfoSlider}
                        </ul>
                    </div>
                    <div className="categoryInfo-content">
                        <ul >
                            {categoryInfoContent}
                        </ul>
                    </div>

                </div>
            </div>

        )
    }
}
CategoryInfo.propTypes = {
}