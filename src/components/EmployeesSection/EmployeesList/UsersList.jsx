import styles from './EmployeesList.module.scss';
import { useContext, useEffect, useState } from 'react';
import { apiClient } from '../../../api/api';
import { UserCard } from './UserCard/UserCard';
import { Button } from '../../Button/Button';
import { Preloader } from '../../Preloader/Preloader';
import { USERS_TO_LOAD } from '../../../constants';
import { UsersContext } from '../../../context/context';

export const EmployeesList = () => {
  const { users, setUsers } = useContext(UsersContext);
  // const [users, setUsers] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreUsers = async () => {
    setIsLoading(true);

    try {
      const response = await apiClient.get(nextPageUrl);
      console.log(response.data);
      const usersFromServer = response.data.users;
      const nextPageUrlFromServer = response.data.links.next_url;

      usersFromServer.sort(
        (firstUser, secondUser) =>
          secondUser.registration_timestamp - firstUser.registration_timestamp,
      );

      setUsers((prevState) => [...prevState, ...usersFromServer]);
      setNextPageUrl(nextPageUrlFromServer);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //get users from server on first page load and put them into users state
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await apiClient.get(
          `/users?page=1&count=${USERS_TO_LOAD}`,
        );

        response.data.users.sort(
          (firstUser, secondUser) =>
            secondUser.registration_timestamp -
            firstUser.registration_timestamp,
        );

        setUsers(response.data.users);
        setNextPageUrl(response.data.links.next_url);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    console.log(users);
  }, []);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {users.map((user) => {
          return (
            <UserCard
              user={user}
              key={user.id}
            />
          );
        })}
      </ul>
      {isLoading && <Preloader />}
      {nextPageUrl && !isLoading && (
        <Button handleClick={() => loadMoreUsers()}>Show more</Button>
      )}
    </div>
  );
};
