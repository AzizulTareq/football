"use client";
import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import Image from "next/image";

const PlayerInfo = ({ player, onSelect, selected, shouldHaveCheckbox }) => {
  const handleChange = (event) => {
    onSelect(player, event.target.checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        boxShadow: 3,
        borderRadius: "7px",
        padding: 2,
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      {shouldHaveCheckbox && (
        <Checkbox
          checked={selected}
          onChange={handleChange}
          sx={{ position: "absolute", top: 8, right: 8 }}
        />
      )}

      <Box sx={{ marginRight: 2 }}>
        <Image
          height={120}
          width={120}
          alt={player?.name}
          src={player?.image}
        />
        Image
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

export default PlayerInfo;
