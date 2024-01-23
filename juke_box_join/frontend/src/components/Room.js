import React, { useState } from "react";

const Room = () => {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setvotesToSkip] = useState(2);
  const [isHost, setIsHost] = useState(false);

  return <div>
    <p>Host: {isHost}</p>
    <p>Guest Can Pause: {guestCanPause}</p>
    <p>Votes to Skip: {votesToSkip}</p>
  </div>;
};

export default Room;
