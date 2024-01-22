# JukeboxJoin-ReactDjango

Jukebox Join is a web application designed for parties, friend groups, and small gatherings, enabling all participants to jointly control the music. Users can play, pause, and skip songs collectively, making it a collaborative music experience.

## How It Works

1. A user creates a room and becomes the Host.
2. The Host receives an access code.
3. Guests can join the room using the Host's access code.
4. The Host can set the number of votes required to skip a song.
5. The Host decides whether guests have the permission to play/pause the music.

## Features

- **Authentication**: Utilizes JWT (JSON Web Tokens) for secure user authentication.
- **Room Creation/Joining**: Users can create a new room or join an existing one.
- **Votes to Skip**: Hosts can set a threshold for the number of votes needed to skip a song.

## Technologies

- **React**: A robust front-end framework for building user interfaces.
- **Django**: A high-level Python web framework that encourages rapid development and clean, pragmatic design.
- **SQLite**: Used for storing room information and other relevant data.
- **CORS**: Implements Cross-Origin Resource Sharing for enhanced API security.
