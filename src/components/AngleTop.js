/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
export default class AngleTop extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            winWidth: 0,
        }
    }

    componentDidMount = ()=> {
        this.setState({
            winWidth: document.body.offsetWidth - 17
        })
        window.addEventListener('resize', this.resizeWin);
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.resizeWin)
    };
    resizeWin = ()=> {
        this.setState({
            winWidth: document.body.offsetWidth
        })
    }

    render() {
        return (
            <div className="top-angle" style={{borderRightWidth: this.state.winWidth + "px"}}></div>
        )
    }
}
AngleTop.propTypes = {}