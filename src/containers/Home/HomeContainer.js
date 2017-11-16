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
import Swipe from './../../components/swipe'
import AngleTop from './../../components/AngleTop'
import AngleBottom from './../../components/AngleBottom'
import ReactSwipe from 'react-swipe';
import './index.less'
import axios from 'axios'
import configJson from 'configJson' ;
let canSwipt=true;
export default class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hadSwipeIndex:[],
            swipeIndex: 0,
            swipeCount: 0,
            swipetitle:'',
            data:[]
        }
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
    }

    componentDidMount = ()=> {
        // setTimeout(function () {
        // },2000)

        this.getInfo()
        // window.addEventListener('mousewheel',this.scrollWin)
        // window.addEventListener('scroll', (e)=>this.scrollWin(e));
    }
    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/slideShow`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data
                    },function () {
                        that.setState({
                            swipeCount:  response.data.data.length
                        })
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    onmousemove=()=>{
        // window.addEventListener('mousewheel',this.scrollWin)
    }
    onmouseout=()=>{
        // window.removeEventListener('mousewheel',this.scrollWin)
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
                        },600)
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
                        },600)
                    }
                }

            }
        }
    }

    componentWillMount() {
        // NProgress.start();
    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    prev = (index)=> {
        this.refs.reactSwipe.prev();
        if(this.state.hadSwipeIndex.indexOf(index)<0){
            this.state.hadSwipeIndex.push(index)
            this.setState({
                hadSwipeIndex:this.state.hadSwipeIndex,
            })
        }else{
        }
    }
    next = (index)=> {
        this.refs.reactSwipe.next();
        if(this.state.hadSwipeIndex.indexOf(index)<0){
            this.state.hadSwipeIndex.push(index)
            this.setState({
                hadSwipeIndex:this.state.hadSwipeIndex,
            })
        }else{
        }
    }
    callback = (index, elem)=> {
            this.setState({
                swipeIndex: index
            })
    }
    slide = (index)=> {
        this.refs.reactSwipe.slide(index);
        if(this.state.hadSwipeIndex.indexOf(index)<0){
            this.state.hadSwipeIndex.push(index)
            this.setState({
                hadSwipeIndex:this.state.hadSwipeIndex,
            })
        }else{
        }
    }

    render() {
        console.log('this.state',this.state)
        const that = this;
        let dotsArr=[];
        for(let i=0;i<this.state.swipeCount;i++){
            dotsArr.push(1)
        }
        const renderDots=dotsArr.map(function (item,index) {
            return(
                <li key={index} onClick={()=>that.slide(index)} className={index===that.state.swipeIndex?'dot dot-active':'dot'}></li>
            )
        })
        const renderSwipe=this.state.data.map(function (item,index) {
            return (
                <div key={index} className={(that.state.swipeIndex === index )? "swipe-active":""}>
                    <Swipe  data={item}/>
                </div>
            )
        })
        return (
            <div className="container">
                <Nav history={this.props.history}/>
                <div className="show-if-pc">
                    {this.state.data.length>0?
                        <div className="carousel-box" ref="carousel" onMouseEnter={this.onmousemove} onMouseLeave={this.onmouseout}>
                        <ReactSwipe className="carousel" ref="reactSwipe" swipeOptions={{continuous: false,callback: this.callback}}>
                            {
                                renderSwipe
                            }
                        </ReactSwipe>
                        <div className="control">
                            <div className="control-dots">
                                <ul>
                                    {renderDots}
                                </ul>
                            </div>
                            <div className="control-btn">
                                <span className="pre" onClick={()=>this.prev(this.state.swipeIndex)}></span>
                                <span className="next" onClick={()=>this.next(this.state.swipeIndex)}></span>
                            </div>

                        </div>
                    </div>:<div></div>}

                </div>
                <div className="show-if-mobile">
                    <Banner history={this.props.history}/>
                </div>
                <PageTtile showLeftLine={true} title='我们的优势'/>
                <AngleTop />
                <Advantage />
                <AngleBottom />
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
              {/*  <PageTtile showLeftLine={true} title='辂轺最新简闻'/>
                <News />

                <PageTtile showLeftLine={true} title='辂轺合作伙伴' desc=''/>
                <Partner  />*/}
                <Footer />
            </div>
        )
    }
}
HomeContainer.propTypes = {}