# Twitch
These are the scripts for the commands I use on my [stream](https://www.twitch.tv/nglgzz).


## Running
If you want to try these scripts you need to have [chromix-too](https://github.com/smblott-github/chromix-too)
installed. This is used to communicate with Chrome/Chromium. To run the express
server, simply execute:

```
npm install
npm start
```

The commands will be available on http://localhost:4444


## Commands
For now there's just two commands for songs, I will probably add more later on.
Below you can find all endpoints you can call, the arguments they accept and a
description of what they do.

| Enpoint  | Args   | Description                                                               |
|----------|:------:|---------------------------------------------------------------------------|
| /play    | -      | Return the name and URL for the current song                              |
| /play    | `url`  | Change the current song to the specified URL (accepts only YouTube links) |
