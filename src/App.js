
import React from 'react'
import {Route, Router} from 'react-router-dom'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import createHistory from 'history/createHashHistory'
import 'normalize.css'

/*
 全局导入less
 */
import './app.less'

import asyncComponent from './AsyncComponent'

import homeContainer from './containers/Home/HomeContainer'
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

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
    }
    componentDidMount() {

    }

    render() {
        console.log(parser(window.navigator));
        return (
            <Router history={history}>
                <Route render={({location}) => {
                    return (
                        <div key={location.pathname}>
                            <Route location={location} exact path="/" component={homeContainer}/>
                            <Route location={location} path="/contact" component={ContactUs}/>
                            <Route location={location} exact path="/products" component={Products}/>
                            <Route location={location} path="/products/:id" component={ProductDetail}/>
                        </div>
                    )
                }}/>
            </Router>
        );
    }
}