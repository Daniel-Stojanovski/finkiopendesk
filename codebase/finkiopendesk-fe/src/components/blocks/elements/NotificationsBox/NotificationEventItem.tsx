import './notificationsBox.scss';
import type {NotificationEventDto} from "../../../../shared/dto/NotificationEventDto";
import {useNavigate} from "react-router-dom";
import {backapi} from "../../../../shared/axios";

interface NotificationsEventItemProps {
    data: NotificationEventDto;
    contextId: string;
    onClick: () => void;
}

const NotificationsEventItem: React.FC<NotificationsEventItemProps> = ({ data, contextId, onClick }) => {
    const navigate = useNavigate();

    const handleClick = async () => {

        try {
            await backapi.post(`/notifications/event/${data.notificationEventId}/read`);
        } catch (e) {
            console.error(e);
        }

        onClick();

        const getContextPart = (contextId: string, element: number): string => {
            return contextId.split(":")[element];
        };

        const getGroupTypeAcronym = (part: string): string => {
            switch (part) {
                case "SUBJECT":
                    return 'sid';
                case "PROFESSION":
                    return 'pid';
                case "CHANNEL":
                    return 'cid';
                default:
                    return '';
            }
        };

        navigate(`/discussion/${getGroupTypeAcronym(getContextPart(contextId,1))}/${getContextPart(contextId,2)}`);
    };

    return (
        <div
            className={`notification-event ${!data.statusRead ? "unread" : ""}`}
            onClick={handleClick}
        >
            <p><span>{!data.statusRead ? '•' : ''}</span> {data.message}</p>
        </div>
    );
};

export default NotificationsEventItem;