import './sidebar.scss'

interface SidebarMobileProps {
    isOpen: boolean;
}

const SidebarMobile: React.FC<SidebarMobileProps> = ({ isOpen}) => {
    return (
        <>
            {isOpen &&
                <div id="sidebar">
                    <div className="sb-mobile">
                        <h1>Logo</h1>
                        <h3>Mobile</h3>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                </div>
            }
        </>
    );
}

export default SidebarMobile;