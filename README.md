# Chrome Actions

This project consists of a server allowing you to control certain aspects of
Chrome/Chromium.

At the moment these actions are only related to playing music or videos on
YouTube/ListenOnRepeat, but if you are interested in other use cases, just
create a new issue or pull request and I will try to help you.

## Running

To try this project you will first need to set up [chromix-too](https://github.com/smblott-github/chromix-too).
This extension and server are used to communicate with Chrome/Chromium. To run
the server:

```
npm install
npm start
```

The commands will be available at http://localhost:8268

## Commands

Below you can find all endpoints you can call, the arguments they accept and a
description of what they do.

| Enpoint | Args  | Description                                                                            |
| ------- | :---: | -------------------------------------------------------------------------------------- |
| /       |   -   | Get a list of commands                                                                 |
| /info   |   -   | Return the name and URL for the current song                                           |
| /pause  |   -   | Pause/Play the current song                                                            |
| /back   |   -   | Play the previous song                                                                 |
| /next   |   -   | Play the next song                                                                     |
| /change | `url` | Change the current song to the specified URL (accepts YouTube/LOR links or song names) |
| /random |   -   | Play a random song                                                                     |

## Integration

I use these scripts in two ways:

- In i3. I created some bindings for media keys to send requests to this server,
  I made a shortcut to open [rofi](https://github.com/DaveDavenport/rofi) and
  change url to the song I queried, and I have a widget on my status bar to show
  the song I'm currently playing from YouTube.

- I made some NightBot commands to send requests to this server, so my Twitch
  viewers can change/play/pause the music during my streams.

If you have other interesting integrations, please add it here :)

## Related projects

If you want to control your browser from JavaScript (using the Chrome API), you
should check [chromix-three](https://github.com/nglgzz/chromix-three). If you want
to use the shell instead, you should check [chromix-too](https://github.com/smblott-github/chromix-too).
