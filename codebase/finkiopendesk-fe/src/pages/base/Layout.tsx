import './layout.scss';

import {useState} from "react";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navbar/NavBar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const openMobileSidebar = () => setIsMobileOpen(true);
    const closeMobileSidebar = () => setIsMobileOpen(false);

    return (
        <>
            <div id="layout-page">
                <SideBar
                    isMobileOpen={isMobileOpen}
                    onCloseMobile={closeMobileSidebar}
                />
                <div className="main">
                    <NavBar onOpenMobileSidebar={openMobileSidebar} />
                    <div className="content">{children}</div>
                </div>
            </div>
        </>
    );
};

export default Layout;