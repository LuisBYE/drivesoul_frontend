// "use client";
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [username, setUsername] = useState(null);

//     const login = (user) => {
//         setIsLoggedIn(true);
//         setUsername(user);
//     };

//     const logout = () => {
//         setIsLoggedIn(false);
//         setUsername(null);
//     };

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuth() {
//     return useContext(AuthContext);
// } 