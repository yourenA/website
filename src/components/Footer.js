/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './footer.less'
import ColorLine from './../containers/products/ColorLine'
export default class Category extends React.Component {

    constructor(props) {
        super(props);
        this.scrollTopTimer=null;
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
        }
    }

    componentDidMount() {
    }
    turnTop=()=>{
        const body = document.querySelector('body');
        const that=this;
        if(this.scrollTopTimer){
            clearInterval(this.scrollTopTimer);
        }
        if(this.scrollBottomTimer){
            clearInterval(this.scrollBottomTimer);
        }
        this.scrollTopTimer = setInterval(function () {
            const backTop = body.scrollTop;
            var speedTop = backTop / 8;
            body.scrollTop=(backTop - speedTop);
            if (backTop == 0) {
                console.log('到达顶部')
                clearInterval( that.scrollTopTimer);
            }
        }, 20);
    }
    render() {
        return (
            <div className="footer">
                <div className="footer-container">
                    <span className="turn-top" onClick={this.turnTop}></span>
                    <div className="footer-category">
                        <h3> <i className="fa fa-home" aria-hidden="true"></i>关于我们  </h3>
                        <div className="category-content">
                            广州辂轺信息科技2013年成立于广州,是一家专注于汽车ECU（电子控制单元）产品开发的科技企业。
                            依托于自行开发的AUTOSAR汽车软件架构和OSEK实时操作系统，凭借自身多年的技术积累，为广大客户提供各种ECU解决方案和产品。
                        </div>
                    </div>
                    <div className="footer-category">
                        <h3><i className="fa fa-address-card-o" aria-hidden="true"></i>联系方式</h3>
                        <div className="category-content">
                            <ul>
                                <li>
                                    地址：广州市天河区天河东路242号601室
                                </li>
                                <li>
                                    电话：+86 020 87519370
                                </li>
                                <li>
                                    传真：+86 020 85262282
                                </li>
                                <li>
                                    电邮：info@amwares.com
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-category">
                        <h3><i className="fa fa-link" aria-hidden="true"></i>友情链接  </h3>
                        <div className="category-content">
                            <ul>
                                <li>
                                    <a target="_blank" href="">XXXXXX科技有限公司</a>
                                </li>
                                <li>
                                    <a target="_blank" href="">XXXXXX科技有限公司</a>
                                </li>
                                <li>
                                    <a  target="_blank" href="">XXXXXX科技有限公司</a>
                                </li>
                                <li>
                                    <a  target="_blank" href="">XXXXXX科技有限公司</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    © 2014-2017 广州辂轺信息科技有限公司 版权所有
                </div>
            </div>
        )
    }
}
Category.propTypes = {
}