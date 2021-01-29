const textArea = document.getElementById("text-input");
const coordInput = document.getElementById("coord");
const valInput = document.getElementById("val");
const errorMsg = document.getElementById("error");

document.addEventListener("DOMContentLoaded", () => {
  textArea.value =
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
  fillpuzzle(textArea.value);
});

textArea.addEventListener("input", () => {
  fillpuzzle(textArea.value);
});

function fillpuzzle(data) {
  let len = data.length < 81 ? data.length : 81;
  for (let i = 0; i < len; i++) {
    //rowLetter and col creates all the possible grid coordinates (A1, B6...) so that all <td class=''> elements can be dynamically selected
    //rowLetter creates a letter A-I for all <td> whose row designator starts with a letter from A-I; so rowLetter will contain 9 instances of 'A' for all <td> in row 'A'
    //col creates a number 1-9 for all <td> whose column starts with a number 1-9; so col will contain 9 instances of each number from 1-9
    let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
    let col = (i % 9) + 1; 
    if (!data[i] || data[i] === ".") {
      document.getElementsByClassName(rowLetter + col)[0].innerText = " ";
      continue;
    }
    document.getElementsByClassName(rowLetter + col)[0].innerText = data[i];
  }
  return;
}

async function getSolved() {
  const stuff = {"puzzle": textArea.value}
  const data = await fetch("/api/solve", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(stuff)
  })
  const parsed = await data.json();
  if (parsed.error) {
    errorMsg.innerHTML = `<code>${JSON.stringify(parsed, null, 2)}</code>`;
    return
  }
  fillpuzzle(parsed.solution)
}

async function getChecked() {
  const stuff = {"puzzle": textArea.value, "coordinate": coordInput.value, "value": valInput.value}
    const data = await fetch("/api/check", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(stuff)
  })
  const parsed = await data.json();
  errorMsg.innerHTML = `<code>${JSON.stringify(parsed, null, 2)}</code>`;
}


document.getElementById("solve-button").addEventListener("click", getSolved)
document.getElementById("check-button").addEventListener("click", getChecked)