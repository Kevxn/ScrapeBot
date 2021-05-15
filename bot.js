const Discord = require('discord.js');
const token = require('./secrets.json');
const rp = require('request-promise');
const cheerio = require('cheerio');
const config = require('./config.json');
const { exit } = require('process');


const prod = true;
const settings = prod ? config.prod : config.dev;

const client = new Discord.Client();
let general = undefined;

setInterval( () => {
    if (!general) return;
    rp(settings.url)
        .then( (html) => {
            cheerio.load(html);
            const $ = cheerio.load(html);
            disabled = "true" == $('#addToBasketButton').attr()['data-purchase-disabled'];
            
            if (!disabled){
                console.log('In stock!');
                general.send(`${settings.role} is in stock! -> ${settings.url}`);
            }
        })
        .catch( (err) => {
            console.log(err);
            console.log('Error scraping url: ' + settings.url);
        });
}, settings.scrapeFrequencyMs );

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Scraping: ${settings.url} every ${settings.scrapeFrequencyMs / 1000} seconds`);
  console.log(`Notifying role ${settings.role} in guild ${settings.guild} in channel ${settings.channel}`);
  client.user.setPresence({
      activity: {name: '/status'},
      status: 'online'
  });

  client.guilds.fetch(settings.guild)
    .then( (guild) => {
        generalPromise = guild.client.channels.fetch(settings.channel)
        .then( (gen) => {
            general = gen;
        });
    })
    .catch( (err) => {
        console.log(err);
        console.log("Failed to setup Discord settings, exiting...");
        exit();
    });
});

client.on('message', msg => {
    if (msg.content == '/status'){
        msg.reply(`Searching for ${settings.url} stock every ${settings.scrapeFrequencyMs / 1000} seconds`);
    }
});

client.login(token.token);
