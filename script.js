//
//script.js
//Created by Valerij Dimitriev
//
//on 2021.11.29

var EnglishTest = {};
EnglishTest.startButton = document.getElementById('startbutton');
EnglishTest.translation = document.getElementById('translation');
EnglishTest.canvas = document.getElementById('canvas');
EnglishTest.submit = document.getElementById('submitButton');
EnglishTest.tracker = document.getElementById('tracker');
EnglishTest.ctx = EnglishTest.canvas.getContext("2d");
EnglishTest.complicityCheck = $('div.radioBtn');

EnglishTest.startButton = $('#startbutton').show();
EnglishTest.translation = $('#translation').hide();
EnglishTest.submit = $('#submitButton').hide();
EnglishTest.tracker = $('div.tracker').hide();
EnglishTest.ctx.font = "20px serif";
EnglishTest.ctx.fillText("Тут будут слова для перевода", 40,100);
EnglishTest.countCorrect = 0;
EnglishTest.countIncrorrect = 0;
EnglishTest.correctAnsw = $('#correctAnsw');
EnglishTest.incorrectAnsw = $('#incorrectAnsw');
EnglishTest.easyLevel = $('#easy');
EnglishTest.mediumLevel = $('#medium');
EnglishTest.hardLevel = $('#hard');
var wordsEasy = ['Terrible','Nasty','Cold','Pain','Busy','Whole','Mention','Lessons','Persuade','Pretend'];
var wordsEasyTranslations = ['Ужасно','Противный','Холодно','Боль','Занят','Целый','Упомянуть','Уроки','Убедить','Притворяться'];
var wordsMedium = ['Addiction', 'Agriculture', 'Approve', 'Contemptuous', 'Crawl', 'Descend', 'Dissolve', 'Embarrassment', 'Humiliate', 'Landlord'];
var wordsMediumTranslations = ['Зависимость','Колхоз','Одобрять','Презрительный','Ползать','Спускаться','Разрушать','Затруденение','Унижать','Землевладелец'];
var wordsHard = ['absolution','affable','headstrong','placid','reprieve','resolution','remuneration','enhance','enshroud','hamper'];
var wordsHardTranslations = ['Освобождение','Приветливый','Своевольный','Безмятежный','Передышка','Решительность','Вознаграждение','Усиливать','Закутывать','Препятствовать'];
EnglishTest.currentPosition = $('#currentPosition');
const random = Math.floor(Math.random() * wordsEasy.length);
var index = 0;
var wordSelected = "";
var wordSelectedTranslation = "";
EnglishTest.level = -1;

var startTest = function(){
    EnglishTest.translation.show();
    EnglishTest.submit.show();
    EnglishTest.tracker.show();
    EnglishTest.startButton.hide();
    EnglishTest.complicityCheck.hide();
    console.log(EnglishTest.easyLevel.is(":checked"));
    console.log(EnglishTest.mediumLevel.is(":checked"));
    console.log(EnglishTest.hardLevel.is(":checked"));
    if(EnglishTest.easyLevel.is(":checked") == true){
        goForwardEasy();
        EnglishTest.level=0;
    } else if(EnglishTest.mediumLevel.is(":checked") == true){
        goForwardMedium();
        EnglishTest.level=1;
    }
    else if(EnglishTest.hardLevel.is(":checked") == true){
        goForwardHard();
        EnglishTest.level=2;
    }
}

var isEnd = function(){
    console.log(EnglishTest.level, wordsEasy.length);
    if (EnglishTest.level==0 && wordsEasy.length==0){
        return true;
    } else if (EnglishTest.level==1 && wordsMedium.length==0){
        return true;
    }else if (EnglishTest.level==2 && wordsHard.length==0){
        return true;
    }
    return false;
}

var SubmitAndChange = function(){
    if(EnglishTest.translation.val().length == 0){
        alert("Введите что-то");
        return;
    }
    if(correct()){
        EnglishTest.countCorrect +=1;
        console.log("верно")
    }
    else{
        EnglishTest.countIncrorrect +=1;
    }
    updateStatus();
    if(isEnd()){
        var result = "";
        if(EnglishTest.countCorrect<1){
            result = "Полный ноль! Ужас! Кошмар!"
        }
        else if(EnglishTest.countCorrect<2){
            result = "Плоховато."
        }
        else if(EnglishTest.countCorrect<3){
            result = "Натянутая 3-ка."
        }
        else if(EnglishTest.countCorrect<5){
            result = "Удовлетворительно."
        }
        else if(EnglishTest.countCorrect<7){
            result = "Хорошо!"
        }
        else if(EnglishTest.countCorrect<8){
            result = "Отлично!"
        }
        else{
            result = "Вы лучший"
        }
        alert(`Квест окончен с результатом: ${EnglishTest.countCorrect}/10. Ваш уровень английского: ${result}`);
        location.reload();
        
    }
    console.log(EnglishTest.level);
    if (EnglishTest.level==0){
        goForwardEasy();
    } else if (EnglishTest.level==1){
        goForwardMedium();
    }else if (EnglishTest.level==2){
        goForwardHard();
    }
}



var goForwardEasy = function(){

    index = Math.floor(Math.random()*wordsEasy.length);
    wordSelected = wordsEasy[index];
    wordSelectedTranslation = wordsEasyTranslations[index];
    EnglishTest.ctx.clearRect(30,30, EnglishTest.canvas.width, EnglishTest.canvas.height);
    EnglishTest.ctx.fillText(wordSelected, 40,100);
    wordsEasy.splice(index, 1);
    wordsEasyTranslations.splice(index, 1);
    
}

var goForwardMedium = function(){

    index = Math.floor(Math.random()*wordsMedium.length);
    wordSelected = wordsMedium[index];
    wordSelectedTranslation = wordsMediumTranslations[index];
    EnglishTest.ctx.clearRect(30,30, EnglishTest.canvas.width, EnglishTest.canvas.height);
    EnglishTest.ctx.fillText(wordSelected, 40,100);
    wordsMedium.splice(index, 1);
    wordsMediumTranslations.splice(index, 1);
}

var goForwardHard = function(){
    console.log("sad");
    index = Math.floor(Math.random()*wordsHard.length);
    wordSelected = wordsHard[index];
    wordSelectedTranslation = wordsHardTranslations[index];
    EnglishTest.ctx.clearRect(30,30, EnglishTest.canvas.width, EnglishTest.canvas.height);
    EnglishTest.ctx.fillText(wordSelected, 40,100);
    wordsHard.splice(index, 1);
    wordsHardTranslations.splice(index, 1);
}

var correct = function(){
    console.log(EnglishTest.translation.val(),wordSelectedTranslation);
    if(EnglishTest.translation.val() == wordSelectedTranslation){
        return true;
    }
    return false;
}

var updateStatus = function(){
    EnglishTest.currentPosition.text(EnglishTest.countCorrect+ EnglishTest.countIncrorrect);
    EnglishTest.correctAnsw.text(EnglishTest.countCorrect);
    EnglishTest.incorrectAnsw.text(EnglishTest.countIncrorrect);
}
