import { createContext, useContext, useState, useEffect } from "react";
 
const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
 
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem("user");
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };
 
        window.addEventListener("storage", handleStorageChange);
 
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
 
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
 
export const useAuth = () => {
    return useContext(AuthContext);
};