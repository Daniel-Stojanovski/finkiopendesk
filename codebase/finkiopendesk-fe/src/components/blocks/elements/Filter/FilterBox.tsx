import './filterOptions.scss';
import type {FiltersDto} from "../../../../shared/dto/FiltersDto";

type FilterBoxProps = {
    isOpen: boolean;
    filters: FiltersDto;
    setFilters: React.Dispatch<React.SetStateAction<FiltersDto>>;
    // setFilters: (filters: FiltersDto) => void;
    onClose: () => void;
    filterTag: string;
};

const FilterBox: React.FC<FilterBoxProps> = ({ isOpen, filters, setFilters, onClose, filterTag }) => {

    const handleChange = (name: keyof FiltersDto, value: string) => {
        setFilters(prev => ({
            ...prev,
            [name]: prev[name] === value ? null : value
        }));
    };

    const clearFilters = () => {
        setFilters({
            program: null,
            format: null,
            hardness: null,
            semesterType: null
        });
    };

    // const generateFilterTag = () => {
    //     const program = filters.program ?? "___";
    //     const format = filters.program ? "F23" : "__";
    //     const hardness = filters.hardness ?? "__";
    //     const semester = filters.semesterType ?? "_";
    //
    //     return `${program}_${format}${hardness}${semester}`;
    // };
    //
    // const filterTag = generateFilterTag();

    const activeFilters = Object.values(filters).some(v => v !== null);

    if (!isOpen) return null;

    return (
        <div id="filter">
            <div className="filter-header">
                <h3>Set filter</h3>
                <span className="filter-header-options">
                    <i className="bi bi-arrow-clockwise" onClick={clearFilters}></i>
                    <i className="bi bi-x-lg" onClick={onClose}></i>
                </span>
            </div>

            <p className={`filter-preview ${activeFilters ? 'active' : ''}`}>
                <i className="bi bi-tag"></i> {filterTag}
            </p>

            <p className="filter-group-title">Program:</p>
            <div className="filter-group">
                {["SIIS", "SEIS", "IMB", "PIT", "IE", "KI", "KN", "SSP"].map(p => (
                    <button
                        key={p}
                        className={`pill ${filters.program === p ? "active" : ""}`}
                        onClick={() => handleChange("program", p)}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <p className="filter-group-title">Level:</p>
            <div className="filter-group">
                {["L1", "L2", "L3"].map(h => (
                    <button
                        key={h}
                        className={`pill ${filters.hardness === h ? "active" : ""}`}
                        onClick={() => handleChange("hardness", h)}
                    >
                        {h}
                    </button>
                ))}
            </div>

            <p className="filter-group-title">Semester:</p>
            <div className="filter-group">
                {["W", "S"].map(s => (
                    <button
                        key={s}
                        className={`pill ${filters.semesterType === s ? "active" : ""}`}
                        onClick={() => handleChange("semesterType", s)}
                    >
                        {s === "W" ? "Winter" : "Summer"}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterBox;