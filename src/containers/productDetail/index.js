/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import PropTypes from 'prop-types'
import PageHeader from './../../components/PageHeader'
import PageTtile from './../../components/PageTitle'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Detail from './productDetail'
import pc1 from './../../image/3.jpg'
export default class ProductDetail extends React.Component {

    constructor(props) {
        super(props);

    }
    componentDidMount(){
        window.scrollTo(0,0)
    }
    render() {
        const {match} = this.props
        return (
            <div className="" style={{overflow:'hidden'}}>
                <Nav history={this.props.history}/>
                <PageHeader bgSrc={pc1}/>
                <PageTtile title='AMAX-TC1' desc=''/>
                <div className="max-width">
                    <Detail match={match}/>
                </div>
                <Footer />
            </div>
        );
    }
}

ProductDetail.propTypes = {
    match: PropTypes.object
}