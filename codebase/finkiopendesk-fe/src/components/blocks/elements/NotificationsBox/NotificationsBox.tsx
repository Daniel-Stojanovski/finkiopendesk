import {useEffect, useState} from "react";
import './notificationsBox.scss';
import {backapi} from "../../../../shared/axios";
import {useAuth} from "../../../../shared/AuthContext";
import type {NotificationGroupDto} from "../../../../shared/dto/NotificationGroupDto";
import NotificationGroupItem from "./NotificationGroupItem";

interface NotificationsBoxProps {
    onStateChange: (hasUnread: boolean) => void;
    isVisible: boolean;
}

const NotificationsBox:React.FC<NotificationsBoxProps> = ({onStateChange, isVisible}) => {
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

    return (
        <div id="notifications-box" className={isVisible ? 'visible' : 'invisible'}>
            {userNotifications.length === 0 && (
                <p>No notifications</p>
            )}

            {userNotifications.map(groupData => (
                <NotificationGroupItem
                    key={groupData.notificationGroupId}
                    data={groupData}
                />
            ))}
        </div>
    );
};

export default NotificationsBox;