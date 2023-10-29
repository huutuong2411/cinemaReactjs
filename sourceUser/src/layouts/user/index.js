/* eslint-disable no-unused-vars */
import { bootrapCss, allMinCss, animateCss, flaticonCss, magnificPopupCss, odometerCss, carouselCss, themeDefaultCss, niceSelectCss, animatedheadlineCss, mainCss, logoImage, } from '../../components/teamplate';

import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

import './UserLayout.css'

function UserLayout() {
    return (
        <div className='main_user'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default UserLayout;