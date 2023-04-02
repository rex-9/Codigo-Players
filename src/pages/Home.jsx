import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Nav from "../components/Nav";
import PlayerList from "../components/PlayerList";
import TeamList from "../components/TeamList";
import { fetchJoins } from "../redux/join";
import { fetchPlayers } from "../redux/player";
import { fetchTeams } from "../redux/team";
import { checkCookie } from "../services/cookie";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPlayers(10));
    checkCookie("joins") && dispatch(fetchJoins());
    checkCookie("teams") && dispatch(fetchTeams());
    setIsLoading(false);
  }, []);

  return (
    <>
      <Nav />
      <div className="flex justify-center">
        <PlayerList isLoading={isLoading} setIsLoading={setIsLoading} />
        <TeamList />
      </div>
    </>
  );
};
export default Home;
