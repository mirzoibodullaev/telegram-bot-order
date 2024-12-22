import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const navigate = useNavigate();

    const createOrder = async () => {
        const response = await axios.get("http://localhost:5000/api/generate-order");
        navigate(`/order/${response.data.orderId}?popup=true`);
    };

    return (
        <div>
            <h1>Создать заявку</h1>
            <button onClick={createOrder}>Создать</button>
        </div>
    );
}

export default Home;
