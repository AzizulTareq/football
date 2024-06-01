import PlayersList from "./PlayersList";

const fetchData = async () => {
  const url =
    "https://transfermarkt-db.p.rapidapi.com/v1/clubs/squad?locale=DE&season_id=2022&club_id=12321";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "transfermarkt-db.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const players = await fetchData();
  return (
    <div>
      <PlayersList players={players.data} />
    </div>
  );
}
