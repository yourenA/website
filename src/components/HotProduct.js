/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './hotProduct.less'
import ColorLine from './../containers/products/ColorLine'
import item2 from './../image/2.jpg'
import pd1 from './../image/product1.jpg'
import {Link} from 'react-router-dom'
export default class HotProduct extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            data:[{name:'产品0001',image:item2},{name:'产品0001',image:item2},{name:'产品0001',image:item2},{name:'产品0001',image:item2},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1},{name:'产品0001',image:pd1}]
        }
    }
    render() {
        const that=this;

        const categoryInfoContent=this.state.data.slice(0,6).map(function (item2,index2) {
            return(
                <div key={index2} className="detail-item">
                    <div className="detail-img">
                        <img src={item2.image} alt=""/>
                        <p className="hot-tip"><span>热门</span></p>
                    </div>
                    <ColorLine num={3}/>
                    <div className="detail-desc" >
                        <p>{item2.name}</p>
                        <Link to='/products/10001'>查看详情</Link>
                    </div>
                    <div className="box-shadow"></div>
                </div>
            )
        })
        return (
            <div className="hot-product-content">
                <ul >
                    {categoryInfoContent}
                </ul>
            </div>

        )
    }
}
HotProduct.propTypes = {}