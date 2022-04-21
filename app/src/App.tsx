import React from 'react';
import './App.css';
import { useState } from 'react';
import * as Tone from 'tone'
import { Box } from './components/Box'
import { makePrettyColors } from './SmartStuff'

interface AppProps { }

const aLL_nOTES = [
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"
] as const;
type NoteTuple = typeof aLL_nOTES; // readonly ['hearts', 'diamonds', 'spades', 'clubs']
type Note = NoteTuple[number];  // "hearts" | "diamonds" | "spades" | "clubs"

function App({ }: AppProps) {

  const targetSong: Array<[Note, number]> = [["B4",.3], ["A4",.3],["G4",.6],["B4",.3], ["A4",.3],["G4",.6],["B4",.3],["A4",.3],["G4",.6]] // hot cross buns
  const synth = new Tone.Synth().toDestination();

  //this is target song but just the notes
  const simplify = targetSong.map(current => current[0])
  
  const [words, setWords] = useState("")
  const [currentGuess, setCurrentGuess] = useState<string[]>([])
  const [previousGuessesUwU, setPreviousGuessesOwO] = useState<string[][]>([])
  const [previousGuessColorsOwO, setPreviousGuessColorsUwU] = useState<string[][]>([])

  function playNote(value: string) {
    synth.triggerAttackRelease(value, "4n", Tone.now());
  }

  function playAllNotes(notesArr: string[]){
    const now = Tone.now()
    var sum = 0
    for(let i = 0; i < notesArr.length; i++){
      synth.triggerAttackRelease(notesArr[i], targetSong[i][1], now + sum)
      sum = sum + targetSong[i][1]
    } 
  }

  function handleChange(value: string) {
    playNote(value)
    const guessedNotes = currentGuess.slice()
    guessedNotes.push(value)
    setCurrentGuess(guessedNotes)
  }

  function removeNote() {
    const notes = currentGuess.slice()
    notes.pop()
    setCurrentGuess(notes)
  }

  function removeAllNotes() {
    setCurrentGuess([])
  }

  function handleSubmit() {
    setPreviousGuessesOwO(prev => {return prev.concat([currentGuess])})
    setPreviousGuessColorsUwU(prev => prev.concat([makePrettyColors(simplify, currentGuess)]))
    removeAllNotes()
  }

  return (
    <div className="App">
      <div>
        {previousGuessesUwU.map((guess,i) => {
          return <Box guess={guess} color={previousGuessColorsOwO[i]}/>
        })}
      </div>
      <p><button onClick={()=> playAllNotes(currentGuess)}>Play</button> {currentGuess.join(", ")} </p>
      <input
        type="text"
        onChange={({ target: { value } }) => setWords(value)} />
      <p>{words}</p>
      <p>It's <span style={{ fontWeight: "bold" }}>Awesome</span></p>
      <div>
        {aLL_nOTES.map((note) => <button onClick={() => handleChange(note)} disabled={currentGuess.length >= targetSong.length}>{note}</button>)}
        <button onClick={() => removeNote()} disabled={currentGuess.length == 0} id="deleteButton">Delete</button>
        <button onClick={() => removeAllNotes()} disabled={currentGuess.length == 0} id = "deleteAllButton">Delete All</button>
        <button onClick={() => handleSubmit()} > Submit </button>
      </div>
    </div>
  );
}

export default App;
