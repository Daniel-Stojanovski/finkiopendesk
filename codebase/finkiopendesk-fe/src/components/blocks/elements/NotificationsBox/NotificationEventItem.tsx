import React from "react";
import './notificationsBox.scss';
import type {NotificationEventDto} from "../../../../shared/dto/NotificationEventDto";

interface NotificationsEventItemProps {
    data: NotificationEventDto;
}

const NotificationsEventItem: React.FC<NotificationsEventItemProps> = ({ data }) => {
    return (
        <>
            <div className="notification-event">
                <p>{data.message}</p>
            </div>
        </>
    );
}

export default NotificationsEventItem;