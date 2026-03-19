import React, {useState} from "react";
import './notificationsBox.scss';
import type {NotificationGroupDto} from "../../../../shared/dto/NotificationGroupDto";
import NotificationEventItem from "./NotificationEventItem";

interface NotificationsGroupItemProps {
    data: NotificationGroupDto;
}

const NotificationsGroupItem: React.FC<NotificationsGroupItemProps> = ({ data }) => {
    const [showNotificationEvents, setShowNotificationEvents] = useState(false);

    const toggleNotificationEvents = () => {
        setShowNotificationEvents(prev => !prev);
    };

    return (
        <div className="notification-group">

            <div className="notification-group-header">
                <div className="ngh-box">
                    <p className="ngh-title">{data.title}</p>
                    {data.unreadCount > 0 &&
                        <p className="ngh-message">You have <strong>{data.unreadCount}</strong> {data.unreadCount == 1 ? 'notification' : 'notifications'}.</p>
                    }
                </div>
                {data.unreadCount > 0 && <span className="blue-dot"/>}
                <button onClick={toggleNotificationEvents}>v</button>
            </div>

            <div className="notification-group-events">
                {showNotificationEvents && data.events.map(eventData => (
                    <NotificationEventItem
                        key={eventData.notificationEventId}
                        data={eventData}
                        contextId={data.contextId}
                    />
                ))}
            </div>

        </div>
    );
}

export default NotificationsGroupItem;