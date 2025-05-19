// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);

  return (
    <UserContext.Provider value={{ userData, setUserData, selectedInterests, setSelectedInterests }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
