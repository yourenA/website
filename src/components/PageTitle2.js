/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './pageTitle2.less'
export default class PageTiyle extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            active:false
        }
    }

    componentDidMount() {
        // if(that.refs.pageTitle.offsetTop<(document.body.scrollTop+document.body.clientHeight-500)){
        //     document.getElementById('pageTitleContent').className='down'
        // }
        // window.addEventListener('scroll',that.scrollEvent)
        const that=this;
        let waypoint = new window.Waypoint({
            element: that.refs.pageTitleContent,
            handler: function(direction) {
                // console.log(direction)
                console.log('down')
                that.setState({
                    active:true
                })
                // document.getElementById('pageTitleContent').className='down'
                this.destroy();
                // notify(this.id + ' hit')
            },
        })
    }
    componentWillUnmount=()=>{
        const that=this;
        // window.removeEventListener('scroll',that.scrollEvent)
    }
    render() {
        return (
            <div className="page-title2"  ref="pageTitleContent" >
                <div className="logo-line"></div>
                <div className="title-logo">
                    <h4>AMware</h4>
                </div>
                <div className="page-title-desc" >
                    <p  className={this.state.active?'down':''} >{this.props.title}</p>
                </div>
            </div>
        )
    }
}
PageTiyle.propTypes = {}