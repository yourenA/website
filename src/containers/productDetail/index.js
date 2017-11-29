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
import axios from 'axios'
import configJson from 'configJson' ;
export default class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:{}
        }
    }
    componentDidMount(){
        window.scrollTo(0,0)
        this.getInfo();
    }
    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/product/getById`,
            method: 'get',
            params:{
                id:this.props.match.params.id
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    render() {
        const {match} = this.props
        return (
            <div className="" style={{overflow:'hidden'}}>
                <Nav history={this.props.history}/>
                <PageHeader bgSrc={`${configJson.prefix}${this.state.data.productUrl}`}/>
                <PageTtile title={this.state.data.name} desc=''/>
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