import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss';
import { Button } from "@coreui/coreui";
import ListDoctor from "./Sections/ListDoctor"
import News from "./Sections/News"
import Footer from "./Sections/Footer"
import Header  from "./Sections/HomeHeader"
import { Link } from "react-router-dom";
import About from "./Sections/About";
export default class MultipleItems extends Component {
    render() {
        return (
            <div>
                {/* <About/> */}
                <News/>
                {/* Các phần khác của trang HomePage */}
                
                <ListDoctor />
                {/* Các phần khác của trang HomePage */}
                <Link to="/patient/all-schedules-of-doctors">
                <div className="fixed-button">
                    <button type="primary">Đăng ký lịch khám ngay</button>
                </div>
                </Link>
                <Footer />
            </div>
            

        );
    }
}