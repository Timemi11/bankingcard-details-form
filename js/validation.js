let cname = document.getElementById("cname");
let cnumber = document.getElementById("cnumber");
let cexp1 = document.getElementById("cexp1");
let cexp2 = document.getElementById("cexp2");
let ccvc = document.getElementById("ccvc");
// CARD
// Front
let cardnumber = document.querySelector(".card-number");
let cardname = document.querySelector(".card-name");
let cardexp = document.querySelector(".card-exp");
// END Front

// Back
let cardcvc = document.querySelector(".card-cvc");
// END Back
// END

function realTimeInputName() {
  let input = cname.value;
  cardname.innerHTML = input;
  if (input == "") {
    cardname.innerHTML = "Jane Appleseed";
  }
}
function realTimeInputNumber() {
  let input = cnumber.value;
  cardnumber.innerHTML = input;
  if (input == "") {
    cardnumber.innerHTML = "0000 0000 0000 0000";
  }
}

let MMCpText = "";
let YYCpText = "";
function realTimeInputExp1() {
  let input = cexp1.value;
  cardexp.innerHTML = `${input}/00`;
  if (input == "") {
    cardexp.innerHTML = "00/00";
  }
  if (input != "" && YYCpText != "") {
    cardexp.innerHTML = input + "/" + YYCpText;
  }
  if (input == "" && YYCpText != "") {
    cardexp.innerHTML = "00/" + YYCpText;
  }
  MMCpText = `${input}`;
}
function realTimeInputExp2() {
  let input = cexp2.value;
  cardexp.innerHTML = `${MMCpText}/${input}`;
  if (input == "") {
    cardexp.innerHTML = MMCpText + "/00";
  }
  if (input == "" && MMCpText == "") {
    cardexp.innerHTML = "00/00";
  }
  if (input != "" && MMCpText == "") {
    cardexp.innerHTML = "00/" + input;
  }
  YYCpText = input;
}
function realTimeInputCvc() {
  let input = ccvc.value;
  cardcvc.innerHTML = input;
  if (input == "") {
    cardcvc.innerHTML = "000";
  }
}

cname.addEventListener("input", realTimeInputName);
cnumber.addEventListener("input", realTimeInputNumber);
cexp1.addEventListener("input", realTimeInputExp1);
cexp2.addEventListener("input", realTimeInputExp2);
ccvc.addEventListener("input", realTimeInputCvc);

function checkIsEmpty(input) {
  let status = false;
  input.nextElementSibling.innerHTML = "Can't be bank";
  if (input.value == "") {
    input.nextElementSibling.style.visibility = "visible";
    input.classList.add("invalidinput");
    status = false;
  } else {
    input.nextElementSibling.style.visibility = "hidden";
    input.classList.remove("invalidinput");
    status = true;
  }
  return status;
}

function checkemptyExp(input1, input2) {
  let status = false;
  input2.nextElementSibling.innerHTML = "Can't be bank";
  if (input1.value == "") {
    input2.nextElementSibling.style.visibility = "visible";
    input1.classList.add("invalidinput");
    status = false;
  } else {
    input2.nextElementSibling.style.visibility = "hidden";
    input1.classList.remove("invalidinput");
    status = true;
  }
  if (input2.value == "") {
    input2.nextElementSibling.style.visibility = "visible";
    input2.classList.add("invalidinput");
    status = false;
  } else {
    input2.nextElementSibling.style.visibility = "hidden";
    input2.classList.remove("invalidinput");
    status = true;
  }

  if (input2.value != "" && input1.value == "") {
    input2.nextElementSibling.style.visibility = "visible";
    status = false;
  }
  return status;
}
function checkvalidexp(input4, input5) {
  if (isNaN(input4) || isNaN(input5)) {
    return formatcheckexp(cexp1, cexp2);
  } else if (isFinite(Number(input4)) || isFinite(Number(input5))) {
    return checkemptyExp(cexp1, cexp2);
  }
}

function formatcheck(input) {
  let status = false;
  if (isNaN(input.value)) {
    input.nextElementSibling.innerHTML = "Wrong format, numbers only";
    input.nextElementSibling.style.visibility = "visible";
    input.classList.add("invalidinput");
    status = false;
  } else {
    input.nextElementSibling.style.visibility = "hidden";
    input.classList.remove("invalidinput");
    status = true;
  }
  return status;
}
function formatcheckexp(input1, input2) {
  let status = false;
  if (isNaN(input1.value)) {
    input2.nextElementSibling.innerHTML = "Wrong format, numbers only";
    input2.nextElementSibling.style.visibility = "visible";
    input1.classList.add("invalidinput");
    status = false;
  } else {
    input2.nextElementSibling.style.visibility = "hidden";
    input1.classList.remove("invalidinput");
    status = true;
  }
  if (isNaN(input2.value)) {
    input2.nextElementSibling.innerHTML = "Wrong format, numbers only";
    input2.nextElementSibling.style.visibility = "visible";
    input2.classList.add("invalidinput");
    status = false;
  }
  return status;
}
function formatchecknumber(input) {
  let actualip2 = input.value.split(" ").join("");
  let status = false;
  console.log(Number(actualip2));
  if (isNaN(Number(actualip2))) {
    input.nextElementSibling.innerHTML = "Wrong format, numbers only";
    input.nextElementSibling.style.visibility = "visible";
    input.classList.add("invalidinput");
    status = false;
  } else {
    input.nextElementSibling.style.visibility = "hidden";
    input.classList.remove("invalidinput");
    status = true;
  }
  return status;
}
function gosubmit() {
  cform.style.display = "none";
  ty.style.display = "block";
}
function returnsubmit() {
  cform.style.display = "block";
  ty.style.display = "none";
}
let ty = document.querySelector(".ty");
let cform = document.querySelector(".container");
let submit = document.getElementById("submit");

submit.onclick = (e) => {
  e.preventDefault();
  let statusallcorrect = false;
  let input2 = cnumber.value;
  let input3 = ccvc.value;
  let input4 = cexp1.value;
  let input5 = cexp2.value;
  statusallcorrect = checkIsEmpty(cname);
  statusallcorrect = checkIsEmpty(ccvc);
  statusallcorrect = checkIsEmpty(cnumber);
  if (input2 || input3) {
    statusallcorrect = formatcheck(ccvc);
    statusallcorrect = formatchecknumber(cnumber);
  }
  statusallcorrect = checkvalidexp(input4, input5);

  if (statusallcorrect) gosubmit();
};

let submitreturn = document.getElementById("submitreturn");
submitreturn.onclick = (e) => {
  e.preventDefault();
  returnsubmit();
};
