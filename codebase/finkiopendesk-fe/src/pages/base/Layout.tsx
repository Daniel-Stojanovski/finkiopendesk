import './layout.scss';

import {useEffect, useState} from "react";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navbar/NavBar";
import {Outlet} from "react-router-dom";
import NotificationsBox from "../../components/blocks/elements/NotificationsBox/NotificationsBox";
import {useAuth} from "../../shared/AuthContext";
import {backapi} from "../../shared/axios";
import type {NotificationGroupDto} from "../../shared/dto/NotificationGroupDto";
import {isView, useBreakpoint} from "../../shared/hooks";
import FilterBox from "../../components/blocks/elements/Filter/FilterBox";
import type {FiltersDto} from "../../shared/dto/FiltersDto";

const Layout: React.FC = () => {
    const { user } = useAuth();
    const bp = useBreakpoint();

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [filters, setFilters] = useState<FiltersDto>({
        program: null,
        format: null,
        hardness: null,
        semesterType: null
    });

    const isViewMobile = (bp === "xs");

    const showMainBackdrop =
        isViewMobile && (isMobileOpen || isFilterOpen);

    const showContentBackdrop =
        !isViewMobile && isFilterOpen;

    const isDiscussionView = isView('/discussion/');
    const isForumView = isView('/discussions');
    const isGuideView = isView('/subjects');

    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    const toggleFilters = () => {
        setIsFilterOpen(prev => !prev);
    };

    useEffect(() => {
        if (!user?.userId) return;

        backapi.get<NotificationGroupDto[]>(`/notifications/${user.userId}`)
            .then(res => {
                const hasUnread = res.data.some(group =>
                    group.events?.some(e => !e.statusRead)
                );
                setHasUnreadNotifications(hasUnread);
            });
    }, [user]);

    useEffect(() => {
        setIsFilterOpen(false);
    }, [isForumView, isGuideView]);

    const generateFilterTag = (f: any) => {
        const program = f.program ?? "___";
        const format = f.program ? "F23" : "__";
        const hardness = f.hardness ?? "__";
        const semester = f.semesterType ?? "_";

        return `${program}_${format}${hardness}${semester}`;
    };

    const filterTag = generateFilterTag(filters);

    return (
        <div id="layout-page">
            <SideBar
                isMobileOpen={isMobileOpen}
                onCloseMobile={() => {setIsMobileOpen(false); setIsFilterOpen(false)}}
                isFiltersVisible={isForumView || isGuideView}
                filters={filters}
                setFilters={setFilters}
                toggleFilters={toggleFilters}
                isFilterOpen={isFilterOpen}
                filterTag={filterTag}
            />

            <div className="main">
                {showMainBackdrop && (
                    <div
                        className="main-backdrop"
                        onClick={() => {
                            setIsMobileOpen(false);
                            setIsFilterOpen(false);
                        }}
                    />
                )}

                <NavBar
                    onOpenMobileSidebar={() => {setIsMobileOpen(true); setShowNotifications(false)}}
                    isVisible={!isDiscussionView}
                    onToggleNotifications={toggleNotifications}
                    isNotificationsOpen={showNotifications}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    unreadNotifications={hasUnreadNotifications}
                />

                <NotificationsBox onStateChange={setHasUnreadNotifications} isVisible={showNotifications} onEventItemClick={() => setShowNotifications(false)}/>

                <div id="content">
                    {showContentBackdrop && (
                        <div
                            className="content-backdrop"
                            onClick={() => setIsFilterOpen(false)}
                        />
                    )}

                    <FilterBox isOpen={isFilterOpen} filters={filters} setFilters={setFilters} onClose={() => setIsFilterOpen(false)} filterTag={filterTag}/>

                    <Outlet context={{ searchQuery, filters, setFilters, openSidebar: () => setIsMobileOpen(true) }} />
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default Layout;
