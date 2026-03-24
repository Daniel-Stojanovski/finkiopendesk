import './layout.scss';

import {useState} from "react";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navbar/NavBar";
import {Outlet} from "react-router-dom";
import NotificationsBox from "../../components/blocks/elements/NotificationsBox/NotificationsBox";

const Layout: React.FC = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    return (
        <div id="layout-page">
            <SideBar
                isMobileOpen={isMobileOpen}
                onCloseMobile={() => setIsMobileOpen(false)}
            />

            <div className="main">
                <NavBar
                    onOpenMobileSidebar={() => setIsMobileOpen(true)}
                    onToggleNotifications={toggleNotifications}
                    isNotificationsOpen={showNotifications}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {showNotifications && <NotificationsBox />}

                <div id="content">
                    <Outlet context={{ searchQuery }} />
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default Layout;
