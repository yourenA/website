/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './footer.less'
import {connect} from 'react-redux';
 class Footer extends React.Component {

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
            const backTop =document.documentElement.scrollTop || document.body.scrollTop;
            // console.log('backTop',backTop)
            var speedTop = backTop / 8;
            document.documentElement.scrollTop=(backTop - speedTop);
            body.scrollTop=(backTop - speedTop);
            if (backTop == 0) {
                console.log('到达顶部')
                clearInterval( that.scrollTopTimer);
            }
        }, 20);
    }
    render() {
        const {info}=this.props;
        return (
            <div className="footer">
                <div className="footer-container">
                    <span className="turn-top" onClick={this.turnTop}></span>
                    <div className="footer-category">
                        <h3> <i className="fa fa-home" aria-hidden="true"></i>关于我们  </h3>
                        <div className="category-content">
                            {info.description}
                        </div>
                    </div>
                    <div className="footer-category">
                        <h3><i className="fa fa-address-card-o" aria-hidden="true"></i>联系方式</h3>
                        <div className="category-content">
                            <ul>
                                <li>
                                    地址： {info.address}
                                </li>
                                <li>
                                    电话： {info.tel}
                                </li>
                                <li>
                                    传真： {info.fax}
                                </li>
                                <li>
                                    电邮： {info.email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-category">
                        <h3><i className="fa fa-link" aria-hidden="true"></i>友情链接  </h3>
                        <div className="category-content">
                            <ul>
                                {
                                    info.link.map(function (item,index) {
                                        return (
                                            <li key={index}>
                                                <a href={item.url} target="_blank" >{item.name}</a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    {info.copyright}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        info: state.info,
    };
}
export default connect(mapStateToProps)(Footer);