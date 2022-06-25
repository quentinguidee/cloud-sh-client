import React, { useEffect } from "react";
import { post } from "Backend/api";
import { useNavigate } from "react-router-dom";
import { useSession } from "Store/Hooks/useSession";

function Logout() {
    const navigate = useNavigate();

    const session = useSession();

    const logout = async () => {
        console.log(session);
        const [_, err] = await post("/auth/logout", {
            ...session,
        });
        if (err) {
            return console.error(err);
        }
        navigate("/login");
    };

    useEffect(() => {
        logout().then(undefined);
    }, []);

    return <div>Disconnecting...</div>;
}

export default Logout;
