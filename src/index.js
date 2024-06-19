// Supports ES6
// import { create, Whatsapp } from 'sulla';
const bot = require('@wppconnect-team/wppconnect');
const banco = require('./banco');
const stages = require('./stages');

bot
  .create({
    session: 'zap-bot',
  })
  .then((client) => start(client));

async function start(client) {
  let tokens = await client.getSessionTokenBrowser();
  console.log(tokens);
  client.onMessage(async (message) => {
    let resp = stages.step[getStage(message.from)].obj.execute(message.from, message.body, message.sender.name);
    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      await client.sendText(message.from, element);
    }
  });
}

function getStage(user) {
  if (banco.db[user]) {
    //Se existir esse numero no banco de dados
    return banco.db[user].stage;
  } else {
    //Se for a primeira vez que entra e contato
    banco.db[user] = {
      stage: 0,
      itens: [],
    };
    return banco.db[user].stage;
  }
}
