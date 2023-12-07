import * as El from '../objects/Elements';
import Game from '../objects/Game';
import log1dArray from '../helpers/debug';

function writeRom(fileData: ArrayBuffer, game: Game) {
  const lawnMowerRomData = new DataView(fileData);
  const offsetLevelData = 0x58;
  const grassCountOffset = 0x5B;
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
    lawnMowerRomData.setUint8(levelAddress + grassCountOffset, lawn.getTotalGrass());
  });
}

export default async function randomize(seed: string, options: {}, file: Blob) {
  if (seed !== '' && !seed.match(/^[a-zA-Z\d]{10}$/)) {
    throw new Error('The seed must have 10 char with only letters and digits');
  }
  try {
    const boardsStr = await options.boards.text();
    const boards = JSON.parse(boardsStr);

    // TODO: EVERYTHING, INCLUDING THE VANILLA BOARD MUST USE THE JSON CONVERSION!!!!
    const importedGameArrayBuffer = file.arrayBuffer();
    const vanillaGame = Game.getLawnFromJSon(boards);
    const randomizedGame = seed === '' ? vanillaGame : vanillaGame.randomize(seed, null);
    // const randomizedGame = usedAlgorithm.randomize(seed, vanillaGame);
    writeRom(await importedGameArrayBuffer, randomizedGame);
    return importedGameArrayBuffer;
  } catch (e) {
    throw new Error(e);
  }
}
