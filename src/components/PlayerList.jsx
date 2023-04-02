import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeJoin } from "../redux/join";
import { fetchPlayers } from "../redux/player";
import PlayerModal from "./PlayerModal";

const PlayerList = ({ isLoading, setIsLoading }) => {
  const dispatch = useDispatch();
  const [playerId, setPlayerId] = useState();
  const players = useSelector((state) => state.players); // Players from Store
  const joins = useSelector((state) => state.joins); // Joins from Store

  const [toggle, setToggle] = useState(false); // toggle for modal
  const openModal = (id) => {
    setToggle(true);
    setPlayerId(id); // Pass down player id to modal
  };

  const removePlayer = (id) => {
    dispatch(removeJoin(id));
  };

  const loadMore = () => {
    setIsLoading(true);
    dispatch(fetchPlayers(players.length + 10));
    setIsLoading(false);
  };

  return (
    <>
      {toggle ? (
        <PlayerModal setToggle={setToggle} playerId={playerId} />
      ) : (
        <div />
      )}
      <div className="w-[45vw] flex flex-col items-center mb-8">
        <p className="font-bold text-2xl mb-4">Players</p>
        {isLoading && (
          <div className="flex items-center justify-center w-full h-full mb-16">
            <div className="w-5 h-5 rounded-full animate-ping bg-green-500"></div>
          </div>
        )}
        <div className="flex flex-wrap justify-center">
          {players.map(
            (player) =>
              player && (
                <div
                  key={player.id}
                  className="px-8 py-4 mb-3 mx-2 rounded-lg w-[40%] border-gray-200 border-2"
                >
                  <p>Player {player.id}</p>
                  <p>
                    Name: {player.first_name} {player.last_name}
                  </p>
                  <p>
                    {player.height_feet === null ? (
                      <p>Height: unknown</p>
                    ) : (
                      <p>
                        Height: {player.height_feet}' {player.height_inches}"
                      </p>
                    )}
                  </p>
                  <p>
                    {player.height_feet === null ? (
                      <p>Weight: unknown</p>
                    ) : (
                      <p>Weight: {player.weight_pounds} lb</p>
                    )}
                  </p>
                  <p>Position: {player.position}</p>
                  {joins.find((join) => join.playerId === player.id) ? (
                    <button
                      className="bg-red-300 rounded-lg py-1 w-full mt-2 hover:bg-red-200"
                      type="button"
                      onClick={() => removePlayer(player.id)}
                    >
                      Remove from a Team
                    </button>
                  ) : (
                    <button
                      className="bg-green-300 rounded-lg py-1 w-full mt-2 hover:bg-green-200"
                      type="button"
                      onClick={() => openModal(player.id)}
                    >
                      Assign to a Team
                    </button>
                  )}
                </div>
              )
          )}
        </div>
        {isLoading ? (
          <button
            type="button"
            className="button flex justify-center w-[80%] py-1"
            onClick={() => loadMore()}
          >
            <div className="w-5 h-5 mr-2 rounded-full animate-ping bg-red-500 border-2 border-gray-200 hover:bg-green-200"></div>
            Load More...
          </button>
        ) : (
          <button
            type="button"
            className="button w-[80%] py-1 border-2 border-gray-200 hover:bg-green-200"
            onClick={() => loadMore()}
          >
            Load More...
          </button>
        )}
      </div>
    </>
  );
};

export default PlayerList;
