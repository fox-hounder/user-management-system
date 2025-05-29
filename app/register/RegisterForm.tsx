// components/RegisterForm.tsx

import React,{useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { createUser } from "../../utils/api";

// 必要に応じて利用する
interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}

// TODO: 新規登録フォームコンポーネントを実装する
const RegisterForm: React.FC = () => {
  // 必要に応じて利用する
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

 const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await createUser(data);
      setSuccess(true);
    } catch (err) {
      alert(`${err}登録に失敗しました`);
    }
  };


  const [success, setSuccess] = useState<boolean>(false);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規登録
      </Typography>
      {success && <Alert severity="success">登録が完了しました！</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="名前"
          {...register("name", { required: "名前は必須です" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="メール"
          type="email"
          {...register("email",{
            required: "メールは必須です",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "メールアドレスの形式が正しくありません",
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="役職"
          {...register("role", { required: "役職は必須です" })}
          error={!!errors.role}
          helperText={errors.role?.message}
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          登録
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
