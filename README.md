

---

# CP Contest Reminder Discord Bot

A Discord bot that fetches upcoming competitive programming contests using the CLIST API and sends reminders 30 minutes before the contest starts.

## Features

- Fetches upcoming contests from the CLIST API.
- Sends reminders to Discord channels 30 minutes before the start of each contest.
- Provides contest details including event name, host, start time, end time, and contest link.
- Automatically filters contests that are upcoming based on the current time.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sonalilipsa17375/CP-REMINDER-BOT.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:
   
   Create a `.env` file in the root directory and add your Discord bot token:
   
   ```
   TOKEN=your_discord_bot_token_here
   ```

4. Start the bot:

   ```bash
   npm start
   ```

## Usage

To use the bot, invite it to your Discord server and type `!contests` to get a list of upcoming contests.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built using Node.js and Discord.js
- Uses the CLIST API to fetch contest data

## Contact

For issues and feature requests, please [open an issue](https://github.com/Sonalilipsa17375/CP-REMINDER-BOT/issues/new).

---

