/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import {Link} from 'react-router-dom'
import Masonry from 'react-masonry-component';
import './categoryInfeo.less'
import ColorLine from './ColorLine'
import axios from 'axios'
import configJson from 'configJson' ;
import PageHeader from './../../components/PageHeader'
import PageTtile from './../../components/PageTitle'

export default class CategoryInfo extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            name:'',
            description:'',
            data: [],
            tempData: [],
            products: [],
            activeIndex: 0,
            query:this.GetQueryString('q')
        }
    }

    componentDidMount() {
        this.getInfo()
    }
    GetQueryString=(name)=>{
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = this.props.history.location.search.substr(1).match(reg);
        if(r!=null){
            return  unescape(r[2]);
        }
        return r
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
                    },function () {
                        if(response.data.data.rows.length>0){
                            if(this.state.query){
                                that.showDetail(parseInt(this.state.query))
                            }else{
                                that.showDetail(response.data.data.rows[0].id)

                            }
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
            url: `${configJson.prefix}/classify/getById`,
            method: 'get',
            params:{
                id:id
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        name:response.data.data.name,
                        description:response.data.data.description,
                        classifyUrl:response.data.data.classifyUrl,
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });
        axios({
            url: `${configJson.prefix}/product/${id}`,
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
            <div>
                <PageHeader bgSrc={`${configJson.prefix}${this.state.classifyUrl}`}/>
                <PageTtile title='辂轺产品与服务' desc='让汽车后市场互联互通！'/>
                <div className="categoryInfo-box">
                    <div className="categoryInfo">
                        <div className="categoryInfo-slider">
                            <ul style={{minHeight: this.state.slideMinHeight + 'px'}}>
                                {categoryInfoSlider}
                            </ul>
                        </div>
                        <div className="categoryInfo-content">
                            <h3 className="category-title">{that.state.name}</h3>
                            <p className="category-desc">{that.state.description}</p>
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
            </div>


        )
    }
}
CategoryInfo.propTypes = {}