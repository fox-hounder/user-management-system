// components/EditUserForm.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { fetchUserById, updateUser } from "../utils/api";
// import { User } from "../types/User";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";

// 必要に応じて利用する
interface EditUserFormInputs {
  name: string;
  email: string;
  role: string;
}

interface EditUserFormProps {
  userId :number;
}

// TODO: ユーザー編集フォームコンポーネントを実装する
const EditUserForm: React.FC<EditUserFormProps> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserFormInputs>();

  const [loading,setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const user = await fetchUserById(userId);
        if(user){
          setFetchedUser(user);
          reset({
            name: user.name,
            email: user.email,
            role: user.role,
          });
        }
      } catch (err){
        setError('ユーザー情報の取得に失敗しました。' + err);
      }finally {
        setLoading(false);
      }
    };
      fetchUser();
    },[userId, reset]);
    
  const router = useRouter();
  const onSubmit:SubmitHandler<EditUserFormInputs> = async (data) => {
    await updateUser(userId,data);
    setSuccess(true);
    router.push("/users");
    alert("ユーザー情報を更新しました");
  }
  

if (loading) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <CircularProgress />
    </Box>
  );
}

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー情報編集
      </Typography>
      {success && <Alert severity="success">ユーザー情報を更新しました！</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {!fetchedUser && <Alert severity="info">ユーザーが見つかりません</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="名前"
          {...register("name", {required:"名前は必須です"})}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="メール"
          {...register("name", {required:"メールは必須です"})}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="役割"
          {...register("role", {required:"役割は必須です"})}
          error={!!errors.role}
          helperText={errors.role?.message}
          margin="normal"
        />
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            更新
          </Button>
      </form>
    </Box>
  );
};

export default EditUserForm;
