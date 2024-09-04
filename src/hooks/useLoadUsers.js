import { useContext, useState } from 'react';
import { apiClient } from '../api/api';
import { UsersContext } from '../context/context';

export const useLoadUsers = () => {
  const { setUsers, nextPageUrl, setNextPageUrl } = useContext(UsersContext);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(nextPageUrl);
      const usersFromServer = response.data.users;
      const nextPageUrlFromServer = response.data.links.next_url;

      usersFromServer.sort(
        (firstUser, secondUser) =>
          secondUser.registration_timestamp - firstUser.registration_timestamp,
      );

      setUsers((prevState) => [...prevState, ...usersFromServer]);
      setNextPageUrl(nextPageUrlFromServer);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, nextPageUrl, loadUsers };
};

export default useLoadUsers;
