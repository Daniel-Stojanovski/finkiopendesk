import './filterBox.scss';

type FilterBoxProps = {
    isVisible: boolean;
    filters: any;
    setFilters: (filters: any) => void;
};

const FilterBox: React.FC<FilterBoxProps> = ({ isVisible, filters, setFilters }) => {

    const handleChange = (name: string, value: string) => {
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

    const generateFilterTag = () => {
        const program = filters.program ?? "___";
        const format = filters.program ? "F23" : "__";
        const hardness = filters.hardness ?? "__";
        const semester = filters.semesterType ?? "_";

        return `${program}_${format}${hardness}${semester}`;
    };

    const activeFilters = Object.values(filters).some(v => v !== null);

    if (!isVisible) return null;

    return (
        <div id="filter">
            <div className="filter-header">
                <h3>Filters</h3>
                <i className="bi bi-arrow-clockwise clear-btn" onClick={clearFilters}></i>
            </div>
            <p className={`filter-preview ${activeFilters ? 'active' : ''}`}>
                <i className="bi bi-tag"></i> {generateFilterTag()}
            </p>
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