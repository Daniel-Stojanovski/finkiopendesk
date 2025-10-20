interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <div> sidebar </div>
            <div className="main">
                <div> navbar </div>
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
