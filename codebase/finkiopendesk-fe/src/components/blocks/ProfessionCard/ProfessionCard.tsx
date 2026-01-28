import './professionCard.scss'
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";

interface ProfessionCardProps {
    profession: ProfessionDto;
}

const ProfessionCard: React.FC<ProfessionCardProps> = ({ profession }) => {
    return (
        <div className="profession-card">
            <h3>{profession.name}</h3>
            {profession.description && <p>{profession.description}</p>}
        </div>
    );
};

export default ProfessionCard;