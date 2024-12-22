import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup";

const OrderForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [carName, setCarName] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const isFormValid = name.trim() !== "" && phone.trim() !== "";

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "popup" && message.orderId === id) {
                setShowPopup(true);
            }
        };

        return () => {
            ws.close();
        };
    }, [id]);

    const handleSubmit = async () => {
        if (isFormValid) {
            await axios.post("http://localhost:5000/api/send-order", {
                orderId: id,
                name,
                phone,
            });
            alert(
                "Заявка отправлена. Войдите в Telegram и нажмите кнопку 'Car'."
            );
            setPhone("");
            setName("");
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    };

    const handlePopupSubmit = async () => {
        await axios.post("http://localhost:5000/api/car-name", {
            orderId: id,
            carName,
        });
        alert("Данные о машине отправлены в Telegram.");
        setShowPopup(false);
        navigate("/");
    };

    return (
        <div>
            <h1>Заявка #{id}</h1>
            <form>
                <label>
                    Имя:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Номер:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
                <br />
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Send
                </button>
            </form>

            {showPopup && (
                <Popup
                    onSubmit={handlePopupSubmit}
                    carName={carName}
                    setCarName={setCarName}
                />
            )}
        </div>
    );
};

export default OrderForm;
