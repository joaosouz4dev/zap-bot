const banco = require('../banco');
const stages = require('../stages');
let estagioInterno = 0;

function execute(user, msg) {
  if (estagioInterno === 1) {
    banco.db[user].stage = 4;
    return stages.step[4].obj.execute(user, '');
  }
  if (msg === '1') {
    estagioInterno++;
    return ['Digite o valor em dinheiro para levarmos o troco: '];
  }
  if (msg === '2') {
    banco.db[user].stage = 4;
    return stages.step[4].obj.execute(user, '');
  }
  return ['Escolha a forma de pagamento:\n1️⃣-Dinheiro\n2️⃣-Cartão'];
}

exports.execute = execute;
