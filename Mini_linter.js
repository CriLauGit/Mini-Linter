let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

let overusedWords = ['really', 'very', 'basically'];

let unnecessaryWords = ['extremely', 'literally', 'actually' ];

// Splits the story into an array of words includimg the nearby punctuation signs
const storyWords = story.split(' '||'.'||'!'||','||'-');

//a list of words in the text, with no duplicates
let wordList=removeDuplicates(storyWords); 

/**
* @description
* Removes a list of unnecessary words from the
* array containing the words of the string
* @param {array} storyWords
* @return {array}
*/
const betterWords = storyWords.filter(word => !unnecessaryWords.includes(word));

/**
* @description
* Returns the number of times a word occurs in 
* the array containing the story words
* @param {array} storyWords
* @param {string} word
* @return {integer} num
*/
const howManyTimes = (storyWords, word) => {
  let num = 0;
  storyWords.forEach(wordInArray => wordInArray === word && num++);
  return num;
}

/**
* @description
* Counts the occurences of each word included in
* the 'overusedWords' array in the given 'story'
* and displays the result in the console
* @param {array} overusedWords, storyWords
*/
function numberOfOverusedWords (overusedWords, storyWords) {
  overusedWords.forEach((word,i) => {
    let numTimes = howManyTimes(storyWords, overusedWords[i]);
    console.log('The word: ' + overusedWords[i] + ' was used ' + numTimes + ' times.');
  })
}  

/**
* @description
* Returns the number of sentences in a text, by
* counting the punctuation signs '.' or '!' at
* the end of each word
* @param {array} storyWords
* @return {integer} numSentences
*/
const howManySentences = storyWords => {
  let numSentences = 0;
  storyWords.forEach(word => (word[word.length - 1] === '.' || word[word.length - 1] === '!') && numSentences ++);
  return numSentences;
}

/**
* @description
* Removes a list of overused words from the
* array containing the words of the string
* @param {array} betterWords
* @return {array}
*/
const noOverused = betterWords.filter(word => !overusedWords.includes(word));

/**
* @description
* Removes duplicates from an array
* @param {array} 
* @return {array} 
*/
function removeDuplicates (array) {
  let noDuplicates = [];
  array.forEach(item => 
  !noDuplicates.includes(item) && noDuplicates.push(item));
  return noDuplicates;
}

/**
* @description
* Returns an array containing the number of
* occurences of each word in the 'wordList' in
* the 'storyWords' array
* @param {array} wordList, storyWords
* @return {array} 
*/
let numTimesWords = (wordList, storyWords) => {
  let numTimes = [];
  wordList.forEach((word, index) => numTimes[index] = howManyTimes(storyWords, wordList[index]))
  return numTimes;  
}

/**
* @description
* Finds and ranks the number of 
* occurences of the words used in the text.
* Displays to the console the words that are 
* most/second/etc most used by finding the
* indexes of the words in the wordList 
* corresponding to the number of occurences in 
* the wordList
* @param {array} storyWords
* @param {number} position
*/
function findMostUsed (storyWords, rank) {
  let indexesOfWordInWordList = [], index =0, currentIndex = 0;
  let noOccurencesOfWordInWordList = numTimesWords(wordList, storyWords);

  let noOccurencesForEachWordInRank = removeDuplicates(noOccurencesOfWordInWordList).sort((a, b) => b-a);
  if (rank > noOccurencesForEachWordInRank.length) {
    console.log("The position must be between 1 and " + noOccurencesForEachWordInRank.length);
  }
  else {
  let numberOfOccurences = noOccurencesForEachWordInRank[rank-1];
  
  do {
    currentIndex=noOccurencesOfWordInWordList.indexOf(numberOfOccurences, index);
  
    indexesOfWordInWordList.push(currentIndex);
    index=currentIndex+1;
  } while (index<noOccurencesOfWordInWordList.length && noOccurencesOfWordInWordList.indexOf(numberOfOccurences, index)!==-1); 
  
  }
  
  //display the results to the console
  console.log(rank===1? `The most used word/words in the story is/are: ` : rank===2? `The second most used word/words in the story is/are: ` : rank===3? `The third most used word/words in the story is/are: ` : `The ${rank}th most used word/words in the story is/are: `);
  for(let i=0; i<=indexesOfWordInWordList.length-1; i++) {console.log(wordList[indexesOfWordInWordList[i]]);}
}

/**
* @description
* Returns the index of the maximum value of an
* array of numbers 
* @param {numberArray} 
* @return {integer} index 
*/
function findMax(NumberArray) {
  let max = 0, index = -1;
  NumberArray.forEach((number, i) => (number>=max) && (max=number, index = i))
  return index;
}

/**
* @description
* Create copies of the arrays 'wordList' and
* 'numTimesWords' in order to remove the most
* used word and it's correspondent number of
* occurences from 'numTimesWords'and find the
* second most used word
* @param {array} wordList, storyWords
* @return {string} 
*/
function findSecondMax (wordList, storyWords) {
  let numTimesWordsCopy = numTimesWords(wordList, storyWords).slice();
  let wordListCopy = wordList.slice();
  numTimesWordsCopy.splice(findMax(numTimesWords(wordList, storyWords)),1);
  wordListCopy.splice(findMax(numTimesWords(wordList, storyWords)),1);
  return wordListCopy[findMax(numTimesWordsCopy)];
}

/**
* @description
* Replaces a word in the 'story' and returns the
* updated 'story'
* @param {string} wordToBeReplaced, wordToReplace
* @param {array} storyWords
* @return {string} 

function replaceWord (wordToBeReplaced, wordToReplace, storyWords) {
  let newStory = [];
storyWords.forEach((word,i) => word === wordToBeReplaced ? newStory[i] = wordToReplace : newStory[i] = word)  
return newStory.join(" ");}
*/
const storyWithReplacedWord = ((wordToBeReplaced, wordToReplace, storyWords) => storyWords.map(word => word === wordToBeReplaced ? wordToReplace :  word).join(' '));

/**
* @description
* displays the results to the console if the story is at least a sentence long
*/
function displayResults() {
  if (!story.includes("."||"!")) {console.log("Please insert at text of at least a sentence long.")}
  else {
  console.log("The word count of the original story is " + storyWords.length + '.');
  console.log("The length of the text without the unnecessary words is " + betterWords.length + '.');
  numberOfOverusedWords(overusedWords, storyWords);
  console.log("The text contains " + howManySentences(storyWords) + " sentences.");
  console.log("The text contains " + wordList.length + " words.");
  console.log("The most used word is " + '"' + wordList[findMax(numTimesWords(wordList, storyWords))] + '".');
  console.log("The second most used word is " + '"' + findSecondMax(wordList, storyWords) + '".');
  console.log("The story with the word 'really' replaced with 'quite': " + storyWithReplacedWord('really', 'quite', storyWords));}
  findMostUsed(storyWords, 5);
}
displayResults();