"use client";

import { Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  //   const pathname = usePathname();

  //   const isHome = pathname === "/";
  return (
    <footer
      className={`mt-8 w-full bottom-0 flex items-center justify-between px-[160px] max-md:px-4 border-t border-lightGrey h-[80px] bg-white max-md:flex-col-reverse max-md:justify-evenly`}
      aria-label="Rodapé do site Datapanp"
    >
      <Typography variant="body1" color="darkGrey">
        Robson © 2025 – Shopping Cart Test
      </Typography>

      <nav
        className="flex gap-4 items-center"
        aria-label="Links para redes sociais"
      >
        <span
          aria-hidden="true"
          title="Facebook unavailable"
          className="opacity-30 cursor-not-allowed"
        >
          <FacebookIcon />
        </span>
        <span
          aria-hidden="true"
          title="Instagram unavailable"
          className="opacity-30 cursor-not-allowed"
        >
          <InstagramIcon />
        </span>
        <span
          aria-hidden="true"
          title="Instagram unavailable"
          className="opacity-30 cursor-not-allowed"
        >
          <LinkedInIcon className="cursor-pointer" />
        </span>
      </nav>
    </footer>
  );
}
