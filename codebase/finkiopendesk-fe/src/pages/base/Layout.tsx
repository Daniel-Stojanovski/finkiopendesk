import './layout.scss';

import SideBar from "../../components/sidebar/SideBar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div id="layout-page">
                <SideBar/>
                <div className="main">
                    <div> navbar </div>
                    <div className="content">{children}</div>
                </div>
            </div>
        </>
    );
};

export default Layout;
