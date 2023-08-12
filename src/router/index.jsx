
import Home from "@/pages/Home";
import { Route, Routes } from "react-router";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Home />} path="/" />
        </Routes>
    );
}