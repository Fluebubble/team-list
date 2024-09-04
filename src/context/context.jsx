import React, { useMemo, useState } from 'react';

export const UsersContext = React.createContext({
  users: [],
  setUsers: () => {},
});

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const value = useMemo(
    () => ({
      users,
      setUsers,
    }),
    [users],
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
