"use client";

import logo from "../../../../public/logo.jpeg";
import Image from "next/image";
import Button from "@/app/components/button/Button";
import { Typography } from "@mui/material";
import Link from "next/link";

import Space from "@/app/components/space/Space";

export default function Header() {
  return (
    <header
      className={`flex items-center px-[160px] max-md:px-4 justify-between  border-b border-lightGrey  h-[72px] "
      }`}
    >
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src={logo}
            alt="logotipo"
            width={40}
            className="cursor-pointer"
          />
        </Link>
        <Space right={10} />
      </div>

      <Button
        variant="contained"
        disabled
        sx={{
          height: {
            sm: "32px",
            lg: "44px",
          },
        }}
      >
        <Typography
          variant="body1"
          fontWeight="700"
          textTransform="capitalize"
          color="white"
        >
          Login
        </Typography>
      </Button>
    </header>
  );
}
