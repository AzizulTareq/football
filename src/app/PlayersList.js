"use client";
import { useState } from "react";
import PlayerInfo from "@/components/PlayerInfo";
import Link from "next/link";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const PlayersList = ({ players }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [marketValueRange, setMarketValueRange] = useState({
    min: 0,
    max: Infinity,
  });
  const [ageRange, setAgeRange] = useState({ min: 0, max: Infinity });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleMarketValueChange = (event) => {
    const { name, value } = event.target;
    setMarketValueRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgeChange = (event) => {
    const { name, value } = event.target;
    setAgeRange((prev) => ({ ...prev, [name]: value }));
  };

  const filterPlayers = (group) => {
    let filteredPlayers = players;

    if (group === "All") {
      filteredPlayers = filteredPlayers.filter((player) => {
        return (
          player.marketValue.value >= marketValueRange.min &&
          player.marketValue.value <= marketValueRange.max &&
          player.age >= ageRange.min &&
          player.age <= ageRange.max
        );
      });
    } else if (group === "Goalkeepers") {
      filteredPlayers = filteredPlayers.filter((player) => player.isGoalkeeper);
    } else {
      filteredPlayers = filteredPlayers.filter(
        (player) => player.positions.first.group === group
      );
    }

    return filteredPlayers;
  };

  const tabGroups = [
    { label: "All Players", value: "All" },
    { label: "Forwards", value: "Sturm" },
    { label: "Midfielders", value: "Mittelfeld" },
    { label: "Defenders", value: "Abwehr" },
    { label: "Goalkeepers", value: "Goalkeepers" },
  ];

  const renderPlayers = (group) => {
    const filteredPlayers = filterPlayers(group);
    return (
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {filteredPlayers.map((player) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
              <Link
                href={`/player/${player.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <PlayerInfo player={player} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: "12px" }}>
        Players List
      </Typography>
      {selectedTab === 0 && (
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Market Value (Min)"
                type="number"
                name="min"
                fullWidth
                value={marketValueRange.min}
                onChange={handleMarketValueChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Market Value (Max)"
                type="number"
                name="max"
                fullWidth
                value={marketValueRange.max}
                onChange={handleMarketValueChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Age (Min)"
                type="number"
                name="min"
                fullWidth
                value={ageRange.min}
                onChange={handleAgeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Age (Max)"
                type="number"
                name="max"
                fullWidth
                value={ageRange.max}
                onChange={handleAgeChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Button
                variant="contained"
                fullWidth={!isSmallScreen}
                sx={{ maxWidth: 200, marginTop: { xs: 2, sm: 0 } }}
                onClick={() => setSelectedTab(0)}
              >
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        sx={{ overflowX: "auto" }}
      >
        {tabGroups.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      {tabGroups.map((tab, index) => (
        <div key={index} role="tabpanel" hidden={selectedTab !== index}>
          {selectedTab === index && renderPlayers(tab.value)}
        </div>
      ))}
    </div>
  );
};

export default PlayersList;
