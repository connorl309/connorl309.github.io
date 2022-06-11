function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
    Kanji
    Unicode code points regex: [\x3400-\x4DB5\x4E00-\x9FCB\xF900-\xFA6A]    
    */
function scuffed() {
  var choice = Math.ceil(Math.random() * 3);
  if (choice === 1) {
    return String.fromCharCode(getRandomInt(0x3400, 0x4db5));
  } else if (choice === 2) {
    return String.fromCharCode(getRandomInt(0x4e00, 0x9fcb));
  } else {
    return String.fromCharCode(getRandomInt(0xf900, 0xfa6a));
  }
}

async function generator() {
  var kanjiField = document.getElementById("kanji_field");
  var result;
  var loop = true;

  // this is so scuffed
  const proxyURL = 'https://corsanywhere.herokuapp.com/';
  while(loop) {
    result = scuffed();
    await fetch(proxyURL + "https://jisho.org/api/v1/search/words?keyword="+result)
        .then(response => response.json())
        .then((json) => {
            if (json.data.length != 0) { loop = false; }
        });
  }
  console.log("Valid kanji " + result);
  kanjiField.innerHTML = result;
}
