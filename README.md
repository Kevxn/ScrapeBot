# ScrapeBot

#### This simple bot scrapes a website for an item and notifies a Discord role whenever stock is found.

Bot can be configured using a `config.json` file with the following structure:

    {
        "prod": {
            "guild": "<your guild id>",
            "channel": "<your channel id>",
            "role": "<@&your role id>",
            "url": "your url",
            "scrapeFrequencyMs": "<your scrape frequency in milliseconds (be reasonable)"
        },
        "dev": {
            "guild": "<your guild id>",
            "channel": "<your channel id>",
            "role": "<@&your role id>",
            "url": "your url",
            "scrapeFrequencyMs": "<your scrape frequency in milliseconds (be reasonable)"
        }
    }

Bot must also have a `secrets.json` file in the same directory with structure:

    {
        "token": "<your bot token>"
    }

`prod` and `dev` can be used for testing on another guild or channel before moving to the live version.

Once configured, run bot with `node bot.js`

Different websites will of course require different selectors which can be obtained from Chrome DevTools.
