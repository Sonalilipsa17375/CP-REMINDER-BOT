require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js'); 

const axios = require('axios'); 

/* ---- bot permisssions allowed - to access msg by user (msg content permission)  ----- */
/*--msg reply (guild messages)--- */
// guild - server
// intents includes the bot permissions allowed 

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const apiKey = process.env.API_KEY;

//"Sona_8112:e3fb4eb67bae124d409b4c83808a56239c007479";

const reminders = new Map();



client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(checkfun, 60 * 1000);

});

// manual typing by user - command -'cp' - to get the contest details as msg in the discord server.

client.on('messageCreate', async (message) => { 

  if (message.author.bot) return; 

//  command -- cp (to get details at any time)

  if (message.content === "cp") {

  // api fetched details

    try {
      const response = await axios.get("https://clist.by/api/v4/contest/", {
        headers: {
          "Authorization": `ApiKey ${apiKey}`
        }
      });

      const contests = response.data.objects;

      // filtered data including contests which are upcoming , (compared using present time (new Date()) and start time of contest)

      const data = contests.filter(contest => new Date(contest.start) > new Date());

      if (!data || data.length === 0) {

        message.reply("No contests found !");

      } else {
        let list = data.map(contest => {

          return `**${contest.event}** hosted by **${contest.host}**\nStarts: ${new Date(contest.start).toLocaleString()}\nEnds: ${new Date(contest.end).toLocaleString()}\nLink: ${contest.href}`;

        }).join('\n\n');

        if (list.length > 2000) {
          const msgsplit = splitIntoChunks(list, 2000);

          for (let part of msgsplit) {
            await message.reply(part);
          }
        } else {
          message.reply(list);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
});

async function checkfun() {
  try {
    const response = await axios.get("https://clist.by/api/v4/contest/", {
      headers: {
        "Authorization": `ApiKey ${apiKey}`
      }
    });

    const contests = response.data.objects;

      const upcontests = contests.filter(contest => {

      const start = new Date(contest.start);
      const present = new Date();
      const diff = start - present;

      const val = diff > 0 && diff <= 30*60*1000; 

      return val;
    });

    upcontests.forEach(contest => {
      if (!reminders.has(contest.id)) {

        const remindtime = new Date(contest.start) - new Date() - 30*60*1000;

        setTimeout(() => {
          send_reminder(contest);
          reminders.delete(contest.id); 
        }, remindtime);

        reminders.set(contest.id, true); 
      }
    });

  } catch (error) {
    
    console.log("Error checking for upcoming contests:", error);
    
  }
}

function send_reminder(contest) {
  
  const remindermsg = `**Reminder!**\n\n Contest **${contest.event}** hosted by **${contest.host}** is starting in 30 minutes!\nLink: ${contest.href}`;

  const channel = client.channels.cache.find(channel => channel.name === 'general'); 
  
  if (channel) {
    channel.send(remindermsg);
  } else {
    console.log("error");
  }
}

client.login(process.env.TOKEN);
