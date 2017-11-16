/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Masonry from 'react-masonry-component';
import './categoryInfeo.less'
import ColorLine from './ColorLine'
import axios from 'axios'
import configJson from 'configJson' ;
export default class CategoryInfo extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            data: [],
            tempData: [],
            products: [],
            activeIndex: 0
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/classify/1`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data.rows
                    },function () {
                        if(response.data.data.rows.length>0){
                            that.showDetail(response.data.data.rows[0].id)
                        }
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    showDetail = (id) => {
        this.setState({
            activeIndex: id
        })
        const that = this;
        axios({
            url: `${configJson.prefix}/product/${id}/1`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        products: response.data.data.rows
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    render() {
        const that = this;
        var masonryOptions = {
            transitionDuration: 0
        };
        const categoryInfoSlider = this.state.data.map(function (item, index) {
            return (
                <li key={index} onClick={()=>that.showDetail(item.id)}
                    className={item.id === that.state.activeIndex ? "active" : ""}>
                    <p><span>{item.name}</span></p>
                </li>
            )
        })
        const categoryInfoContent = this.state.products.map(function (item, index) {
            return (
                <div className="detail-item" key={index}>
                    <div  >
                        <div className="detail-img">
                            <img src={`${configJson.prefix}${item.productUrl}`} alt=""/>
                        </div>
                        <ColorLine num={3}/>
                        <div className="detail-desc">
                            <p>{item.name}</p>
                            <Link to={`/products/${item.id}`}>查看详情</Link>
                        </div>
                    </div>

                </div>
            )
        })
        return (
            <div className="categoryInfo-box">
                <div className="categoryInfo">
                    <div className="categoryInfo-slider">
                        <ul style={{minHeight: this.state.slideMinHeight + 'px'}}>
                            {categoryInfoSlider}
                        </ul>
                    </div>
                    <div className="categoryInfo-content">
                        <h3 className="category-title">{that.state.data[0]?that.state.data[0].name:null}</h3>
                        <p className="category-desc">{that.state.data[0]?that.state.data[0].description:null}</p>
                        <Masonry
                            className={'my-gallery-class'} // default ''
                            elementType={'ul'} // default 'div'
                            options={masonryOptions} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        >
                            {categoryInfoContent}
                        </Masonry>
                    </div>

                </div>
            </div>

        )
    }
}
CategoryInfo.propTypes = {}