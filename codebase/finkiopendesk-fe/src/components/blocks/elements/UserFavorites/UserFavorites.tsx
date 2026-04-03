import './userFavorites.scss';
import type {UserFavoriteDto} from "../../../../shared/dto/UserFavoriteDto";
import {useAcronym, useListItemNavigate} from "../../../../shared/hooks";
import {useAuth} from "../../../../shared/AuthContext";

interface UserFavoritesProps {
    userFavorites: UserFavoriteDto[];
    sidebarCollapsed?: boolean;
}

const UserFavorites: React.FC<UserFavoritesProps> = ({ userFavorites, sidebarCollapsed}) => {
    const { user } = useAuth();
    const listItemNavigate = useListItemNavigate();

    if (!user) {
        return (
            <div id="user-favorites">
                <h3>Favorites</h3>
                <p>Log in to access</p>
            </div>
        );
    }

    return (
        <div id="user-favorites">
            <h3>Favorites</h3>
            {userFavorites && userFavorites.length > 0 ? (
                <ul>
                    {userFavorites.map(fav => (
                        <li
                            key={fav.targetId}
                            onClick={() => listItemNavigate(fav.targetType, fav.targetId)}
                        >
                            <div className="ul-li-content">
                                <span>{sidebarCollapsed ? useAcronym(fav.targetName ?? "-") : fav.targetName}</span>
                                <span className="type-icon">
                                    {fav.targetType?.[0]}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Try following discussions</p>
            )}
        </div>
    );
};

export default UserFavorites;