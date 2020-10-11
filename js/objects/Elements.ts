export interface Elements {
  name: string,
  nameShort: string,
  id: number,
  romValue: number;
}

export const Not : Elements = {
  name: 'Nothing',
  nameShort: 'Not',
  id: 0,
  romValue: 0,
};

export const Gra : Elements = {
  name: 'Grass',
  nameShort: 'Gra',
  id: 1,
  romValue: 1,
};

export const Flo : Elements = {
  name: 'Flower',
  nameShort: 'Flo',
  id: 2,
  romValue: 2,
};

export const Roc : Elements = {
  name: 'Rock',
  nameShort: 'Roc',
  id: 3,
  romValue: 3,
};

export const Mow : Elements = {
  name: 'Mow',
  nameShort: 'Mow',
  id: 5,
  romValue: 0,
};

export const Oob: Elements = {
  name: 'Oob',
  nameShort: 'Oob',
  id: 9,
  romValue: 0,
};

export const romElements = [
  Not,
  Gra,
  Flo,
  Roc,
];

export const elements = [
  Not,
  Gra,
  Flo,
  Roc,
  Mow,
  Oob,
];
