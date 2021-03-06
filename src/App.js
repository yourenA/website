import React from 'react'
import {Route, Router} from 'react-router-dom'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import createHistory from 'history/createHashHistory'
import 'normalize.css'
import axios from 'axios'
import configJson from 'configJson' ;
/*
 全局导入less
 */
import './app.less'

import asyncComponent from './AsyncComponent'

import homeContainer from './containers/Home/HomeContainer'
// import TurnTop from './components/Turn-top'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as getBaseInfo from './actions/getInfo';
require('es6-promise').polyfill();
const history = createHistory()
var parser = require('ua-parser-js');
/*
 normalize.css
 */

// const Search = asyncComponent(() =>
// import
// (/* webpackChunkName: "search" */ "./containers/Search/SearchContainer")
// )
const Products = asyncComponent(() =>
import
(/* webpackChunkName: "products" */ "./containers/products/index")
)

const ProductDetail = asyncComponent(() =>
import
(/* webpackChunkName: "productDetail" */ "./containers/productDetail/index")
)

const ContactUs = asyncComponent(() =>
import
(/* webpackChunkName: "ContactUs" */ "./components/ContactUs")
)
const News = asyncComponent(() =>
import
(/* webpackChunkName: "News" */ "./components/News")
)
const Partner = asyncComponent(() =>
import
(/* webpackChunkName: "Partner" */ "./components/Partner")
)
const Search = asyncComponent(() =>
import
(/* webpackChunkName: "search" */ "./containers/Search/SearchContainer")
)

const NoFound = asyncComponent(() =>
import
(/* webpackChunkName: "nofound" */ "./containers/NoFound/index")
)


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
    }

    componentDidMount() {
        this.addScriptTag(`http://whois.pconline.com.cn/ipJson.jsp?callback=testJson&ip=${window.returnCitySN.cip}`,this.addData)
        // this.addData();
        this.props.getBaseInfo();
        this.props.getContact();
        this.props.getLink()
    }

    addScriptTag = (src, cb)=> {
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.src = src;
        document.body.appendChild(script);
        console.log('add script')
        setTimeout(function () {
            if(cb) cb()
        },500)
    }
    addData = ()=> {
        const brower = parser(window.navigator);
        let type = 1;
        if (brower.device.type === "tablet") {
            type = 3;
        } else if (brower.device.type === "mobile") {
            type = 2;
        }
        axios({
            url: `${configJson.prefix}/visitor/add`,
            method: 'POST',
            data: {
                ip: window.returnCitySN.cip,
                province:window.pro?window.pro:'未知省份',
                city: window.city?window.city:'未知城市',
                device: parser(window.navigator).device.model,
                type: type
            },
        })
            .then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }

    render() {
        // console.log(parser(window.navigator));
        return (
            <Router history={history}>
                <Route render={({location}) => {
                    return (
                        <div key={location.pathname} className="react">
                            <Route location={location} exact path="/" component={homeContainer}/>
                            <Route location={location} path="/search" component={Search}/>
                            <Route location={location} path="/contact" component={ContactUs}/>
                            <Route location={location} path="/news" component={News}/>
                            <Route location={location} path="/partner" component={Partner}/>
                            <Route location={location} exact path="/products" component={Products}/>
                            <Route location={location} path="/products/:id" component={ProductDetail}/>
                        </div>
                    )
                }}/>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state,
    };
}
function mapDispatchToProps(dispath) {
    return bindActionCreators({...getBaseInfo}, dispath);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);