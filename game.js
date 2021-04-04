const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'Qual é o melhor amigo do Irmão do Jorel?',
    choice1: 'Marcinho',
    choice2: 'Billy Doidão',
    choice3: 'Pablito',
    choice4: 'Beto Cachinhos',
    answer: 1,
  },
  {
    question: 'No epsódio "Caçadores da Figurinha Perdida", qual é o nº da figurinha perdida?',
    choice1: '1',
    choice2: '100',
    choice3: '900',
    choice4: '9001',
    answer: 4,
  },
  {
    question: 'Qual o nome da escola onde o Irmão do Jorel estuda?',
    choice1: 'Elefante de Porcelana',
    choice2: 'Zazazila',
    choice3: 'Escolinha da Lola',
    choice4: 'Pônei Encantado',
    answer: 4,
  },
  {
    question: 'Qual o nome do episódio quê o Irmão do Jorel tenta gravar um vídeo com a ajuda de Nico e Lara?',
    choice1: 'Jornal do Jorel',
    choice2: 'Jornal do Irmão do Jorel',
    choice3: 'Jornal do Quintal',
    choice4: 'Jornal do pato',
    answer: 3,
  },
  {
    question: 'No episódio "Profissão Palhaço" o quê o Irmão do Jorel responde, quando a Professora Adelaide Pergunta para ele "O quê ele quer ser quando crescer"?',
    choice1: 'O Jorel',
    choice2: 'O namorado da Ana Catarina',
    choice3: 'Mais forte',
    choice4: 'Mais alto',
    answer: 4,
  },
  {
    question: 'No episódio "Meu segundo Amor", O Irmão do Jorel tem que encontrar quais anéis para poder se casar com a Ana Catarina?',
    choice1: 'O Anel Roxo do Destino, e o Anel Verde do Destino',
    choice2: 'O Anel Roxo do Destino, e o Anel Azul bebê Jujuba de Maçã Verde do Destino',
    choice3: 'O Anel Roxo do Destino, e o Anel Verde Abacate do Destino',
    choice4: 'Ele não precisa encontrar nenhum anel.',
    answer: 3,
  },
  {
    question: 'Qual é o nome do episódio em que o Irmão do Jorel não quer comer o mingau de Aveia?',
    choice1: 'O Poderosíssimo Mingau de Aveia',
    choice2: 'O Mingau de Aveia Recreativo',
    choice3: 'Uma Ódisseia no Planeta do Mingau',
    choice4: 'Uma Ódisseia no Espaço',
    answer: 4,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 50

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('../quiz/end.html')
  }

  questionCounter++
  progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
  
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startGame()