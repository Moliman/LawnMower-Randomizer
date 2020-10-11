import randomize from './commands/randomize';
import { downloadBlob } from './helpers/downloadBlob';

const lmRom = document.getElementById('file-lm-rom') as HTMLInputElement;
const txtSeed = document.getElementById('txt-seed') as HTMLInputElement;
const btnSubmit = document.getElementById('btn-submit') as HTMLButtonElement;
const labelLmRom = document.querySelector('label.custom-file-label') as HTMLLabelElement;
const notification = document.getElementById('notification') as HTMLDivElement;

function onLoad() {
  if (!localStorage.getItem('seed')) {
    localStorage.setItem('seed', '0000000000');
  }
  txtSeed.value = localStorage.getItem('seed');
}

function refresh() {
  if (lmRom.files.length === 0) {
    labelLmRom.innerHTML = 'Drop Lawn Mower rom here';
  } else {
    labelLmRom.innerHTML = lmRom.files[0].name;
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

btnSubmit.addEventListener('click', async (ev) => {
  setAlert('primary', 'Randomizing... please wait!', notification);
  try {
    const downloadFile = randomize(txtSeed.value, null, lmRom.files[0]);
    downloadBlob(new Blob([await downloadFile]), lmRom.files[0].name);
    setAlert('success', 'Rom ready!', notification);
  } catch (err) {
    setAlert('danger', err, notification);
  }
  refresh();
});

txtSeed.addEventListener('change', refresh);
lmRom.addEventListener('change', refresh);
document.addEventListener('DOMContentLoaded', onLoad);
