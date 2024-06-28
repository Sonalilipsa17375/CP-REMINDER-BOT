require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const apiKey = process.env.API_KEY;

const reminders = new Map();

client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);
 
  setInterval(checkForUpcomingContests, 60 * 1000);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === "!contests") {
    try {
      const response = await axios.get("https://clist.by/api/v4/contest/", {
        headers: {
          "Authorization": `ApiKey ${apiKey}`
        }
      });

      console.log(response.data);

      const contests = response.data.objects;
      const upcomingContests = contests.filter(contest => new Date(contest.start) > new Date());

      if (!upcomingContests || upcomingContests.length === 0) {
        message.reply("No upcoming contests found.");
      } else {
        let contestList = upcomingContests.map(contest => {
          return `**${contest.event}** hosted by **${contest.host}**\nStarts: ${new Date(contest.start).toLocaleString()}\nEnds: ${new Date(contest.end).toLocaleString()}\nLink: ${contest.href}`;
        }).join('\n\n');

        

        if (contestList.length > 2000) {
          const splitMessage = splitIntoChunks(contestList, 2000);
          for (let part of splitMessage) {
            await message.reply(part);
          }
        } else {
          message.reply(contestList);
        }
      }

    } catch (error) {
      console.log(error);
      message.reply("Could not fetch contests data.");
    }
  }
});


async function checkForUpcomingContests() {
  try {
    const response = await axios.get("https://clist.by/api/v4/contest/", {
      headers: {
        "Authorization": `ApiKey ${apiKey}`
      }
    });

    const contests = response.data.objects;
    const upcomingContests = contests.filter(contest => {

      const startTime = new Date(contest.start);
      const now = new Date();
      const diff = startTime - now;
      return diff > 0 && diff <= 30 * 60 * 1000; 

    });

    upcomingContests.forEach(contest => {

      if (!reminders.has(contest.id)) {
        const timeToReminder = new Date(contest.start) - new Date() - 30 * 60 * 1000;

        setTimeout(() => {
          sendReminder(contest);
          reminders.delete(contest.id);
        }, timeToReminder);

        reminders.set(contest.id, true);
      }
    });

  } catch (error) {

    console.log("Error checking for upcoming contests:", error);
  }
}


function sendReminder(contest) {

  const reminderMessage = `**Reminder!**\n\nThe contest **${contest.event}** hosted by **${contest.host}** is starting in 30 minutes!\nLink: ${contest.href}`;

  const channel = client.channels.cache.find(channel => channel.name === 'general'); 
  if (channel) {

    channel.send(reminderMessage);

  } else {

    console.log("Channel not found.");
  }
}


function splitIntoChunks(string, chunkSize) {

  const chunks = [];

  for (let i = 0, charsLength = string.length; i < charsLength; i += chunkSize) {

    chunks.push(string.substring(i, i + chunkSize));

  }
  return chunks;
}

client.login(process.env.TOKEN);
