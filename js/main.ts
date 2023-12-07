import randomize from './commands/randomize';
import { downloadFile } from './helpers/downloadFile';

const txtSeed = document.getElementById('txt-seed') as HTMLInputElement;
const lmBoard = document.getElementById('file-lm-lawns') as HTMLInputElement;
const labelLmRom = document.getElementById('file-lm-rom-label') as HTMLLabelElement;
const lmRom = document.getElementById('file-lm-rom') as HTMLInputElement;
const labelLmBoard = document.getElementById('file-lm-lawns-label') as HTMLLabelElement;
const btnSubmit = document.getElementById('btn-submit') as HTMLButtonElement;
const notification = document.getElementById('notification') as HTMLDivElement;


async function onLoad() {
  if (!localStorage.getItem('seed')) {
    localStorage.setItem('seed', '0000000000');
  }
  txtSeed.value = localStorage.getItem('seed');
  refresh();
}

function refresh() {
  if (lmRom.files.length === 0) {
    labelLmRom.innerHTML = 'Drop Lawn Mower rom here';
  } else {
    labelLmRom.innerHTML = lmRom.files[0].name;
  }
  if (lmBoard.files.length === 0) {
    labelLmBoard.innerHTML = 'Custom game board';
  } else {
    labelLmBoard.innerHTML = lmBoard.files[0].name;
  }
  btnSubmit.disabled = lmRom.files.length === 0;
  localStorage.setItem('seed', txtSeed.value);
}

function setAlert(type: string, innerHtml, alertElement: HTMLDivElement) {
  alertElement.classList.remove('alert-primary', 'alert-secondary', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'alert-light', 'alert-dark');
  if (type) {
    alertElement.classList.remove('invisible');
    alertElement.classList.add(`alert-${type}`);
  } else {
    alertElement.classList.add('invisible');
  }
  alertElement.innerHTML = innerHtml;
}

async function getVanillaBoard() {
  const response = await fetch('./static/LawnsVanilla.json_');
  return response.blob();
}

// document.getElementById('get-vanilla-board').addEventListener('click', async (ev) => {
//   downloadFile(await getVanillaBoard(), 'LawnsVanilla.json');
// });

btnSubmit.addEventListener('click', async (ev) => {
  setAlert('primary', 'Generating... please wait!', notification);
  try {
    const boards = lmBoard.files?.length ? lmBoard.files[0] : await getVanillaBoard();
    const lmRomRando = randomize(txtSeed.value, { boards: boards }, lmRom.files[0]);
    downloadFile(await lmRomRando, lmRom.files[0].name);
    setAlert('success', 'Rom ready!', notification);
  } catch (err) {
    setAlert('danger', err, notification);
  }
  refresh();
});

txtSeed.addEventListener('change', refresh);
lmRom.addEventListener('change', refresh);
lmBoard.addEventListener('change', refresh);
document.addEventListener('DOMContentLoaded', onLoad);
