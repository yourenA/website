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
import './styles/search.less'
export default class SearchContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentHot: '',
            searchSelect:this.GetQueryString('type'),
            q:this.GetQueryString('q')||'',
            result:'javascript开发',
            data:[{title:'搜索标test题1',desc:'搜索结果描述，搜索结果描述，搜索结果描述，搜索结test果描述，搜索结果描述，搜索结果描述，搜索结果描述，',type:'catogr'},
                {pc:pc,title:'搜索标题1',desc:'搜索结果描述，搜索结果描述，搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述搜索结果描述，搜索结果描述，搜索结果描述，搜索结果描述，搜索结果描述，',type:'catogr'},
                {title:'搜索标题1',desc:'搜索结果描述，搜索结果描述，搜afafaf索结果描述，搜索结果搜fafafa索结果描述搜索结果描述搜索结果描述描述，搜索结果描述，搜索结果描述，搜索结果描述，',type:'catogr'},
                {title:'搜索标题1',desc:'搜索结果描述，搜索结果描述，搜索结test果描述，搜索结果描述，搜索结果描述，搜索结果描述，搜索结果描述，',type:'catogr'},
                {title:'搜索标题1',desc:'搜索结果描述，搜索结果描述，搜索结果描述，搜索结果描述，搜索结果描述，搜索结果描述，搜索结果描述，',type:'catogr'},
                {title:'搜索标题1',desc:'搜索结果描述，搜索结果描述，搜索结果test描述，搜索结果描述，搜索结果描述，搜索结果描述，搜索结果描述，',type:'catogr'}]
        }
    }
    componentDidMount(){
        if(this.state.q){
            let transiform=this.state.data.map((item,index)=>{
                const reg=new  RegExp(`${this.state.q}`,"gi");
                item.title=item.title.replace(reg,"<span class='red'>$&</span>")
                item.desc=item.desc.replace(reg,"<span class='red'>$&</span>")
                return item
            })
            this.setState({
                data:transiform
            })
        }
    }
    GetQueryString=(name)=>{
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = this.props.location.search.substr(1).match(reg);
        if(r!=null){
            return  unescape(r[2]);
        }
        return r
    }
    handleChangeSearchSelect = (e)=> {
        this.setState({
            searchSelect: e.target.value
        })
    }
    submitSearch = (e)=> {
        if (e.keyCode == 13) {
            console.log(this.state.searchSelect, e.target.value);
        }
    }
    submitClick=()=>{
        console.log(this.state.searchSelect,this.state.q)
    }
    handleChangeSearchInput=(e)=>{
        this.setState({
            q:e.target.value
        })
    }
    render() {
        const renderSearchList=this.state.data.map((item,index)=>{
            if(item.pc){
                return (
                    <li key={index} className="li-has-img">
                        <div className="title"> <Link to="/" dangerouslySetInnerHTML={{
                            __html: item.title
                        }}></Link></div>
                        <div className="content">
                            <div className="img-wrap"><img src={item.pc} alt=""/></div>
                            <div className="content-wrap">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html:( item.desc.length>150?item.desc.substring(0, 150) + '...' : item.desc)+'<span>[查看详情]</span>'
                                    }}></p>
                            </div>
                        </div>
                    </li>
                )
            }else{
                return (
                    <li key={index}  className="li-hasnot-img">
                        <div className="content-wrap">
                            <Link to="/" dangerouslySetInnerHTML={{
                                __html: item.title
                            }}></Link>
                            <p dangerouslySetInnerHTML={{
                                __html:( item.desc.length>150?item.desc.substring(0, 150) + '...' : item.desc)+'<span>[查看详情]</span>'
                            }}></p>
                        </div>
                    </li>
                )
            }

        })
        return (
            <div className="" style={{overflow:'hidden'}}>
                <Nav history={this.props.history}/>
                <div className="search-box">
                    <AngleTop />
                    <div className="search-content">
                        <div className="search">
                            <div className="search-wrap">
                                <select name="" id=""  defaultValue={this.state.searchSelect} onChange={this.handleChangeSearchSelect}>
                                    <option value="quanbu">全部</option>
                                    <option value="feilei">产品分类</option>
                                    <option value="chanping">产品</option>
                                    <option value="jianwen">简闻</option>
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
