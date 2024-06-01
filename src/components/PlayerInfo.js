import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Player = ({ player }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        boxShadow: 3,
        borderRadius: "7px",
        padding: 2,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ marginRight: 2 }}>
        <Image
          height={120}
          width={120}
          alt={player?.name}
          src={player?.image}
        />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {player?.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "14px", marginRight: 1 }}>
            {player?.nationalities[0]?.name}
          </Typography>
          <Image
            height={8}
            width={16}
            alt="flag"
            src={player?.nationalities[0]?.image}
          />
        </Box>
        <Typography sx={{ fontSize: "14px" }}>
          {`${player?.age} years old`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Player;
