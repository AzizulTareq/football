import PlayersList from "../components/modules/PlayersList";
import { fetchPlayerList } from "@/actions/footballApi";

export default async function Home() {
  const players = await fetchPlayerList();
  return (
    <div>
      <PlayersList players={players.data} />
    </div>
  );
}
