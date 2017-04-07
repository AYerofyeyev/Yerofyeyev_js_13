'use strict';

// Исходные данные: список вопросов и вариантов ответов, а также правильные ответы
var testlist = [
  {
    question: "Вопрос № 1"
  },
  {
    question: "Вопрос № 2"
  },
  {
    question: "Вопрос № 3"
  },
  {
    question: "Вопрос № 4"
  }
]

testlist[0].answers = ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3"];
testlist[0].correct = [2];

testlist[1].answers = ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3"];
testlist[1].correct = [2, 3];

testlist[2].answers = ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3"];
testlist[2].correct = [1];

testlist[3].answers = ["Вариант ответа № 1", "Вариант ответа № 2"];
testlist[3].correct = [1];

// преобразование и запись в localStorage

console.log(testlist);

var pack = JSON.stringify(testlist);

console.log(pack);

localStorage["test"] = pack;

// получение данных из localStorage и преобразование

var read = localStorage.getItem("test");

var revive = JSON.parse(read)

console.log(revive);

// Объявление переменных

var qaItem = [];
var checkbox = [];
var paragraph = [];
var check = [];
var a = [];

// Создание DOM элементов

var wrapper = document.createElement("form");
wrapper.className = "pure-form-stacked";
wrapper.style.padding = "50px";

var header = document.createElement("h1");
header.innerHTML = "Тест по программированию";
header.style.margin = "0 0 50px 0";
header.style.textAlign = "center";

var submitButton = document.createElement("input");
submitButton.type = "button";
submitButton.className = "pure-button pure-button-primary";
submitButton.value = "Проверить мои результаты";
submitButton.style.margin = "50px 0 0 0";
submitButton.addEventListener("click", revision);

// Функция сбора ответов и проверка на соответствие правильным

function revision() {
  var allAnswers = document.forms[0];

  for (i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].checked) {
          check.push(allAnswers[i].name);
        }
    }
  console.log(check);
  revive.forEach( function(correct, i) {
    revive[i].correct.forEach( function (item, j, correct) {
      a.push("a" + i + (+item - 1));
    })
  })
  console.log(a);
  // Проверка ответов
  if (check.join(",") === a.join(",")) {
    alert("Молодец!");
    location.reload()
    return;
  }
  alert("Тест не пройден");
  location.reload()
  return;
};

// Функция обнуления

// function

// Помещение элемнтов на страницу

document.body.appendChild(wrapper);
wrapper.appendChild(header);

for (var i = 0; i < revive.length; i++) {
  qaItem[i] = document.createElement("h2");
  qaItem[i].innerHTML = ((i+1) + ". " + revive[i].question);

  wrapper.appendChild(qaItem[i]);

  revive[i].answers.forEach(function(item, j, answers) {
    paragraph[j] = document.createElement("p");
    var text = document.createTextNode(item);

    checkbox[j] = document.createElement("input");
    checkbox[j].type = "checkbox";
    checkbox[j].name = "a" + i + j;
    checkbox[j].className = "pure-checkbox";
    checkbox[j].style.margin = "10px 10px 10px 0";

    wrapper.appendChild(paragraph[j]);
    paragraph[j].appendChild(checkbox[j]);
    paragraph[j].appendChild(text);
  });
}

wrapper.appendChild(submitButton);
