import * as El from '../objects/Elements';
import Game from '../objects/Game';
import * as vanillaGameJson from '../objects/vanillaGame.json';
import log1dArray from '../helpers/debug';

function writeRom(fileData: ArrayBuffer, game: Game) {
  const lawnMowerRomData = new DataView(fileData);
  const offsetLevelData = 0x58;
  game.lawns.forEach((lawn, temp) => {
    log1dArray(lawn.elements.map((el) => el.nameShort), 32);
    const levelAddress = lawn.address;
    let byte = 0;
    for (let i = 0; i < lawn.getWidthWithOOB() * lawn.getHeightWithOOB(); i++) {
      const j = i + 1;
      byte = (byte << 2) | lawn.elements[i].romValue;
      if (j % 4 === 0 && j > 0) {
        lawnMowerRomData.setUint8(levelAddress - 1 + (j / 4), byte);
        byte = 0;
      }
    }
    const mowCoordinate = lawn.getCoordinateFromIndex(lawn.elements.findIndex((x) => x === El.Mow));
    lawnMowerRomData.setUint8(levelAddress + offsetLevelData + 1, mowCoordinate[0]);
    lawnMowerRomData.setUint8(levelAddress + offsetLevelData + 2, mowCoordinate[1] + 3);
  });
}

export default async function randomize(seed: string, options: {}, file: Blob) {
  if (!seed.match(/^[a-zA-Z\d]{10}$/)) {
    throw new Error('The seed must have 10 char with only letters and digits');
  }
  try {
    const importedGameArrayBuffer = file.arrayBuffer();
    const vanillaGame = Game.getLawnFromJSon(vanillaGameJson);
    const randomizedGame = vanillaGame.randomize(seed, null);
    // const randomizedGame = usedAlgorithm.randomize(seed, vanillaGame);
    writeRom(await importedGameArrayBuffer, randomizedGame);
    return importedGameArrayBuffer;
  } catch {
    throw new Error('Can\'t randomize this rom');
  }
}
