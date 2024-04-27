// Array of audio file sources and their corresponding correct answers
const audioData = [
    { src: 'buchfink.mp3', answer: 'Buchfink' },
    { src: 'girlitz.mp3', answer: 'Girlitz' },
    { src: 'goldammer.mp3', answer: 'Goldammer' },
    { src: 'grünfink.mp3', answer: 'Grünfink' },
    { src: 'mauersegler.mp3', answer: 'Mauersegler' },
    { src: 'ringeltaube.mp3', answer: 'Ringeltaube' },
    { src: 'Türkentaube.mp3', answer: 'Türkentaube' }
    // Add more audio files and their answers here
];



// Initialize a list to keep track of which audio files have been played
let playedIndices = [];

// Select elements from the DOM
const audioPlayer = document.getElementById('audioPlayer');
const answerInput = document.getElementById('answerInput');
const submitButton = document.getElementById('submitButton');
const feedback = document.getElementById('feedback');

// Function to randomly select an audio file that hasn't been played yet
function chooseRandomAudio() {
    if (playedIndices.length === audioData.length) {
        // All audio files have been played, so the quiz is complete
        feedback.textContent = 'Alle Vögel gelernt!';
        feedback.classList.remove('incorrect');
        feedback.classList.add('correct');
        return;
    }

    let randomIndex;

    // Choose a random audio file that hasn't been played yet
    do {
        randomIndex = Math.floor(Math.random() * audioData.length);
    } while (playedIndices.includes(randomIndex));

    // Mark the chosen audio file as played
    playedIndices.push(randomIndex);

    // Set the chosen audio file as the source of the audio player
    const chosenAudio = audioData[randomIndex];
    audioPlayer.src = chosenAudio.src;
    // Store the correct answer for later use
    audioPlayer.dataset.correctAnswer = chosenAudio.answer;
}

// Event listener for the submit button
submitButton.addEventListener('click', function() {
    // Get the user's answer and the correct answer
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = audioPlayer.dataset.correctAnswer.toLowerCase();
    console.log(correctAnswer);

    // Check if the user's answer is correct
    if (userAnswer === correctAnswer) {
        feedback.textContent = 'Richtig!';
        feedback.classList.remove('incorrect');
        feedback.classList.add('correct');
        // Clear the input field
        answerInput.value = '';
        // Choose a new random audio file
        chooseRandomAudio();
    } else {
        feedback.textContent = 'Falsch';
        feedback.classList.remove('correct');
        feedback.classList.add('incorrect');
    }
});

// Choose a random audio file when the page loads
chooseRandomAudio();
