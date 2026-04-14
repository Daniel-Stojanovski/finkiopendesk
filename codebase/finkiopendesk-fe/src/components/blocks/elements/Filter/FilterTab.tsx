import './filterOptions.scss';

type FilterTabProps = {
    onToggle: () => void;
    isOpen: boolean;
    filterTag: string;
};

const FilterTab: React.FC<FilterTabProps> = ({onToggle, isOpen, filterTag}) => {
    return (
        <>
            <div id="filter-tab">
                <div className="filter-header">
                    <h3>Filters</h3>
                    <i className={`bi ${isOpen ? 'bi-arrow-bar-left' : 'bi-arrow-bar-right'}`} onClick={onToggle}></i>
                </div>
                {
                    filterTag.toString() === "_________" || <p className="filter-preview"><i className="bi bi-tag"></i> {filterTag}</p>
                }
            </div>
        </>
    );
}

export default FilterTab;