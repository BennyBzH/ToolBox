var rarities = [{
  type: "common",
  chance: 100
}, {
  type: "mythics",
  chance: 100
}, {
  type: "legends",
  chance: 100
}, {
  type: "ub",
  chance: 1
}];

function pickRandom() {
  // Calculate chances for common
  var filler = rarities.map(r => r.chance).reduce((sum, current) => sum + current);

  // Create an array of 100 elements, based on the chances field
  var probability = rarities.map((r, i) => Array(r.chance === 0 ? filler : r.chance).fill(i)).reduce((c, v) => c.concat(v), []);

  // Pick one
  var pIndex = Math.floor(Math.random() * filler);
  var rarity = rarities[probability[pIndex]];

  return rarity.type;
}

var i = 0;

const test = { common: 0, mythics: 0, legends: 0, ub: 0};

while (i < 100000) {
  const a = pickRandom();
  test[a] += 1;
  i++;
}

console.log(test)