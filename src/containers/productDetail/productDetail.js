/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import PropTypes from 'prop-types';
import PhotoSwipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import pc1 from './../../image/3.jpg'
import pc2 from './../../image/1.jpg'
import pc3 from './../../image/2.jpg'
import pc4 from './../../image/5.jpg'
import './productDetail.less'
export default class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gallery: null,
            data:[{title:'空调控制ECU',desc:'该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',image:pc1},
                {title:'空调控制ECU',desc:'该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',image:pc2},
                {title:'空调控制ECU',desc:'该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',image:pc3},
                {title:'空调控制ECU',desc:'该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',image:pc4},
                {title:'空调控制ECU',desc:'该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',image:pc4}]
        }

    }
    componentDidMount=()=>{

        this.loadImg();
        window.onscroll=this.loadImg
    }
    loadImg=()=>{
        let items=document.querySelectorAll('.detail-item');
        let imgObj=document.querySelectorAll(".detail-item-img img");
        let l=0;
        let seeHeight = document.documentElement.clientHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        for(let i=0;i<items.length;i++){
            if(items[i].offsetTop +100 < seeHeight + scrollTop){
                if(imgObj[i].getAttribute("src") == ""){
                    imgObj[i].src = imgObj[i].getAttribute("data-src");
                }
            }
            if(imgObj[i].offsetTop + 100 > seeHeight + scrollTop){
                l=i;
                break;
            }

        }
    }
    componentWillUnmount = () => {
        window.onscroll=null;
        this.closeGallery();
    };
    closeGallery = () => {
        if (!this.gallery) return;
        this.gallery.close();
    };
    openGallery = (index) => {
        const items = [

        ];
        for(let i=0,len=this.state.data.length;i<len;i++){
            items.push({
                src: this.state.data[i].image,
                w: 0,
                h: 0,
            })
        }

        const pswpElement = this.pswpElement;
        const options = {index: index};
        this.gallery = new PhotoSwipe( pswpElement, PhotoswipeUIDefault, items, options);
        this.gallery.listen('gettingData', (index, item) => {
            const _this = this;
            if (item.w < 1 || item.h < 1) { // unknown size
                var img = new Image();
                img.onload = function() { // will get size after load
                    item.w = this.width; // set image width
                    item.h = this.height; // set image height
                    _this.gallery.invalidateCurrItems(); // reinit Items
                    _this.gallery.updateSize(true); // reinit Items
                };
                img.src = item.src; // let's download image
            }
        });
        this.gallery.init();
    };
    render() {
        const that=this;
        const renderDetail=this.state.data.map(function (item,index) {
                return (
                    <div key={index} className="detail-item">
                        <div className="detail-item-img" onClick={() => that.openGallery(index)}>
                            <img data-src={item.image} src="" alt=""/>
                            <div className="show-big-image">
                                <span  >查看大图</span>
                            </div>
                        </div>
                        <div className="detail-item-desc">
                            <div>
                                <h3>{item.title}</h3>
                                <p> {item.desc}</p>
                            </div>
                        </div>
                    </div>
                )

        })
        return (
            <div className="product-detail">
                {renderDetail}

                <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true" ref={(div) => {this.pswpElement = div;} }>

                    <div className="pswp__bg" />
                    <div className="pswp__scroll-wrap">
                        <div className="pswp__container">
                            <div className="pswp__item" />
                            <div className="pswp__item" />
                            <div className="pswp__item" />
                        </div>

                        <div className="pswp__ui pswp__ui--hidden">

                            <div className="pswp__top-bar">

                                <div className="pswp__counter" />

                                <button className="pswp__button pswp__button--close" title="Close (Esc)" />

                                <button className="pswp__button pswp__button--fs" title="Toggle fullscreen" />

                                <button className="pswp__button pswp__button--zoom" title="Zoom in/out" />

                                <div className="pswp__preloader">
                                    <div className="pswp__preloader__icn">
                                        <div className="pswp__preloader__cut">
                                            <div className="pswp__preloader__donut" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                                <div className="pswp__share-tooltip" />
                            </div>

                            <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />

                            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />

                            <div className="pswp__caption">
                                <div className="pswp__caption__center" />
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

ProductDetail.propTypes = {
}