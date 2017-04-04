'use strict';

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
testlist[1].correct = [2,3];

testlist[2].answers = ["Вариант ответа № 1", "Вариант ответа № 2", "Вариант ответа № 3"];
testlist[2].correct = [1];

testlist[3].answers = ["Вариант ответа № 1", "Вариант ответа № 2"];
testlist[3].correct = [1];



console.log(testlist);

var a = JSON.stringify(testlist);

console.log(a);

localStorage["test"] = a;

var b = localStorage.getItem("test");

var c = JSON.parse(b)

console.log(c);

var qaItem = [];
var checkbox = [];
var paragraph = [];

var wrapper = document.createElement("form");
wrapper.className = "pure-form-stacked";
wrapper.style.padding = "50px";

var header = document.createElement("h1");
header.innerHTML = "Тест по программированию";
header.style.margin = "0 0 50px 0";
header.style.textAlign = "center";

var submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.className = "pure-button pure-button-primary";
submitButton.innerHTML = "Проверить мои результаты";
submitButton.style.margin = "50px 0 0 0";
submitButton.addEventListener("click", revision);


function revision() {

};



document.body.appendChild(wrapper);
wrapper.appendChild(header);

for (var i = 0; i < c.length; i++) {
  qaItem[i] = document.createElement("h1");
  qaItem[i].innerHTML = ((i+1) + ". " + c[i].question + "\n");

  wrapper.appendChild(qaItem[i]);

  c[i].answers.forEach(function(item, j, answers) {
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
