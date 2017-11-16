/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './partner.less'
import Nav from './Nav'
import Footer from './Footer'
import AngleTop from './AngleTop'
import AngleBottom from './AngleBottom'
import axios from 'axios'
import configJson from 'configJson' ;
import city from './city.json'
import groupBy from 'lodash/groupBy';
export default class Partner extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {}
    }

    componentDidMount() {
        this.getInfo()


    }

    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/partner`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data
                    }, function () {
                        that.renderMap();
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    renderMap = ()=> {
        var myChart = window.echarts.init(document.querySelector('.map'));
        // 指定图表的配置项和数据
        var geoCoordMap = city
        var data = [];
        const groupData = groupBy(this.state.data, 'city');
        for (let key in groupData) {
            let itemObj={name: key,value:''};
            for(let i=0;i<groupData[key].length;i++){
                itemObj.value+=(groupData[key][i].name+',')
            }
            data.push(itemObj)
        }
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        var option = {
            backgroundColor: '#F6F7F0',
            title: {
                text: '主要分布省份',
                bottom: 0,
                left: '14%'
            },
            grid: [{x: '5%', y2: '7%', width: '30%', height: '38%',},//左下角
            ],
            tooltip: {
                trigger: 'item',
            },
            xAxis: [
                {
                    name: '省份分布',
                    axisLine: {
                        lineStyle: {
                            color: '#323c48'
                        }
                    },
                    gridIndex: 0,
                    data: ["广东", "福建", "浙江", "江苏", "山东", "黑龙江"],//xAxis中的data要与data中的数据一一对应
                    axisTick: {
                        alignWithLabel: true //刻度尺为位置在label中间，默认是在label两侧
                    }
                }, //gridIndex 对应的grid
            ],
            yAxis: [
                {
                    name: '数量',
                    splitLine: {show: false},
                    gridIndex: 0,
                    axisLine: {
                        lineStyle: {
                            color: '#333'
                        }
                    },
                    interval: 1
                },
            ],
            geo: {
                map: 'china', //地图类型
                roam: true,//是否开启鼠标缩放和平移漫游
                label: {
                    emphasis: { //hover的时候是否显示地点名称
                        show: false
                    }
                },
                itemStyle: { //每一个省份
                    normal: {
                        areaColor: '#323c48',//区域颜色
                        borderColor: '#111' //省份边界
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                },
                regions: [{ //在地图中对特定的区域配置样式。
                    name: '广东',
                    itemStyle: {
                        normal: {}
                    }
                }]
            },
            series: [
                {
                    name: 'partner',
                    type: 'scatter',//当设为heatmap，显示热力图
                    coordinateSystem: 'geo', //使用地理坐标系
                    data: convertData(data), //data的格式为[{name:'xxx',value:[经度,纬度,值]}]
                    symbolSize: 12,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: { //散点item的样式
                        emphasis: {
                            borderColor: '#323c48',
                            borderWidth: 1
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            return params.name + ' <br/> ' + params.value[2].split(',').join('<br/>');
                        }
                    }
                },
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function (val) {
                        return 20;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            shadowBlur: 10,
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            return params.name + ' <br/> ' + params.value[2].split(',').join('<br/>');
                        }
                    }
                }, {
                    name: '公司数量',
                    type: 'bar',//条形图，设置为line则显示为折线图
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: [5, 2, 2, 1, 1, 1],
                    itemStyle: {
                        normal: {
                            color: '#323c48'
                        }
                    },

                }
            ]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    render() {
        return (
            <div className="" style={{overflow: 'hidden'}}>
                <Nav history={this.props.history}/>
                <div className="partner">
                    <h3>合作伙伴</h3>
                    <AngleTop />
                    <div className="partner-content">
                        <div className="map">
                        </div>
                    </div>
                    <AngleBottom />
                </div>
                <Footer></Footer>
            </div>


        )
    }
}
Partner.propTypes = {}