"use client";

import { ButtonGroup, Typography, Box } from "@mui/material";
import Button from "../Button/Button";
import { useUserType } from "@/app/hooks/useUserType";

export function UserTypeToggle() {
  const { userType, setUserType } = useUserType();

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      p={2}
      mb={4}
      bgcolor="#f3f4f6"
      borderRadius={2}
    >
      <Typography fontWeight={500}>Tipo de usuário:</Typography>

      <ButtonGroup variant="outlined">
        <Button
          variant={userType === "common" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setUserType("common")}
        >
          Comum
        </Button>
        <Button
          variant={userType === "vip" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setUserType("vip")}
        >
          VIP
        </Button>
      </ButtonGroup>
    </Box>
  );
}
