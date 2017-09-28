/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

//关于import什么时候用{}，什么时候不用大括号，通过那个插件或者组件是否包含default来判断，如果包含，则不需要{}

/*actions*/

/*component*/
import Nav from './../../components/Nav'
import Banner from './../../components/Banner'
import Category from './../../components/Category'
import Partner from './../../components/Partner'
import Footer from './../../components/Footer'
import PageTtile from './../../components/PageTitle2'
import HotProduct from './../../components/HotProduct'
import Advantage from './../../components/Advantage'
// import Header from 'components/Home/Header'
// import Nav from 'components/Home/Nav'
// import Special from 'components/Home/Special'
// import BookList from 'components/Home/BookList'

// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css'

export default class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            winWidth: 0
        }
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
    }

    componentDidMount = ()=> {
        // setTimeout(function () {
        // },2000)
        this.setState({
            winWidth: document.body.offsetWidth
        })
        window.addEventListener('resize', this.resizeWin)
    }
    resizeWin=()=>{
        this.setState({
            winWidth: document.body.offsetWidth
        })
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.resizeWin)
    };
    componentWillMount() {
        // NProgress.start();
    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    render() {
        const {navMain, bookDetails} = this.props
        return (
            <div className="container">
                <Nav history={this.props.history}/>
                <Banner history={this.props.history}/>
                <PageTtile showLeftLine={true} title='我们的优势'/>
                <div className="top-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                <Advantage />
                <div className="bottom-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                <PageTtile showLeftLine={true} title='辂轺产品分类' desc='让汽车后市场互联互通！'/>
                <div className="top-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                <Category showAll={false} history={this.props.history}/>
                <div className="bottom-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                <PageTtile showLeftLine={true} title='辂轺热门产品'/>
                <div className="top-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                <HotProduct/>
                <div className="bottom-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                <PageTtile showLeftLine={true} title='辂轺合作伙伴' desc=''/>
                <div className="top-angle" style={{borderRightWidth: this.state.winWidth + "px",borderColor: '#404a59 transparent'}}></div>
                <Partner  />
                <div className="bottom-angle" style={{borderRightWidth: this.state.winWidth + "px",borderColor: ' transparent #404a59'}}></div>
                <Footer />
            </div>
        )
    }
}
HomeContainer.propTypes = {}