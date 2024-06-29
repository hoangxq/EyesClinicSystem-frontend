import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './News.scss';
import { Button } from "@coreui/coreui";

export default class News extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 3,
        };
        return (
            <div>
                <div className="slider-container">
                    <h2> Giới thiệu </h2>
                    <Slider autoplay {...settings}>
                        <div className="child-slider">
                            <div className="image-container">
                                <img src="https://alinavn.com/uploads/up/root/editor/2023/03/30/21/56/w1230/61680166609_2502.jpg" />
                            </div>
                            <div className="text-container">
                                <p>Bác sĩ nước ngoài</p>
                            </div>
                        </div>

                        <div className="child-slider">
                            <div className="image-container">
                                <img src="https://alinavn.com/uploads/up/root/editor/2023/03/30/21/56/w1230/61680166609_2502.jpg" />
                            </div>
                            <div className="text-container">
                                <p>Trang thiết bị hiện đại</p>
                            </div>
                        </div>

                        <div className="child-slider">
                            <div className="image-container">
                                <img src="https://alinavn.com/uploads/up/root/editor/2023/03/30/21/56/w1230/61680166609_2502.jpg" />
                            </div>
                            <div className="text-container">
                                <p>Phục vụ tận tình</p>
                            </div>
                        </div>

                        <div className="child-slider">
                            <div className="image-container">
                                <img src="https://alinavn.com/uploads/up/root/editor/2023/03/30/21/56/w1230/61680166609_2502.jpg" />
                            </div>
                            <div className="text-container">
                                <p>Bác sĩ từ các bệnh viện hàng đầu</p>
                            </div>
                        </div>
                    </Slider>
                    
                </div>
            </div>


        );
    }
}