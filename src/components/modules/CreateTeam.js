"use client";
import { useState } from "react";
import PlayerInfo from "@/components/PlayerInfo";
import CustomModal from "../CustomModal";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  Container,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

const formations = {
  "4-3-3": { goalkeepers: 1, defenders: 4, midfielders: 3, forwards: 3 },
  "4-4-2": { goalkeepers: 1, defenders: 4, midfielders: 4, forwards: 2 },
  "3-4-3": { goalkeepers: 1, defenders: 3, midfielders: 4, forwards: 3 },
  "5-2-3": { goalkeepers: 1, defenders: 5, midfielders: 2, forwards: 3 },
  "5-3-2": { goalkeepers: 1, defenders: 5, midfielders: 3, forwards: 2 },
};

const CreateTeam = ({ players }) => {
  const [marketValueRange, setMarketValueRange] = useState({
    min: 0,
    max: Infinity,
  });
  const [ageRange, setAgeRange] = useState({ min: 0, max: Infinity });
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMarketValueChange = (event) => {
    const { name, value } = event.target;
    setMarketValueRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgeChange = (event) => {
    const { name, value } = event.target;
    setAgeRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPlayer = (player, isSelected) => {
    const position = player.positions.first.group;
    const counts = {
      Goalkeepers: selectedPlayers.filter((p) => p.isGoalkeeper).length,
      Defenders: selectedPlayers.filter(
        (p) => p.positions.first.group === "Abwehr"
      ).length,
      Midfielders: selectedPlayers.filter(
        (p) => p.positions.first.group === "Mittelfeld"
      ).length,
      Forwards: selectedPlayers.filter(
        (p) => p.positions.first.group === "Sturm"
      ).length,
    };

    const formationLimits = formations[selectedFormation];

    if (isSelected) {
      if (
        (player.isGoalkeeper &&
          counts.Goalkeepers < formationLimits.goalkeepers) ||
        (position === "Abwehr" &&
          counts.Defenders < formationLimits.defenders) ||
        (position === "Mittelfeld" &&
          counts.Midfielders < formationLimits.midfielders) ||
        (position === "Sturm" && counts.Forwards < formationLimits.forwards)
      ) {
        setSelectedPlayers((prev) => [...prev, player]);
      } else {
        alert(`Cannot select more from this category!`);
      }
    } else {
      setSelectedPlayers((prev) => prev.filter((p) => p.id !== player.id));
    }
  };

  const filterPlayers = () => {
    return players.filter((player) => {
      return (
        player.marketValue.value >= marketValueRange.min &&
        player.marketValue.value <= marketValueRange.max &&
        player.age >= ageRange.min &&
        player.age <= ageRange.max
      );
    });
  };

  const categorizedPlayers = {
    Goalkeepers: filterPlayers().filter((player) => player.isGoalkeeper),
    Defenders: filterPlayers().filter(
      (player) => player.positions.first.group === "Abwehr"
    ),
    Midfielders: filterPlayers().filter(
      (player) => player.positions.first.group === "Mittelfeld"
    ),
    Forwards: filterPlayers().filter(
      (player) => player.positions.first.group === "Sturm"
    ),
  };

  const renderPlayersOnField = () => {
    const formation = formations[selectedFormation];
    const goalkeepers = selectedPlayers.filter((player) => player.isGoalkeeper);
    const defenders = selectedPlayers.filter(
      (player) => player.positions.first.group === "Abwehr"
    );
    const midfielders = selectedPlayers.filter(
      (player) => player.positions.first.group === "Mittelfeld"
    );
    const forwards = selectedPlayers.filter(
      (player) => player.positions.first.group === "Sturm"
    );

    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "green",
          position: "relative",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {/* Forwards */}
            {forwards.map((player, index) => (
              <Box
                key={player.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "30px",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Image
                  height={80}
                  width={80}
                  alt={player?.name}
                  src={player?.image}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "700" }}
                >
                  {player?.name}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex" }}>
            {/* Midfielders */}
            {midfielders.map((player, index) => (
              <Box
                key={player.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "30px",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Image
                  height={80}
                  width={80}
                  alt={player?.name}
                  src={player?.image}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "700" }}
                >
                  {player?.name}
                </Typography>
              </Box>
            ))}
          </Box>
          {/* Defenders */}
          <Box sx={{ display: "flex" }}>
            {defenders.map((player, index) => (
              <Box
                key={player.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "30px",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Image
                  height={80}
                  width={80}
                  alt={player?.name}
                  src={player?.image}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "700" }}
                >
                  {player?.name}
                </Typography>
              </Box>
            ))}
          </Box>
          {/* Goalkeeper */}
          <Box sx={{ display: "flex" }}>
            {goalkeepers.map((player, index) => (
              <Box
                key={player.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "30px",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Image
                  height={80}
                  width={80}
                  alt={player?.name}
                  src={player?.image}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "700" }}
                >
                  {player?.name}
                </Typography>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Goalkeeper
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: "12px" }}>
        Create Team
      </Typography>
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
          <Grid item xs={12} sm={6} md={3}>
            <Select
              value={selectedFormation}
              onChange={(e) => setSelectedFormation(e.target.value)}
              fullWidth
            >
              {Object.keys(formations).map((formation) => (
                <MenuItem key={formation} value={formation}>
                  {formation}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Button
              variant="contained"
              fullWidth={!isSmallScreen}
              sx={{ maxWidth: 200, marginTop: { xs: 2, sm: 0 } }}
              onClick={() => {}}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Box>
      {Object.entries(categorizedPlayers).map(([category, players]) => (
        <Box key={category} sx={{ marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {players.map((player) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
                <PlayerInfo
                  player={player}
                  onSelect={handleSelectPlayer}
                  selected={selectedPlayers.includes(player)}
                  shouldHaveCheckbox={true}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          justifyContent: "flex-end",
          bottom: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => setIsModalOpen(true)}
        >
          View Team
        </Button>
      </Box>

      <CustomModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ width: "100%", height: "100%" }}>
          {renderPlayersOnField()}
        </Box>
      </CustomModal>
    </div>
  );
};

export default CreateTeam;
