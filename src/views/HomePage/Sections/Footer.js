import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    IoLocationSharp,
    IoCheckmarkSharp,
    IoPhonePortraitOutline,
    IoLogoFacebook,
    IoLogoYoutube,
} from 'react-icons/io5';
import './Footer.scss';

export default  class Footer extends Component {

    render() {
        return (
            <div className="footer-container">
                <div className="w60">
                    <div className="footer-up">
                        <div className="d-flex flex-column h-100">
                            <footer className="w-100 py-4 flex-shrink-0">
                                <div className="container-footer py-4">
                                    <div className="row gy-4 gx-5">
                                        <div className="infor-footer col-lg-5 col-md-6">
                                            <div
                                                className="image-footer"
                                                // style={{
                                                //     backgroundImage: `url(https://bookingcare.vn/assets/icon/bookingcare-2020.svg)`,
                                                // }}
                                            ></div>
                                            <h2 className="company">Phòng khám mắt Hà Nội</h2>
                                            <div className="address">
                                                <IoLocationSharp /> 1 Đại Cồ Việt, Hai Bà Trung, Hà Nội
                                            </div>
                                            <div className="dk">
                                                <IoCheckmarkSharp /> ĐKKD số: 0123456789. Sở KHĐT Hà Nội cấp ngày
                                                20/12/2020
                                            </div>
                                            <div className="iso"></div>
                                        </div>

                                        <div className="contact-footer col-lg-4 col-md-6">
                                            <a>
                                                <li>Liên hệ hợp tác</li>
                                            </a>
                                            <a>
                                                <li>Tuyển dụng</li>
                                            </a>
                                            <a>
                                                <li>Câu hỏi thường gặp</li>
                                            </a>
                                            <a>
                                                <li>Điều khoản sử dụng</li>
                                            </a>
                                            <a>
                                                <li>Chính sách Bảo mật</li>
                                            </a>
                                        </div>

                                        <div className="branch-footer col-lg-3 col-md-6">
                                            <div className="branch">
                                                <h4>Trụ sở tại Hà Nội</h4>
                                                <p>1 Đại Cồ Việt, Hai Bà Trung, Hà Nội</p>
                                            </div>
                                            <div className="branch">
                                                <h4>Trụ sở tại TP Hồ Chí Minh</h4>
                                                <p>Số 1, Hồ Bá Kiện, Phường 15, Quận 1</p>
                                            </div>
                                            <div className="branch">
                                                <h4>Hỗ trợ khách hàng</h4>
                                                <p>support@gmail.com (7h - 18h)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="download-app">
                                        {' '}
                                        <IoPhonePortraitOutline />
                                        <p>
                                            Tải ứng dụng cho điện thoại hoặc máy tính bảng: Android
                                            iPhone/iPad Khác
                                        </p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>

                <div className="footer-down">
                    <div className="w60">
                        <div className="content-footer">
            
                            <span>
                                <IoLogoFacebook className="icon-network facebook" />
                                <IoLogoYoutube className="icon-network youtube" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




