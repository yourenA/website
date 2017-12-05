/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import PropTypes from 'prop-types'

import CategoryInfo from './CategoryInfo'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import pc1 from './../../image/1.jpg'
export default class BookListContainer extends React.Component {

    constructor(props) {
        super(props);

    }
    componentDidMount(){
        window.scrollTo(0,0)
    }
    render() {
        const { match } = this.props
        return(
            <div className="" style={{overflow:'hidden'}}>
                <Nav history={this.props.history}/>

                    <CategoryInfo showAll={true}  history={this.props.history} />
                <Footer />
            </div>
        );
    }
}

BookListContainer.propTypes = {
    match: PropTypes.object
}