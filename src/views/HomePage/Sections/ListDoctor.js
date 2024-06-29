import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ListDoctor.scss';
import { Button } from "@coreui/coreui";

export default class ListDoctor extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 3
        };
        return (
            <div>
                <div className="list-doctor">
                    <h2> Bác sĩ </h2>
                    <a href="/doctors">Xem thêm</a>
                    <Slider autoplay {...settings}>
                        <div className="child-slider">
                            <img className="doctor-image" src="https://th.bing.com/th/id/R.f80df497709ef538ca97040bdeaa7157?rik=mO2UwfZjzZUBlg&riu=http%3a%2f%2fegolead.com%2fwp-content%2fuploads%2f2020%2f03%2fmale_doctor-1.png&ehk=SpPBYn8hnjmbMN49jh8XaDM4kA%2fR57qWuO0dzcEUdaI%3d&risl=&pid=ImgRaw&r=0" alt="Eye 3" ></img>
                        </div>
                        <div className="child-slider">
                            <img className="doctor-image" src="https://rmvn.cdn.jaysoft.asia/wp-content/uploads/2019/08/4.png"></img>
                        </div>
                        <div className="child-slider">
                            <img className="doctor-image" src="https://th.bing.com/th/id/R.f80df497709ef538ca97040bdeaa7157?rik=mO2UwfZjzZUBlg&riu=http%3a%2f%2fegolead.com%2fwp-content%2fuploads%2f2020%2f03%2fmale_doctor-1.png&ehk=SpPBYn8hnjmbMN49jh8XaDM4kA%2fR57qWuO0dzcEUdaI%3d&risl=&pid=ImgRaw&r=0"></img>
                        </div>
                        <div className="child-slider">
                            <img className="doctor-image" src="https://th.bing.com/th/id/R.f80df497709ef538ca97040bdeaa7157?rik=mO2UwfZjzZUBlg&riu=http%3a%2f%2fegolead.com%2fwp-content%2fuploads%2f2020%2f03%2fmale_doctor-1.png&ehk=SpPBYn8hnjmbMN49jh8XaDM4kA%2fR57qWuO0dzcEUdaI%3d&risl=&pid=ImgRaw&r=0"></img>
                        </div>
                        <div className="child-slider">
                            <img className="doctor-image" src="https://rmvn.cdn.jaysoft.asia/wp-content/uploads/2019/08/4.png"></img>
                        </div>
                        <div className="child-slider">
                            <img  className="doctor-image" src="https://rmvn.cdn.jaysoft.asia/wp-content/uploads/2019/08/4.png"></img>
                        </div>
                        <div className="child-slider">
                            <img className="doctor-image" src="https://rmvn.cdn.jaysoft.asia/wp-content/uploads/2019/08/4.png"></img>
                        </div>
                        <div className="child-slider">
                            <img className="doctor-image" src="https://rmvn.cdn.jaysoft.asia/wp-content/uploads/2019/08/4.png"></img>
                        </div>
                        <div className="child-slider">
                            <img className="doctor-image" src="https://rmvn.cdn.jaysoft.asia/wp-content/uploads/2019/08/4.png"></img>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}