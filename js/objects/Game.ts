import seedrandom from 'seedrandom';
import { seedRandomUInt31 } from '../helpers/seedrandom';
import Lawn from './Lawn';
import * as El from './Elements';
import RandomizerOption from './RandomizerOptions';
import lawnsAddress from './LawnsAddress';

class Game {
  lawns: Lawn[]

  constructor() {
    this.lawns = [];
  }

  static getLawnFromJSon(jsonObject: any) {
    const game = new Game();
    for (let i = 1; i < 11; i++) {
      const lawnElements = jsonObject[i];
      const els = lawnElements.map((jsonElId) => El.elements.find((x) => x.id === jsonElId));
      const newLawn = new Lawn(els, lawnsAddress[i]);
      game.lawns.push(newLawn);
    }
    // jsonObject.forEach((lawnElements, lawnNumber) => {
    //   const els = lawnElements.map((jsonElId) => El.elements.find((x) => x.id === jsonElId));
    //   const newLawn = new Lawn(els, lawnsAddress[lawnNumber]);
    //   game.lawns.push(newLawn);
    // });
    return game;
  }

  randomize(seed: string, options: RandomizerOption[]) {
    const randomizedGame = new Game();
    const rngSeed = seedrandom(seed);
    this.lawns.forEach((lawn) => {
      const grassCount = lawn.elementsMap.get(El.Gra).length;
      const flowerCount = lawn.elementsMap.get(El.Flo).length;
      const rockCount = lawn.elementsMap.get(El.Roc).length;
      lawn.cleanButKeepOob();

      // Set Mow position

      const mowPosX = lawn.getInBoundCoordinateX()[0]
      + (seedRandomUInt31(rngSeed)
      % (lawn.getInBoundCoordinateX()[1] - lawn.getInBoundCoordinateX()[0]));

      const mowPosY = lawn.getWidthWithOOB() * (seedRandomUInt31(rngSeed)
      % lawn.getHeightWithOOB());

      lawn.setElementAtIndex(mowPosX + mowPosY, El.Mow);

      // Set everything else position
      while (grassCount > lawn.elementsMap.get(El.Gra).length) {
        this.fill(lawn, El.Gra, rngSeed);
      }
      while (flowerCount > lawn.elementsMap.get(El.Flo).length) {
        this.fill(lawn, El.Flo, rngSeed);
      }
      while (rockCount > lawn.elementsMap.get(El.Roc).length) {
        this.fill(lawn, El.Roc, rngSeed);
      }

      randomizedGame.lawns.push(lawn);
    });
    return randomizedGame;
  }

  private fill(lawn: Lawn, element : El.Elements, rngSeed: seedrandom.prng) {
    const emptyLawnCases = lawn.elementsMap.get(El.Not);
    const chosenCaseIndex = emptyLawnCases[seedRandomUInt31(rngSeed) % emptyLawnCases.length];
    lawn.setElementAtIndex(chosenCaseIndex, element);
  }
}
export default Game;
