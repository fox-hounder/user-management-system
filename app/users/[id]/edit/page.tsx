// app/users/[id]/edit/page.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React from "react";
import EditUserForm from "@/components/EditUserForm";
import { useParams } from "next/navigation";
import { Typography, Box } from "@mui/material";

// TODO: URLパラメータからユーザーIDを取得し、EditUserFormコンポーネントに渡す
const EditUserPage: React.FC = () => {
  const params = useParams();
  const Id = Number(params.id);
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー編集
      </Typography>
      <EditUserForm userId={Id} />
    </Box>
  );
};

export default EditUserPage;
