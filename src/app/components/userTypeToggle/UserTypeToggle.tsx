"use client";

import { Button, ButtonGroup, Box, Typography } from "@mui/material";
import { useUserType } from "@/app/contexts/useUserType";
import { useRouter } from "next/navigation";

export function UserTypeToggle() {
  const { userType, setUserType } = useUserType();
  const router = useRouter();

  function handleSelect(type: "common" | "vip") {
    setUserType(type);
    router.push("/shop");
  }

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
      <Typography fontWeight={500}>User Type:</Typography>

      <ButtonGroup variant="outlined">
        <Button
          variant={userType === "common" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleSelect("common")}
        >
          Common
        </Button>
        <Button
          variant={userType === "vip" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handleSelect("vip")}
        >
          VIP
        </Button>
      </ButtonGroup>
    </Box>
  );
}
