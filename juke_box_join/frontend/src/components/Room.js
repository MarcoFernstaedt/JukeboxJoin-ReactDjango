import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(0);
  const [isHost, setIsHost] = useState(false);

  const { roomCode } = useParams();

  useEffect(() => {
    getRoomDetails();
  }, []);

  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Bad Request')
      })
      .then((data) => {
        setGuestCanPause(data.guest_can_pause)
        setVotesToSkip(data.votes_to_skip)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>Room Code: {roomCode}</p>
      <p>Host: {String(isHost)}</p>
      <p>Guest Can Pause: {String(guestCanPause)}</p>
      <p>Votes to Skip: {votesToSkip}</p>
    </div>
  );
};

export default Room;
