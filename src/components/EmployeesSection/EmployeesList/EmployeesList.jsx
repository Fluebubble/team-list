import styles from './EmployeesList.module.scss';
import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/api';
import { EmployeeItem } from './EmployeeItem/EmployeeItem';
import { Button } from '../../Button/Button';
import { RotatingLines } from 'react-loader-spinner';

const USERS_TO_LOAD = 6;

export const EmployeesList = () => {
  const [users, setUsers] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreUsers = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(nextPageUrl);
      console.log(response.data);
      const users = response.data.users;
      users.sort(
        (firstUser, secondUser) =>
          secondUser.registration_timestamp - firstUser.registration_timestamp,
      );

      setUsers((prevState) => [...prevState, ...users]);
      setNextPageUrl(response.data.links.next_url);
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
            <EmployeeItem
              user={user}
              key={user.id}
            />
          );
        })}
      </ul>
      {isLoading && (
        <RotatingLines
          width="50"
          visible={true}
          strokeColor="#000000"
        />
      )}
      {nextPageUrl && !isLoading && (
        <Button handleClick={() => loadMoreUsers()}>Show more</Button>
      )}
    </div>
  );
};
