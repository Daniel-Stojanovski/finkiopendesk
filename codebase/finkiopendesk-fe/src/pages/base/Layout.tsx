import './layout.scss';

import {useEffect, useState} from "react";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navbar/NavBar";
import {Outlet} from "react-router-dom";
import NotificationsBox from "../../components/blocks/elements/NotificationsBox/NotificationsBox";
import {useAuth} from "../../shared/AuthContext";
import {backapi} from "../../shared/axios";
import type {NotificationGroupDto} from "../../shared/dto/NotificationGroupDto";

const Layout: React.FC = () => {
    const { user } = useAuth();

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    useEffect(() => {
        if (!user?.userId) return;

        backapi.get<NotificationGroupDto[]>(`/notifications/${user.userId}`)
            .then(res => {
                const hasUnread = res.data.some(group =>
                    group.events?.some(e => !e.read)
                );
                setHasUnreadNotifications(hasUnread);
            });
    }, [user]);

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
                    unreadNotifications={hasUnreadNotifications}
                />

                {/*{showNotifications && <NotificationsBox />}*/}
                <NotificationsBox onStateChange={setHasUnreadNotifications} isVisible={showNotifications} />

                <div id="content">
                    <Outlet context={{ searchQuery }} />
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default Layout;
