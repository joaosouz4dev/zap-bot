const cardapio = require('../cardapio');
const banco = require('../banco');

function execute(user, msg, contato) {
  let menu = ' CARDAPIO \n\n';

  Object.keys(cardapio.menu).forEach((value) => {
    let element = cardapio.menu[value];
    let price = element.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    menu += `${value} - ${element.descricao}        ${price} \n`;
  });

  banco.db[user].stage = 1;

  return [
    `Olá ${contato} sou uma assistente virtual, irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
    menu,
  ];
}

exports.execute = execute;
