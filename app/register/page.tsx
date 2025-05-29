// app/register/page.tsx

'use client'; // クライアントコンポーネントとしてマーク

import React from 'react';
import RegisterForm from '@/app/register/RegisterForm';
import { Typography, Box } from '@mui/material';

// TODO: 新規登録ページを実装し、RegisterFormコンポーネントを使用する
const RegisterPage: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        新規登録ページ
      </Typography>
      <RegisterForm />
    </Box>
  );
}

export default RegisterPage;