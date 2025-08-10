const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  guessLetter(letter) {
    if (this.correctLetters.includes(letter) || this.incorrectLetters.includes (letter)) return

    if(this.word.includes(letter)) {
      this.correctLetters.push(letter)

      let newDisplay = ""
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter || this.correctLetters.includes(this.word[i])) {
          newDisplay += this.word[i]
        } else {
          newDisplay += "_"
        }
      }
      this.displayWord = newDisplay
    } else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses--
    }
  }

updateScreen() {
  document.getElementById('remaining-guesses').textContent = this.remainingGuesses
  document.getElementById('incorrect-letters').textContent = this.incorrectLetters.join(', ')
  document.getElementById('word-to-guess').textContent = this.displayWord
}

isGameOver() {
  return this.remainingGuesses <= 0 || this.displayWord === this.word
}

getWinOrLoss() {
  if(this.word === this.displayWord && this.remainingGuesses > 0) {
    return 'win'
  } else if (this.remainingGuesses <= 0 && this.word !== this.displayWord) {
    return 'loss'
  }
  return null
}
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()