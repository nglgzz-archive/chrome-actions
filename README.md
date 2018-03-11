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

The commands will be available on http://localhost:8268


## Commands
Below you can find all endpoints you can call, the arguments they accept and a
description of what they do.

| Enpoint         | Args  | Description                                                               |
|-----------------|:-----:|---------------------------------------------------------------------------|
| /               | -     | Get a list of commands                                                    |
| /info           | -     | Return the name and URL for the current song                              |
| /pause          | -     | Pause/Play the current song                                               |
| /previous       | -     | Play the previous song                                                    |
| /next           | -     | Play the next song                                                        |
| /change         | `url` | Change the current song to the specified URL (accepts only YouTube links) |
| /random         | -     | Play a random song                                                        |
