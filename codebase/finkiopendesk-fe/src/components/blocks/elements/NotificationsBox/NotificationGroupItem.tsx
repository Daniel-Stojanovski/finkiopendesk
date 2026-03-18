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
        <>
            <div className="notification-group">
                <div className="notification-group-title">
                    <p>{data.title}</p>
                    <button onClick={() => toggleNotificationEvents()}>v</button>
                </div>
                <div className="notification-group-events">
                    {showNotificationEvents && data.events.map(eventData => (
                        <NotificationEventItem key={eventData.eventId} data={eventData} />
                    ))}
                </div>

            </div>
        </>
    );
}

export default NotificationsGroupItem;