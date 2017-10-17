/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './nav.less'
import Logo from './../image/wiki.png'
export default class Nav extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            showMobileMenu: false
        }
    }

    componentDidMount() {
    }

    showMobileMenu = ()=> {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu
        })
    }
    showMobileSearch=()=>{
        this.props.history.push('/search');
    }
    render() {
        const renderTopLine=[1,1,1,1,1,1,1,1,1,1,1,1].map(function (item,index) {
            return(
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
                    <Link to='/'><img src={Logo} alt=""/><h1>广州辂轺信息科技有限公司</h1></Link>
                </div>
                <div className="right">
                    <ul>


                    </ul>
                </div>
                <div className="search-Placeholder">
                    <input placeholder="输入搜索内容"/>
                    <i className="fa fa-search" aria-hidden="true"></i></div>
                <div className="mobile-menu-icon" onClick={this.showMobileMenu}>
                    <span style={{left: this.state.showMobileMenu ? '-50px' : '0'}}>
                        <i className="fa fa-bars"></i>
                        <i className="fa fa-times"></i>
                    </span>
                </div>
                <div className="mobile-menu-icon" onClick={this.showMobileSearch}>
                    <i className="fa fa-search"></i>
                </div>

                <div
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
Nav.propTypes = {
}