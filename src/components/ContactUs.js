/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './contactUs.less'
import Nav from './Nav'
import Footer from './Footer'
import contact from '../image/contact.jpg'
import AngleTop from './AngleTop'
import AngleBottom from './AngleBottom'
export default class ContactUs extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
        }
    }

    render() {
        return (
            <div className="" style={{overflow: 'hidden'}}>
                <Nav history={this.props.history}/>
                <div className="contactUs">
                    <h3>联系我们</h3>
                    <AngleTop />
                    <div className="contactUs-content">

                        <div className="contactUs-content-box">
                            <div className="contactUs-left">
                                <div>
                                    <img src={contact} alt=""/>
                                </div>
                            </div>
                            <div className="contactUs-right">
                                <div>
                                    <p>欢迎访问广州辂轺信息科技有限公司官方网站。我们欢迎客户提出疑问、获得解答。</p>
                                    <br/>
                                    <p>你可以通过一下三种方式与我们联系:</p>
                                    <p>每周一至周五拨打我们的联系电话:+86 020 87519370</p>
                                    <p>通过电邮 : info@amwares.com 与我们联系</p>
                                    <br/>
                                    <p>我们随时为您提供帮助。</p>
                                    <br/>
                                    <p>公司地址 : 广东省广州市天河区天河东路242号601室</p>
                                </div>
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
ContactUs.propTypes = {}