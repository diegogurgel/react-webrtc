# WebRTC with react

This is a simple 1-to-1 video chat room example using react with webRTC and share screen API. This is experimental for learnig purposes. I hope that this project help you to learn something. You can test this on https://video-chat.dgurgel.now.sh put a room id that you want to create and click enter the other peer have to use the same room id. Sometimes it takes a bit longer to connect(no longer than one minute).

<img height="300" alt="android screenshot" src="https://github.com/diegogurgel/react-webrtc/blob/master/screenshot/android_screenshot.png">

### Running locally

To run this application you need to create a TURN account. You can create one using this service http://numb.viagenie.ca/cgi-bin/numbacct

Change the `.env.example` to `.env` or `.env.local`

Put your turn account on the .env file

#### The folders

Front-end files are inside `/src` and the server files are inside `/server` folder

#### Install the dependencies

```shell
npm i
```

#### Start the application

```shell
npm run start:local
```
