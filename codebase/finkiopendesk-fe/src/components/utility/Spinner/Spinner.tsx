import "./spinner.scss";

type SpinnerProps = {
    size?: 1 | 2 | 3 | 4;
    color?: string;
    thickness?: number;
};

const Spinner: React.FC<SpinnerProps> = ({size = 1, color = "#2a93d1", thickness = 4}) => {
    const loaderSize = size === 1 ? 10 : 10 * Math.pow(2, size - 1);

    return (
        <div
            className="spinner"
            style={{
                width: loaderSize,
                height: loaderSize,
                borderWidth: thickness,
                borderTopColor: color,
            }}
        />
    );
};

export default Spinner;