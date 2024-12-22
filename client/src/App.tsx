import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Home from "./Home";
import OrderForm from "./OrderForm";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order/:id" element={<OrderForm />} />
            </Routes>
        </Router>
    );
}

export default App;
