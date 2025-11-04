import { useRoutes } from "react-router-dom";
import AddProduct from "../pages/addProduct";
import App from "../App";

export const AppRoutes = () => {
    const routes = [
        { path: "/", element: <App /> },
        { path: "/add-product", element: <AddProduct /> },
        { path: "/edit-product/:id", element: <AddProduct /> },
        { path: "*", element: <h2>404 - Page Not Found</h2> }
    ]
    return useRoutes(routes)
}