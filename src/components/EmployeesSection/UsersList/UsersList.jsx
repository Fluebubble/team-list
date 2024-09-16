import styles from './UsersList.module.scss';
import { useContext, useEffect } from 'react';
import { UserCard } from './UserCard/UserCard';
import { Button } from '../../Button/Button';
import { Preloader } from '../../Preloader/Preloader';
import { UsersContext } from '../../../context/context';
import useLoadUsers from '../../../hooks/useLoadUsers';

export const UsersList = () => {
  const { users, nextPageUrl } = useContext(UsersContext);
  const { loadUsers, isLoading } = useLoadUsers();

  //get users from server on first page load and put them into users state
  useEffect(() => {
    loadUsers();
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
        <Button
          handleClick={() => loadUsers()}
          text="Show more"
        />
      )}
    </div>
  );
};
