import React, { useEffect } from "react";
import { post } from "Backend/api";
import { useNavigate } from "react-router-dom";
import { useSession } from "Store/Hooks/useSession";

function Logout() {
    const navigate = useNavigate();

    const session = useSession();

    const logout = async () => {
        post("/auth/logout", { ...session })
            .then(() => navigate("/login"))
            .catch(console.error);
    };

    useEffect(() => {
        logout().then(undefined);
    }, []);

    return <div>Disconnecting...</div>;
}

export default Logout;
