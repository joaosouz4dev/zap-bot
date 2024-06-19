const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const banco = require('./banco');
const stages = require('./stages');

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: 'tokens-wwebjs',
    clientId: 'client-one',
  }),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  },
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('message_create', (message) => {
  if (!message.fromMe) handleMessage(message);
});

client.initialize();

async function handleMessage(message) {
  const name = message.author || '';
  let resp = stages.step[getStage(message.from)].obj.execute(message.from, message.body, name);
  for (let index = 0; index < resp.length; index++) {
    const element = resp[index];
    await client.sendMessage(message.from, element);
  }
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
