const Discord = require("discord.js");
const client = new Discord.Client();
const CSGameState = new(require("cs-gamestate"))(3002, "127.0.0.1");
const fs = require("fs");
const ytdl = require("ytdl-core")

const token = "Njg4MDc5MDMwMjg0NDUxODcz.XmvLOw.DFxNoS8ktrc33KeMIXy3l7EWok8";
var winSongs;
var voiceConnection;

client.on("ready", function(){
    console.log("Ready");
    // Read user data
    winSongs = JSON.parse(fs.readFileSync("file.json", "utf8"));
})

/*
CSGameState.on("round.win_team", (round_win, oldRound, data) =>{
    console.log("change");
    winSongs = ["https://www.youtube.com/watch?v=uIIyMj9pt3M", "https://www.youtube.com/watch?v=1ZagrczctTI", "https://www.youtube.com/watch?v=kKU5qx02LcY"];
    if(round_win == data.player.team){
        client.channels.fetch("688082868110491915").then(channel => {
            channel.join().then(connection => {
                connection.play(ytdl("https://www.youtube.com/watch?v=kKU5qx02LcY", {filter: "audioonly"}), {volume: 0.5, seek: 0});
            })
        })
    }
    /*
        client.channels.fetch("688082868110491915").then(channel => {
            channel.join().then(connection => {
                const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=kKU5qx02LcY", {filter: "audioonly"}), {volume: 0.5, seek: 0});
                })
        })
    }
    if(round_win != data.player.team && round_win != undefined){
        client.channels.fetch("688082868110491915").then(channel => {
            channel.join().then(connection => {
                const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=u0jq42xgTzo", {filter: "audioonly"}), {volume: 0.5});
                })
        })
    }
    if(round_win == undefined){
        client.channels.fetch("688082868110491915").then(channel => {
            channel.join().then(connection => {
                const dispatcher = connection.play(ytdl(winSongs[1], {filter: "audioonly"}), {volume: 0});
                })
        })
    }
});
*/



var connect;
var channel;
//Handle response
client.on("message", (msg) => {
    if(msg.author !== client.user){
        if(msg.content[msg.content.length - 1] === "?"){
            msg.react("☝️");
            msg.channel.send("Jeg har set dig.")
        }
        
        //Switch on msg
        var command = ""; 
        if(msg.content.includes(" ")){
            command = msg.content.substring(0, msg.content.indexOf(" "));
        } else {
            command = msg.content;
        }
        var commandContent = msg.content.substring(msg.content.indexOf(" ")+1);
        
        switch(command){
            case "!help":
                //console.log(command);
                availableCommands(msg.author);
                break;
            case "Win":
                    client.channels.fetch("687730896178250017").then(channel => {
                        channel.join().then(connection => {
                            const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=uIIyMj9pt3M", {filter: "audioonly"}), {volume: 0.5, seek: 49.5});
                            })
                    });
                    break;
            case "Other":
                    client.channels.fetch("687730896178250017").then(channel => {
                        channel.join().then(connection => {
                            const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=1ZagrczctTI", {filter: "audioonly"}), {volume: 0.5, seek: 0});
                            })
                    });
                    break;
            case "Ez":
                    client.channels.fetch("687730896178250017").then(channel => {
                        channel.join().then(connection => {
                            const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=kKU5qx02LcY", {filter: "audioonly"}), {volume: 0.5, seek: 0});
                            })
                    });
                    break;
            case "Loss":
                    client.channels.fetch("687730896178250017").then(channel => {
                        channel.join().then(connection => {
                            const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=u0jq42xgTzo", {filter: "audioonly"}), {volume: 1, seek: 0});
                            })
                    });
                    break;
            case "Stop":
                    client.channels.fetch("687730896178250017").then(channel => {
                        channel.join().then(connection => {
                            const dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=uIIyMj9pt3M", {filter: "audioonly"}), {volume: 0, seek: 49.5});
                            })
                    });
                    break;
            case "!steamid":
                if(commandContent.match(/^\d{17}$/)){
                    //If steamid is already
                    if(checkUser(msg.author.id, commandContent)){
                        userData.users
                        msg.reply("ændrede steamID");
                    } else {
                        pushSteamID(msg.author.id, commandContent);
                        msg.reply("steamID tilføjet");
                    }
                } else {
                    msg.reply("steamID er ikke korrekt format, skal være /^\d{17}$/")
                }
                break;
            case "!resetsteam":
                resetSteamID();
                break;
        }
    }
})
//Login
client.login(token);

function availableCommands(user){
   //console.log("ready");
    user.send("**Du har følgende muligheder**\n\n!addsteam'\nForbinder din bruger til en steam bruger");
}

function pushSteamID(userid, steamID){
    userData.users.push({id: userid, steamid: steamID});
    var json = JSON.stringify(userData);
    fs.writeFile("file.json", json, (err) => {
        if (err){
            console.log(err);
        }
    });
}

function checkUser(user, steamid){
    return (userData.users.filter(x => x.id === user).length > 0 || userData.users.filter(x => x.steamid == steamid).length > 0);
}
function resetSteamID(){
    userData.users = [];
    var json = JSON.stringify(userData);
    fs.writeFile("file.json", json, (err) => {
        if (err){
            console.log(err);
        }
    });
}