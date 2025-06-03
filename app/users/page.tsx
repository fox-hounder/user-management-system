'use client';

import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../utils/api';
import { User } from '../../types/User';
import UserCard from '../../components/UserCard';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log(data);
        setUsers(data);
      } catch (err) {
        setError('ユーザーの取得に失敗しました。' + err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const removeUserFromList = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ユーザー一覧
      </Typography>
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onDelete={removeUserFromList} />
      ))}
    </Box>
  );
}

export default UsersPage;