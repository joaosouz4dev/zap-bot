const banco = require('../banco');

function execute(user, msg) {
  if (msg === '*') {
    banco.db[user].stage = 0;
    return ['Pedido cancelado com sucesso'];
  }

  if (msg === '#') {
    banco.db[user].stage = 3;
    return ['Digite o endereço por favor :'];
  }

  let resumo = '  RESUMO DO PEDIDO \n';
  let total = 0;
  banco.db[user].itens.forEach((value) => {
    let price = value.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    resumo += `${value.descricao} ----------------  ${price} \n`;

    total += value.preco;
  });
  total = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  resumo += '-------------------------\n';
  resumo += ` Total ${total}`;

  return [resumo, 'Para confirmar digite # ou para cancelar digite * '];
}

exports.execute = execute;
