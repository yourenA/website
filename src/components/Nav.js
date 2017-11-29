/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import './nav.less'
class Nav extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            showMobileMenu: false,
            searchSelect: 'quanbu'
        }
    }

    componentDidMount = ()=> {

    }
    showMobileMenu = ()=> {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu
        })
    }
    showMobileSearch = ()=> {
        this.props.history.push('/search');
    }
    showSearch = ()=> {
        this.setState({
            active: true
        })
        const search = document.querySelector('#search');
        search.focus()
    }
    hideSearch = ()=> {
        this.setState({
            active: false
        })
    }
    handleChangeSearchSelect = (e)=> {
        console.log(e.target)
        this.setState({
            searchSelect: e.target.value
        })
    }
    submitSearch = (e)=> {
        if (e.keyCode == 13) {
            console.log(this.state.searchSelect, e.target.value)
            // stopEvent(ev);//阻止enter键的默认行为
            window.open(`http://localhost:3002/#/search?type=${this.state.searchSelect}&q=${e.target.value}`);
        }
    }

    render() {
        const {info}=this.props;
        const renderTopLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(function (item, index) {
            return (
                <li key={index}></li>
            )
        })
        return (
            <nav className="">
                <div className="top-line">
                    <ul>{renderTopLine}</ul>
                </div>
                <div className="left">
                    <ul>
                        <li><Link to='/products'>产品与服务</Link></li>
                        <li><Link to='/news'>新闻</Link></li>

                        <li><Link to='/contact'>联系我们</Link></li>
                        <li><Link to='/partner'>合作伙伴</Link></li>
                        {/*      <li><Link to='/products'>前瞻技术</Link></li>
                         <li><Link to='/products'>我们的团队</Link></li>*/}
                    </ul>
                </div>
                <div className="center">
                    <Link to='/'><img src={info.logoUrl} alt=""/><h1>{info.name}</h1></Link>
                </div>
                <div className="right">
                    <ul>
                    </ul>
                </div>
                <div className="mobile-menu-icon" onClick={this.showMobileMenu}>
                    <span style={{left: '0'}}>
                        <i className="fa fa-bars"></i>
                    </span>
                </div>
                <div className="search-Placeholder">
                    <div className={this.state.active ? ' search-wrap active' : 'search-wrap'}>
                        <select name="" id="" value={this.state.searchSelect} onChange={this.handleChangeSearchSelect}>
                            <option value="quanbu">全部</option>
                            <option value="feilei">产品分类</option>
                            <option value="chanping">产品</option>
                            <option value="jianwen">简闻</option>
                        </select>
                        <input placeholder="输入搜索内容" id="search" onKeyDown={this.submitSearch}/>
                    </div>
                    {this.state.active ? <i className="fa fa-close" aria-hidden="true" onClick={this.hideSearch}></i> :
                        <i className="fa fa-search" aria-hidden="true" onClick={this.showSearch}></i>}
                </div>

                <div className="mobile-menu-icon" onClick={this.showMobileSearch}>
                    <i className="fa fa-search"></i>
                </div>
                <div onClick={this.showMobileMenu}
                     className={this.state.showMobileMenu ? "mobile-menu show-mobile-menu" : "mobile-menu hide-mobile-menu"}>
                    <ul>
                        <li><Link to='/products'>产品与服务</Link></li>
                        <li><Link to='/news'>新闻</Link></li>

                        <li><Link to='/contact'>联系我们</Link></li>
                        <li><Link to='/partner'>合作伙伴</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        info: state.info,
    };
}
export default connect(mapStateToProps)(Nav);