// scripts here:
document.write("<button onclick = \"timer()\">Start</button>" );
// var startBtn = document.getElementById('startBtn');
// startBtn.style.display = 'none';

var countDownDate = new Date().getTime()+112500

// Update the count down every 1 second
var x = setInterval(function() {
  
  // Get todays date and time
  var now = new Date().getTime();
  
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  
  // If the count down is over, write some text
  if (distance < 0) {
    submitQuiz();
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);

function submitQuiz() {
  console.log('submitted');

// get each answer score
  function answerScore (qName) {
    var radiosNo = document.getElementsByName(qName);

    for (var i = 0, length = radiosNo.length; i < length; i++) {
        if (radiosNo[i].checked) {
    // do something with radiosNo
        var answerValue = Number(radiosNo[i].value);
      }
    }
    // change NaNs to zero
    if (isNaN(answerValue)) {
      answerValue = 0;
    }
    return answerValue;
  }

// calc score with answerScore function
  var calcScore = (answerScore('q1') + answerScore('q2') + answerScore('q3') + answerScore('q4'));
  console.log("CalcScore: " + calcScore); // it works!

// function to return correct answer string
  function correctAnswer (correctStringNo, qNumber) {
    console.log("qNumber: " + qNumber);  // logs 1,2,3,4 after called below
    return ("The correct answer for question #" + qNumber + ": &nbsp;<strong>" +
      (document.getElementById(correctStringNo).innerHTML) + "</strong>");
    }

// print correct answers only if wrong (calls correctAnswer function)
  if (answerScore('q1') === 0) {
    document.getElementById('correctAnswer1').innerHTML = correctAnswer('correctString1', 1);
  }
  if (answerScore('q2') === 0) {
    document.getElementById('correctAnswer2').innerHTML = correctAnswer('correctString2', 2);
  }
  if (answerScore('q3') === 0) {
    document.getElementById('correctAnswer3').innerHTML = correctAnswer('correctString3', 3);
  }
  if (answerScore('q4') === 0) {
    document.getElementById('correctAnswer4').innerHTML = correctAnswer('correctString4', 4);
  }

// calculate "possible score" integer
  var questionCountArray = document.getElementsByClassName('question');

  var questionCounter = 0;
  for (var i = 0, length = questionCountArray.length; i < length; i++) {
    questionCounter++;
  }

// show score as "score/possible score"
  var showScore = "Your Score: " + calcScore +"/" + questionCounter;
// if 4/4, "perfect score!"
  if (calcScore === questionCounter) {
    showScore = showScore + "&nbsp; <strong>Perfect Score!</strong>"
  };
  document.getElementById('userScore').innerHTML = showScore;
}

$(document).ready(function() {

$('#submitButton').click(function() {
  $(this).addClass('hide');
});

});
