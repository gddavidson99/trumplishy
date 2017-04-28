$(function() {

  /* TRANSLATE WHEN 'TRUMPLISH-IT' IS CLICKED
  =========================================================================================== */
  $('#translate').click(function() {

    $('#final-text').empty();

      if ($('#sentence').val() == "") {

        $('<h1>' + 'Please enter a sentence.' + '</h1>').appendTo('#final-text');

      }
      else {

        translate();

      }

      return false;

  });

  /* TRANSLATE WHEN ENTER IS PRESSED
  =========================================================================================== */
  $('#sentence').keydown(function(e) {

    if (e.which == 13) {

      e.preventDefault();

      $('#final-text').empty();

      if ($('#sentence').val() == "") {

        $('<h1>' + 'Please enter a sentence.' + '</h1>').appendTo('#final-text');

      }
      else {

        translate();

      }

    }

  });

  /* SELECT ALL TEXT IN <TEXTAREA> WHEN CLICKED
  =========================================================================================== */
  $("#sentence").focus(function() {

    var $this = $(this);
    $this.select();

    $this.mouseup(function() {

        $this.unbind("mouseup");
        return false;

    });

  });

  /* MAIN FUNCTIONALITY -- THIS IS WHERE (TRUMP) TRANSLATION HAPPENS
  =========================================================================================== */
  function translate() {

    $('#final-text').empty();

    /* VARIABLES
    ========================================================================================= */
    var original = $('#sentence').val();
    var sentenceArray = original.split(" ");
    var trumpDictionary = {};
    var newArray = [];
    var replacementMade = false;
    var connotationCount = 0;
    var connotationWord = 0;
    var fakeNews = false;

    /* =======================================================================================
       ====================================================================================== */

    /* TRUMP DEFINITIONS
    ========================================================================================= */

    /* CONNOTATION - VALUES
    =========================================================================================

       0  --->  NO CONNOTATION
       1  --->  BAD CONNOTATION
       2  --->  GOOD CONNOTATION
       3  --->  FAKE NEWS

    ==========================================================================================
    */

    trumpDictionary.love = ["absolutely love", 2];
    trumpDictionary.good = ["fantastic", 2];
    trumpDictionary.hillary = ["Crooked Hillary", 1];
    trumpDictionary.putin = ["my friend, Vlad", 0];
    trumpDictionary.russia = ["my friends in Russia", 0];
    trumpDictionary.big = ["yuge", 0];
    trumpDictionary.huge = ["yuge", 0];
    trumpDictionary.giant = ["massive", 0];
    trumpDictionary.large = ["massive", 0];
    trumpDictionary.enormous = ["yuge", 0];
    trumpDictionary.china = ["Ghina", 0];
    trumpDictionary.bad = ["horrible", 1];
    trumpDictionary.amazing = ["tremendous", 2];
    trumpDictionary.caucus = ["freedom causus", 0];
    trumpDictionary.failed = ["disgraced", 1];
    trumpDictionary.failure = ["disgrace", 1];
    trumpDictionary.years = ["solid years, bigly", 0];
    trumpDictionary.country = ["great country", 2];
    trumpDictionary.media = ["FAKE NEWS", 3];
    trumpDictionary.news = ["FAKE NEWS", 3];
    trumpDictionary.cnn = ["FAKE NEWS", 3];
    trumpDictionary.buzzfeed = ["FAKE NEWS", 3];
    trumpDictionary.obamacare = ["awful Obamacare", 1];
    trumpDictionary.people = ["PEOPLE", 0];
    trumpDictionary.attack = ["terrorist attack", 0];
    trumpDictionary.working = ["working hard", 0];
    trumpDictionary.war = ["massive war", 0];
    trumpDictionary.took = ["grabbed", 0];
    trumpDictionary.hate = ["hate", 1];
    trumpDictionary.protests = ["hateful protests", 1];
    trumpDictionary.melania = ["my sweet Melania", 2];
    trumpDictionary.ivanka = ["Ivanka (who is gorgeous, might I add)", 2];
    trumpDictionary.administration = ["Empire", 2];
    trumpDictionary.like = ["like", 2];
    trumpDictionary.enjoy = ["really enjoy, and I mean it,", 2];

    trumpDictionary.ending_Sad = "Sad!";
    trumpDictionary.ending_Good = "Tremendous!";
    trumpDictionary.ending_News = "Fake news is the enemy of the American people!";

    /* =======================================================================================
    ========================================================================================= */

    /* PSEUDOCODE -- MAIN PROCESS

      --- MAIN PROCESS ---
      1. Split sentence into seperate words in array using the native .split() method.
      2. Go through each word in array and check against every word in the trumpDictionary.
      3. If the word in the array matches what is in the dictionary, then it will put the replaced word into a new array.
      4. If that word is punctuated, the punctuation will not be included in the replacement.
      5. If a replacement has been made, the loop is broken out of.
      6. If a replacement cannot be made, then the original word is added to the array.
      7. Finally, the final array is put together into a String and added to the layout.

      --- OTHER FEATURES ---
      1. Replacement    -  Replace "Trump-Trigger" words with the language that Trump would use.
      2. Connotation    -  Detect connotation and wording of sentence and add endings depending on sentence's connotation.
      3. Capitalization -  Code is structured to change capital letters to properly display sentence.

      --- TO-DO ---
      1. Fix start of sentence with lowercase.
      2. Add more words.

    */

    /* PROGRAM'S MAIN LOOP -- GREG DAVIDSON SEGMENT
    ========================================================================================= */
    for (var i = 0; i < sentenceArray.length; i++) {

      for (key in trumpDictionary) {

        var value = trumpDictionary[key];

        if (sentenceArray[i].includes(key) || (sentenceArray[i].toLowerCase()).includes(key)) {

          if (sentenceArray[i].length > key.length) {

            newArray.push(sentenceArray[i].replace(sentenceArray[i].substring(0, key.length), value[0]));

          }
          else {

            newArray.push(sentenceArray[i].replace(sentenceArray[i], value[0]));

          }

          replacementMade = true;

          if (value[1] == 3) {

            fakeNews = true;
            connotationWord += 1;

          }
          else {

            connotationCount += value[1];

            if (value[1] != 0) {

              connotationWord += 1;

            }

          }

          break;

        }

      }

      if (!replacementMade) {

        newArray.push(sentenceArray[i]);

      }

      replacementMade = false;

    }

    /* =======================================================================================
       ====================================================================================== */

    /* CONNOTATION - PROCESS -- GREG DAVIDSON SEGMENT
    ========================================================================================= */
    if (fakeNews) {

      newArray.push(trumpDictionary.ending_News);

    }
    else {

      if (connotationWord > 0) {

        var connotationAverage = connotationCount / connotationWord;

        if (connotationAverage > 1.5) {

          newArray.push(trumpDictionary.ending_Good);

        }
        else {

          newArray.push(trumpDictionary.ending_Sad);

        }

      }

    }

    /* =======================================================================================
       ====================================================================================== */

    /* PUT TOGETHER AND DISPLAY FINAL STRING -- POOJA KOTAK SEGMENT
    ========================================================================================= */
    var finalString = "";

    var firstWord = newArray[0].split(' ');
    finalString += "<span class=\"cap\">" + firstWord[0] + "</span> ";

    /* === ONLY FOR FIRST WORD === */
    for (var i = 1; i < firstWord.length; i++) {

      finalString += firstWord[i] + " ";

    }

    if (newArray.length > 1) {

      finalString += newArray[1] + " ";

      /* === FOR ALL OTHER WORDS === */
      for (var i = 2; i < newArray.length; i++) {

        if (newArray[i - 1].substring(newArray[i - 1].length - 1, newArray[i - 1].length) == '.' ) {

          var word = newArray[i].split(' ');
          finalString += "<span class=\"cap\">" + word[0] + "</span> ";

          for (var j = 1; j < word.length; j++) {

            finalString += word[j] + " ";

          }

        }
        else if (newArray[i - 1].substring(newArray[i - 1].length - 1, newArray[i - 1].length) == '!' ) {

          var word = newArray[i].split(' ');
          finalString += "<span class=\"cap\">" + word[0] + "</span> ";

          for (var j = 1; j < word.length; j++) {

            finalString += word[j] + " ";

          }

        }
        else if (newArray[i - 1].substring(newArray[i - 1].length - 1, newArray[i - 1].length) == '?' ) {

          var word = newArray[i].split(' ');
          finalString += "<span class=\"cap\">" + word[0] + "</span> ";

          for (var j = 1; j < word.length; j++) {

            finalString += word[j] + " ";

          }

        }
        else {

          finalString += newArray[i] + " ";

        }
      }

    }

    $('<h1>' + finalString + '</h1>').appendTo('#final-text');

  }

});
