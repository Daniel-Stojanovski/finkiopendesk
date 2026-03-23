import './sidebar.scss';
import UserInfo from "../blocks/elements/UserInfo/UserInfo";

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
                    <img src="src/logo/logo-compact-finkiopendesk-500x250.png" width="100" height="50"/>
                    <button className="sb-mobile-close"
                            aria-label="close_sidebar"
                            onClick={onClose}
                    >
                        <i className='bi bi-x'></i>
                    </button>
                </div>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>

                <UserInfo/>
            </div>
        </div>
    );
};

export default SidebarMobile;