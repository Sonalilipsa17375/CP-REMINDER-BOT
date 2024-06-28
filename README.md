

```markdown
# CP Contest Reminder Discord Bot

A Discord bot designed to help competitive programmers stay updated with upcoming contests. This bot uses the CLIST API to fetch contest data and sends reminders 30 minutes before the contest starts.

## Features

- Fetches upcoming contest data from the CLIST API.
- Sends reminders in a specified Discord channel 30 minutes before the contest begins.
- Provides a list of upcoming contests on command.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Discord account and server
- CLIST API key

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Sonalilipsa17375/CP-REMINDER-BOT.git
   cd CP-REMINDER-BOT
   ```

2. Install the required dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your Discord bot token and CLIST API key:
   ```env
   DISCORD_TOKEN=your-discord-token
   CLIST_API_KEY=your-clist-api-key
   ```

4. Start the bot:
   ```sh
   npm start
   ```

### Usage

- The bot will automatically send reminders to the `#general` channel 30 minutes before the start of each contest.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

[SONALI LIPSA PATRA]

```
