import './layout.scss';

import {useState} from "react";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navbar/NavBar";
import {Outlet} from "react-router-dom";

const Layout: React.FC = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div id="layout-page">
            <SideBar
                isMobileOpen={isMobileOpen}
                onCloseMobile={() => setIsMobileOpen(false)}
            />

            <div className="main">
                <NavBar
                    onOpenMobileSidebar={() => setIsMobileOpen(true)}
                />

                <div id="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
