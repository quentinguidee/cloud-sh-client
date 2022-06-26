import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "Store/Hooks/useSession";
import axios from "axios";
import { route } from "Backend/api";

function Logout() {
    const navigate = useNavigate();

    const session = useSession();

    const logout = async () => {
        axios
            .post(route("/auth/logout"), { ...session })
            .then(() => navigate("/login"))
            .catch(console.error);
    };

    useEffect(() => {
        logout().then(undefined);
    }, []);

    return <div>Disconnecting...</div>;
}

export default Logout;
