/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import './partner.less'
import Nav from './Nav'
import Footer from './Footer'
import AngleTop from './AngleTop'
import AngleBottom from './AngleBottom'
export default class Partner extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {}
    }

    componentDidMount() {

        var myChart = window.echarts.init(document.querySelector('.map'));

        // 指定图表的配置项和数据
        var geoCoordMap = { //"海门":[121.15,31.89] 地点:经纬度
            "海门": [121.15, 31.89],
            "鄂尔多斯": [109.781327, 39.608266],
            "招远": [120.38, 37.35],
            "舟山": [122.207216, 29.985295],
            "齐齐哈尔": [123.97, 47.33],
            "盐城": [120.13, 33.38],
            "赤峰": [118.87, 42.28],
            "青岛": [120.33, 36.07],
            "乳山": [121.52, 36.89],
            "金昌": [102.188043, 38.520089],
            "泉州": [118.58, 24.93],
            "莱西": [120.53, 36.86],
            "广州": [113.23, 23.16],
        };
        var data = [
            {name: "海门", value: "xxxx公司"},
            {name: "舟山", value: "xxxx公司"},
            {name: "齐齐哈尔", value: "xxxx公司"},
            {name: "盐城", value: "xxxx公司"},
            {name: "青岛", value: "xxxx公司"},
            {name: "广州", value: "xxxx公司,xxxxx公司"},
            {name: "泉州", value: "xxxx公司"},
        ]
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
                            return params.name + ' <br/> ' + params.value[2].split(',').join('<br/>n');
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
                            return params.name + ' <br/> ' + params.value[2].split(',').join('<br/>n');
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