import { pluck, reduce, add, pipe, flatten, map, prop, repeat, addIndex, append } from 'ramda';
import StarRarity from './data/StarRarity.json'

const mapIndexed = addIndex(map);

class Celestrial {
  data;
  sumOfProba;
  probaMap;
  target = 'rarity'

  propTarget        = prop(this.target);
  pluckRarity       = pluck(this.target);
  sumRarity         = pipe(this.pluckRarity, reduce(add, 0));
  arrayFill         = mapIndexed((a, b) => repeat(b, this.propTarget(a)));
  probaArrayMap     = pipe(this.arrayFill, flatten);

  pickRandom () {
    const pIndex          = Math.floor(Math.random() * this.sumOfProba);
    const probaPickIndex  = this.probaMap[pIndex];
    const picked          = this.data[probaPickIndex];

    return picked
  }
}

class StellarSystem extends Celestrial {

  constructor() {
    super();
    this.data = StarRarity;
    this.sumOfProba     = this.sumRarity(this.data)
    this.probaMap       = this.probaArrayMap(this.data);

    let a = { 'M': 0, 'K':0, 'G':0, 'F':0, 'A':0, 'B':0, 'O':0, 'BO':0 };


    var i = 0;
    while(i < 100) {
      const current = this.pickRandom();
      a = { ...a, [current.type]: 1+a[current.type] }
      i++;
    }

    console.table(a)
  }

  generateOne() {

  }
}

export { StellarSystem };
