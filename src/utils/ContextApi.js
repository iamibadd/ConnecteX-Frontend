import React, {useState, createContext} from "react";

export const ContextApi = createContext(true);
export const Context = props => {
    const [user, setUser] = useState({});
    const [kids, setKids] = useState([]);
    return (
        <ContextApi.Provider
            value={{User: [user, setUser], Kids: [kids, setKids]}}>
            {props.children}
        </ContextApi.Provider>
    );

};
