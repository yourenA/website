/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import './colorLine.less'
export default class ColorLine extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const numArr=new Array(Math.floor(Math.random()*3+1));
        for(let i=0,len=numArr.length;i<len;i++){
            numArr[i]=1
        }
        const renderNumArr=numArr.map(function (item,index) {
            return (
                <span className={`line line-${numArr.length}`} key={index}></span>
            )
        })
        return(
            <div className="color-line">
                {renderNumArr}
            </div>
        );
    }
}
