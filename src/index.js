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
  client.onMessage(async (message) => {
    const stage = await getStage(message.from);
    let resp = stages.step[stage].obj.execute(message.from, message.body, message.sender?.name);
    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      if (stage === 0 && index === 0) {
        try {
          await client.sendText(message.from, element, {
            quotedMsg: message.id,
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        await client.sendText(message.from, element);
      }
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
