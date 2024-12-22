import React from "react";

interface PopupProps {
    onSubmit: () => void;
    carName: string;
    setCarName: (value: string) => void;
}

const Popup: React.FC<PopupProps> = ({
    onSubmit,
    carName,
    setCarName,
}) => {

    return (
        <div className="popup">
            <h2>Введите название машины</h2>
            <input
                type="text"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
            />
            <button onClick={onSubmit}>Отправить</button>
        </div>
    );
};

export default Popup;
