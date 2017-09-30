/**
 * Created by Administrator on 2016/7/2.
 */
import React from 'react'
import PropTypes from 'prop-types'

/*actions*/

import Header from './../../components/Search/Header'

import './styles/search.less'
export default class SearchContainer extends React.Component {
    constructor(props) {
        super(props)
        this.hotClick = this.hotClick.bind(this)
        this.upDateValue = this.upDateValue.bind(this)
        this.state = {
            currentHot: ''
        }
    }
    componentWillMount() {
        console.log('进入搜索页面')
    }
    upDateValue(value) {
        this.setState({currentHot: value})
    }
    hotClick(text) {
        this.setState(() => { return {currentHot: text} })
    }
    render() {
        const { hotData } = this.props
        const { currentHot } = this.state
        return (
            <div style={{height: '100vh'}}>
                <Header history={this.props.history} handleClick={this.props.currentAnimate}
                        currentHot={currentHot}
                        upDateValue={this.upDateValue}
                />
            </div>
        )
    }
}
SearchContainer.propTypes = {
    hotData: PropTypes.array
}
