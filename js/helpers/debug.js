export default function log1dArray(array = [], rowSize = 0, colSize = 4) {
  let text = '';
  let row = 0;
  for (let i = -1; i < rowSize; i++) {
    text += i.toString().padEnd(colSize, ' ');
  }
  console.log(text);
  text = '';
  array.forEach((item, index) => {
    if (index % rowSize === 0 && index !== 0) {
      const rowHead = row.toString().padEnd(colSize, ' ');
      console.log(rowHead + text);
      text = '';
      row++;
    }
    text += `${item} `;
  });
  console.log(row.toString().padEnd(colSize, ' ') + text);
}
