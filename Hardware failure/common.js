 function initElement() {
  const p = document.getElementById("button");
  p.onclick = giveMeResult;
};

function giveMeResult(){
  const m = +(document.getElementById("one").value);
  const n = +(document.getElementById("two").value);
  const c = +(document.getElementById("three").value);
  const x = +(document.getElementById("four").value);
  const k = x / 100;
  let j = 1;
  if (k > 0 && k < 1) {
    j = Math.log(0.01) / Math.log(k);
  }
  if (isNaN(m) || isNaN(n) || isNaN(c) || isNaN(x) || k < 0 || k >= 1 || m == "" || n == "" || c == "") {
  document.getElementById("result").textContent = "Введите корректные данные";
  } else {
  document.getElementById("result").textContent =  Math.ceil(Math.ceil(n * j) * c / m);
  }
}
  
//m - количество часов на задачу, n - количество часов на конвертирования в нужный форма, c - количество форматов, x - вероятность ошибки
