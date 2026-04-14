import './notificationsBox.scss';
import {useEffect, useState} from "react";
import {backapi} from "../../../../shared/axios";
import {useAuth} from "../../../../shared/AuthContext";
import type {NotificationGroupDto} from "../../../../shared/dto/NotificationGroupDto";
import NotificationGroupItem from "./NotificationGroupItem";

interface NotificationsBoxProps {
    onStateChange: (hasUnread: boolean) => void;
    isVisible: boolean;
    onEventItemClick: () => void;
}

const NotificationsBox:React.FC<NotificationsBoxProps> = ({onStateChange, isVisible, onEventItemClick}) => {
    const { user } = useAuth();

    const [userNotifications, setUserNotifications] = useState<NotificationGroupDto[]>([]);

    useEffect(() => {
        if (!user?.userId) return;

        backapi.get<NotificationGroupDto[]>(`/notifications/${user.userId}`)
            .then(response => setUserNotifications(response.data))
            .catch(err => console.error(err));
    }, [user]);

    useEffect(() => {
        const hasUnread = userNotifications.some(group =>
            group.events?.some(event => !event.statusRead)
        );

        onStateChange(hasUnread);
    }, [userNotifications]);

    if (!user) {
        return (
            <div id="notifications-box-compact" className={isVisible ? 'visible' : 'invisible'}>
                <p className="empty-message">Log in to access notifications</p>
            </div>
        )
    }

    if (user && userNotifications.length === 0 ) {
        return (
            <div id="notifications-box-compact" className={isVisible ? 'visible' : 'invisible'}>
                <h3>Notifications</h3>
                <p className="empty-message">No notifications</p>
            </div>
        )
    }

    return (
        <div id="notifications-box" className={isVisible ? 'visible' : 'invisible'}>
            <h3>Notifications</h3>
            <div id="nb-list-container">
                {userNotifications.map(groupData => (
                    <NotificationGroupItem
                        key={groupData.notificationGroupId}
                        data={groupData}
                        onItemClick={onEventItemClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationsBox;