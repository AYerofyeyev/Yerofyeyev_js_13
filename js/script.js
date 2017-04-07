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
  }
]

testlist[0].answers = ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3"];
testlist[0].correct = [2];

testlist[1].answers = ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3"];
testlist[1].correct = [2, 3];

testlist[2].answers = ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3"];
testlist[2].correct = [1];

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
var result = "";

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

// Создание модального окна

var modalWrapper = document.createElement("div");
modalWrapper.style.background = "rgba(0,0,0,.25)";
modalWrapper.style.position = "absolute";
modalWrapper.style.height = "100%";
modalWrapper.style.width = "100%";

var modal = document.createElement("aside");
modal.id = "modal";
modal.style.left = "25%";
modal.style.background = "#fff";
modal.style.margin = "-250px 0 0 -40px";
modal.style.position = "absolute";
modal.style.padding = "20px 200px";
modal.style.top = "60%";
modal.style.borderRadius = "5px";
modal.style.boxShadow = "0 3px 7px rgba(0,0,0,.50)";
modal.style.boxSizing = "border-box";

var modalHeader = document.createElement("h2");

var modalButton = document.createElement("input");
modalButton.type = "button";
modalButton.className = "pure-button";
modalButton.value = "Закрыть";
modalButton.addEventListener("click", zeroed);

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
    result = "Молодец!";
    popUp();
    return;
  }
  result = "Тест не пройден";
  popUp();
  return;
};

//Функция появления всплывающего окна

function popUp(){
  modalHeader.innerHTML = result;
  document.body.insertBefore(modalWrapper, wrapper);
  modalWrapper.appendChild(modal);
  modal.appendChild(modalHeader);
  modal.appendChild(modalButton);
};

// Функция обновления страницы

function zeroed(){
  location.reload();
};

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
