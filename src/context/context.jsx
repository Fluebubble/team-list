import React, { useMemo, useState } from 'react';
import { USERS_TO_LOAD } from '../constants';

export const UsersContext = React.createContext({
  users: [],
  setUsers: () => {},
});

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    `/users?page=1&count=${USERS_TO_LOAD}`,
  );

  const value = useMemo(
    () => ({
      users,
      setUsers,
      nextPageUrl,
      setNextPageUrl,
    }),
    [users, nextPageUrl],
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
