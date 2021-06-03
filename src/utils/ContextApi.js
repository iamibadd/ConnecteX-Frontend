import React, {useState, createContext} from "react";

export const ContextApi = createContext(true);
export const Context = props => {
  const [user, setUser] = useState({});
  const [stage, setStage] = useState('dashboard');
  const [subscription, setSubscription] = useState(false);
  return (
    <ContextApi.Provider
      value={{User: [user, setUser], Stage: [stage, setStage], Subscription: [subscription, setSubscription]}}>
      {props.children}
    </ContextApi.Provider>
  );

};
