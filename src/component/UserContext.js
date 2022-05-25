import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [ home, setHome ] = useState();
    const [ admin, setAdmin ] = useState();
    const [ user , setUser ] = useState();
    // eslint-disable-next-line
    const [ currentRole, setCurrentRole ] = useState();
    
    useEffect(() => {
        
        const userRole = localStorage.getItem('role');
        const userR = JSON.parse(userRole)

        if(userR === "ROLE_USER"){
            setCurrentRole(userR);
            setHome(false);
            setAdmin(false);
            setUser(true);
        } else if(userR === "ROLE_ADMIN"){
            setHome(false);
            setAdmin(true);
            setUser(false);
            setCurrentRole(userR);
        } else {
            setHome(true);
            setAdmin(false);
            setUser(false);
        }
        
    }, []);

    const logout = () => {
        localStorage.clear();
    };

    return (
        <UserContext.Provider value={{ logout, setCurrentRole, home, admin, user }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;