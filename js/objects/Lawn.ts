import * as El from './Elements';

export default class Lawn {
  elements: El.Elements[]

  address: number

  elementsMap : Map<El.Elements, number[]>;

  private width: number

  private height: number

  left() {
    return -1;
  }

  right() {
    return 1;
  }

  up() {
    return -this.width;
  }

  down() {
    return this.width;
  }

  constructor(elements: El.Elements[], address: number) {
    this.height = 11;
    this.width = 32;
    this.elements = elements;
    this.address = address;

    this.elementsMap = new Map([
      [El.Not, []],
      [El.Gra, []],
      [El.Flo, []],
      [El.Roc, []],
      [El.Not, []],
      [El.Oob, []],
      [El.Mow, []],
    ]);
    this.elements.forEach((els, index) => {
      this.elementsMap.get(els).push(index);
    });
  }

  getWidthWithOOB() {
    return this.width;
  }

  getHeightWithOOB() {
    return this.height;
  }

  getInBoundCoordinateX() {
    const y0 = this.elements.slice(0, this.getWidthWithOOB());
    const minBound = y0.findIndex((el) => el !== El.Oob);
    y0.reverse();
    const maxBound = y0.length - 1 - y0.findIndex((el) => el !== El.Oob);
    return [minBound, maxBound];
  }

  getInBoundCoordinateY() {
    return this.height;
  }

  getCoordinateFromIndex(index: number) {
    return [index % this.getWidthWithOOB(), Math.trunc(index / this.getWidthWithOOB())];
  }

  getIndexFromCoordinates(x: number, y: number) {
    return x + y * this.getWidthWithOOB();
  }

  setElementAtIndex(arrayNumber: number, el: El.Elements) {
    const oldEl = this.elements[arrayNumber];
    this.elements[arrayNumber] = el;
    this.elementsMap.get(el).push(arrayNumber);
    // SLOW!!!!
    this.elementsMap.set(oldEl, this.elementsMap.get(oldEl).filter((x) => x !== arrayNumber));
  }

  cleanButKeepOob() {
    this.elements.forEach((el, index) => {
      if (el !== El.Oob && el !== El.Not) {
        this.setElementAtIndex(index, El.Not);
      }
    });
  }
}
