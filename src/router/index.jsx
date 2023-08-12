
import Home from "@/pages/Home";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Home />} path="/" />
        </Routes>
    );
}

export default AppRoutes;