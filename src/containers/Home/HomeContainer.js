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
import News from './../../components/News'
import ReactSwipe from 'react-swipe';
import './index.less'
import Left from'./../../image/left.png'
import Right from'./../../image/right.png'
// import Header from 'components/Home/Header'
// import Nav from 'components/Home/Nav'
// import Special from 'components/Home/Special'
// import BookList from 'components/Home/BookList'

// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css'
let canSwipt=true;
export default class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            winWidth: 0,
            swipeIndex: 0,
            swipeCount: 0,
            swipetitle:''
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
        window.addEventListener('resize', this.resizeWin);
        this.setState({
            swipeCount: parseInt(this.refs.reactSwipe.getNumSlides())
        })
        // window.addEventListener('mousewheel',this.scrollWin)
        // window.addEventListener('scroll', (e)=>this.scrollWin(e));
    }
    onmousemove=()=>{
        window.addEventListener('mousewheel',this.scrollWin)
    }
    onmouseout=()=>{
        window.removeEventListener('mousewheel',this.scrollWin)
    }
    scrollWin=(event )=>{
        if(this.refs.reactSwipe){
            if(event.wheelDelta===120){
                if(this.state.swipeIndex!==0 && document.body.scrollTop===0){
                    event.preventDefault();
                    if(canSwipt){
                        this.refs.reactSwipe.prev();
                        canSwipt=false;
                        setTimeout(function () {
                            canSwipt=true
                        },800)
                    }
                }
            }else if(event.wheelDelta===-120){
                if(this.state.swipeIndex+1<this.state.swipeCount && document.body.scrollTop===0){
                    event.preventDefault();
                    if(canSwipt){
                        this.refs.reactSwipe.next();
                        canSwipt=false;
                        setTimeout(function () {
                            canSwipt=true
                        },800)
                    }
                }

            }
        }
    }
    resizeWin = ()=> {
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

    prev = ()=> {
        this.refs.reactSwipe.prev();
    }
    next = ()=> {
        this.refs.reactSwipe.next();
    }
    callback = (index, elem)=> {
        this.setState({
            swipeIndex: index
        })
        if(index===0){
            this.setState({
                swipetitle: ''
            })
        }
        if(index===1){
            this.setState({
                swipetitle: '产品分类'
            })
        }
        if(index===2){
            this.setState({
                swipetitle: '热门产品'
            })
        }
    }
    slide = (index)=> {
        this.refs.reactSwipe.slide(index);
    }

    render() {
        const that = this;
        // let dotsArr=[];
        // for(let i=0;i<this.state.swipeCount;i++){
        //     dotsArr.push(1)
        // }
        // const renderDots=dotsArr.map(function (item,index) {
        //     return (
        //         <li key={index} onClick={()=>that.slide(index)} className={index===that.state.swipeIndex?'active':''}>
        //
        //         </li>
        //     )
        // })
        return (
            <div className="container">
                <Nav history={this.props.history}/>
                <div className="show-if-pc">
                    <div className="carousel-box" ref="carousel" onMouseEnter={this.onmousemove} onMouseLeave={this.onmouseout}>
                        <ReactSwipe className="carousel" ref="reactSwipe" swipeOptions={{continuous: false,callback: this.callback}}>
                            <div><Banner history={this.props.history}/></div>
                            <div><Category showAll={false} history={this.props.history}/></div>
                            <div><HotProduct/></div>
                        </ReactSwipe>
                        <div className="control">
                            <div className="control-text">
                                <ul>
                                    <li>{this.state.swipeIndex + 1}</li>
                                    <li>/</li>
                                    <li>{this.state.swipeCount}</li>
                                    <li>{this.state.swipetitle}</li>
                                </ul>

                            </div>
                            <div className="control-btn">
                                <span className="pre" onClick={this.prev}></span>
                                <span className="next" onClick={this.next}></span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="show-if-mobile">
                    <Banner history={this.props.history}/>
                </div>
                <PageTtile showLeftLine={true} title='我们的优势'/>
                <div className="top-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                <Advantage />
                <div className="bottom-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                <div className="show-if-mobile">
                    <PageTtile showLeftLine={true} title='辂轺产品分类' desc='让汽车后市场互联互通！'/>
                    <div className="top-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                    <Category showAll={false} history={this.props.history}/>
                    <div className="bottom-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                    <PageTtile showLeftLine={true} title='辂轺热门产品'/>
                    <div className="top-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                    <HotProduct/>
                    <div className="bottom-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
                </div>
                <PageTtile showLeftLine={true} title='辂轺最新简闻'/>
                <News />

                <PageTtile showLeftLine={true} title='辂轺合作伙伴' desc=''/>
                <Partner  />
                <Footer />
            </div>
        )
    }
}
HomeContainer.propTypes = {}