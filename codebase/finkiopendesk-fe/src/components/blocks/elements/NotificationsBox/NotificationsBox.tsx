import React, {useEffect, useState} from "react";
import './notificationsBox.scss';
import {backapi} from "../../../../shared/axios";
import {useAuth} from "../../../../shared/AuthContext";
import type {NotificationGroupDto} from "../../../../shared/dto/NotificationGroupDto";
import NotificationGroupItem from "./NotificationGroupItem";

const NotificationsBox = () => {
    const { user } = useAuth();

    const [userNotifications, setUserNotifications] = useState([]);

    useEffect(() => {
        backapi.get<NotificationGroupDto[]>(`/notifications/${user?.userId}`)
            .then(response => setUserNotifications(response.data))
            .catch(err => console.error(err));
    }, [user]);

    return (
        <>
            <div id="notifications-box">
                {userNotifications.length === 0 && (
                    <p>No notifications</p>
                )}
                <>
                    {userNotifications.map(groupData => (
                        <NotificationGroupItem key={groupData.groupId} data={groupData} />
                    ))}
                </>
            </div>
        </>
    );
};

export default NotificationsBox;