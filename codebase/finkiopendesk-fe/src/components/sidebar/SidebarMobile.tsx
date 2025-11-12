import './sidebar.scss';

interface SidebarMobileProps {
    isOpen: boolean;
    onClose: () => void;
}

const SidebarMobile: React.FC<SidebarMobileProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div id="sidebar">
            <div className="sb-mobile">
                <div className="sb-mobile-header">
                    <h1>Logo</h1>
                    <button className="sb-mobile-close"
                            aria-label="close_sidebar"
                            onClick={onClose}
                    >
                        x
                    </button>
                </div>
                <h3>Mobile</h3>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarMobile;