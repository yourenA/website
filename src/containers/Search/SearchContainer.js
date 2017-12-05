/**
 * Created by Administrator on 2016/7/2.
 */
import React from 'react'
import PropTypes from 'prop-types'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import AngleTop from './../../components/AngleTop'
import AngleBottom from './../../components/AngleBottom'
import {Link} from 'react-router-dom'
import pc from './../../image/item1.jpg'
import axios from 'axios'
import configJson from 'configJson' ;
import './styles/search.less'
export default class SearchContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentHot: '',
            searchSelect:this.GetQueryString('type')||'all',
            q:this.GetQueryString('q')||'',
            reg:this.GetQueryString('q')||'',
            result:'javascript开发',
            data:[]
        }
    }
    componentDidMount(){
        this.getInfo(this.state.searchSelect,this.state.q)
    }
    GetQueryString=(name)=>{
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = this.props.location.search.substr(1).match(reg);
        if(r!=null){
            return  unescape(r[2]);
        }
        return r
    }

    getInfo = (type,content)=> {
        if(type==='all'){
            type=''
        }else if(type==='classify'){
            type=1
        }else if(type==='product'){
            type=2
        }else if(type==='introduction'){
            type=3
        }

        const that = this;
        axios({
            url: `${configJson.prefix}/search`,
            method: 'get',
            params:{
                type,
                content
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    let transiform= response.data.data.map((item,index)=>{
                        return item
                    })
                    console.log('transiform',transiform)
                    that.setState({
                        data:transiform
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    handleChangeSearchSelect = (e)=> {
        this.setState({
            searchSelect: e.target.value
        },function () {
            this.getInfo(this.state.searchSelect,this.state.q)
        })
    }
    submitSearch = (e)=> {
        if (e.keyCode == 13) {
            this.setState({
                reg:e.target.value
            })
            this.getInfo(this.state.searchSelect,this.state.q)
        }
    }
    submitClick=()=>{
        this.getInfo(this.state.searchSelect,this.state.q)
    }
    handleChangeSearchInput=(e)=>{
        this.setState({
            q:e.target.value
        })
    }
    renderDesc=(url,item)=>{
        const reg=new  RegExp(`${this.state.reg}`,"gi");
        if(item.description.length>150 ){
            const largeIndex= item.description.search(reg);
            console.log('largeIndex',largeIndex)
            if(largeIndex>150){
                item.description=item.description.replace(item.description.slice(30,largeIndex-30),'...')
                console.log(item.description)
            }
        }
        return(
            <div className="content-wrap" >
                <p
                    dangerouslySetInnerHTML={{
                        __html:( item.description.length>150?(item.description.substring(0, 150) + '...').replace(reg,"<span class='red'>$&</span>") : item.description.replace(reg,"<span class='red'>$&</span>"))+'<a href="'+url+'" target="_blank">[查看详情]</a>'
                    }}></p>
            </div>
        )
    }
    render() {
        const reg=new  RegExp(`${this.state.reg}`,"gi");
        const renderSearchList=this.state.data.map((item,index)=>{
            if(item.model==='product'){
                return (
                    <li key={index} className="li-has-img">
                        <div className="title"> <span className="label">产品</span><Link  target='_blank' to={`/products/${item.id}`} dangerouslySetInnerHTML={{
                            __html:item.name.replace(reg,"<span class='red'>$&</span>")
                        }}></Link></div>
                        <div className="content">
                            <div className="img-wrap"><img src={`${configJson.prefix}${item.productUrl}`} alt=""/></div>
                            {
                                item.Contents.length>0&&
                                this.renderDesc(`#/products/${item.id}`,item.Contents[0])
                            }
                        </div>
                    </li>
                )
            }else if(item.model==='classify'){
                return (
                    <li key={index} className="li-has-img">
                        <div className="title"> <span className="label">产品分类</span><Link target='_blank' to={`/products?q=${item.id}`} dangerouslySetInnerHTML={{
                            __html:item.name.replace(reg,"<span class='red'>$&</span>")
                        }}></Link></div>
                        <div className="content">
                            <div className="img-wrap"><img src={`${configJson.prefix}${item.classifyUrl}`} alt=""/></div>
                            { this.renderDesc(`#/products?q=${item.id}`,item)}
                        </div>
                    </li>
                )
            }else if(item.model==='introduction'){
                return (
                    <li key={index} className="li-has-img">
                        <div className="title"> <span className="label">简闻</span></div>
                        <div className="content" style={{marginTop:'10px'}}>
                            {item.imageUrl&&<div className="img-wrap"><img src={`${configJson.prefix}${item.imageUrl}`} alt=""/></div>}
                            { this.renderDesc(`#/news#${item.id}`,item)}
                        </div>
                    </li>
                )
            }

        })
        return (
            <div className="search-page" style={{overflow:'hidden'}}>
                <Nav history={this.props.history}/>
                <div className="search-box">
                    <AngleTop />
                    <div className="search-content">
                        <div className="search">
                            <div className="search-wrap">
                                <select name="" id=""  defaultValue={this.state.searchSelect} onChange={this.handleChangeSearchSelect}>
                                    <option value="all">全部</option>
                                    <option value="classify">产品分类</option>
                                    <option value="product">产品</option>
                                    <option value="introduction">简闻</option>
                                </select>
                                <input type="input" value={this.state.q} onChange={this.handleChangeSearchInput} placeholder="输入搜索内容" id="search" onKeyDown={this.submitSearch}/>
                                <i className="fa fa-search" aria-hidden="true" onClick={this.submitClick}></i>
                            </div>
                            <div className="search-result">
                                <ul>
                                    {renderSearchList}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <AngleBottom />
                </div>
                <Footer />
            </div>
        )
    }
}
SearchContainer.propTypes = {
    hotData: PropTypes.array
}
