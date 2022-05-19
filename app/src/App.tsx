import React from 'react';
import './App.css';
import { useState } from 'react';
import * as Tone from 'tone'
import { Box } from './components/Box'
import { makePrettyColors, PrettyColor } from './SmartStuff'
import { Piano } from './components/Piano';

interface AppProps { }

const aLL_nOTES = [
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"
] as const;
type NoteTuple = typeof aLL_nOTES; // readonly ['hearts', 'diamonds', 'spades', 'clubs']
type Note = NoteTuple[number];  // "hearts" | "diamonds" | "spades" | "clubs"


function App({ }: AppProps) {

  const targetSong: Array<[Note, number]> = [["B4", .3], ["A4", .3], ["G4", .6], ["B4", .3], ["A4", .3], ["G4", .6], ["B4", .3], ["A4", .3], ["G4", .6]] // hot cross buns
  const grayey: Array<PrettyColor> = targetSong.map(() => 'light-grey')
  const synth = new Tone.Synth().toDestination();

  //this is target song but just the notes
  const simplify = targetSong.map(current => current[0])

  // const [words, setWords] = useState("")
  //GO!
  const [currentGuess, setCurrentGuess] = useState<string[]>(simplify.map(() => ""))
  const [previousGuessesUwU, setPreviousGuessesOwO] = useState<string[][]>([])
  const [previousGuessColorsOwO, setPreviousGuessColorsUwU] = useState<PrettyColor[][]>([])

  function playNote(value: string) {
    synth.triggerAttackRelease(value, "4n", Tone.now());
  }

  function playAllNotes(notesArr: string[]) {
    const now = Tone.now()
    var sum = 0
    for (let i = 0; i < notesArr.length; i++) {
      synth.triggerAttackRelease(notesArr[i], targetSong[i][1], now + sum)
      sum = sum + targetSong[i][1]
    }
  }

  function handleChange(value: string) {
    playNote(value)
    const guessedNotes = currentGuess.slice()
    guessedNotes[guessedNotes.indexOf("")] = value
    setCurrentGuess(guessedNotes)
  }

  function removeNote() {
    const notes = currentGuess.slice()
    notes.pop()
    setCurrentGuess(notes)
  }

  function removeAllNotes() {
    setCurrentGuess(simplify.map(() => ""))
  }

  function handleSubmit() {
    setPreviousGuessesOwO(prev => { return prev.concat([currentGuess]) })
    setPreviousGuessColorsUwU(prev => prev.concat([makePrettyColors(simplify, currentGuess)]))
    removeAllNotes()
  }

  return (
    <div className="App">
      <header>
        <h1>Notedle</h1>
      </header>
      <div>
        {previousGuessesUwU.map((guess, i) => {
          return <Box guess={guess} color={previousGuessColorsOwO[i]} />
        })}
        <Box guess={currentGuess} color={grayey} />
      </div>
      <p><button onClick={() => playAllNotes(currentGuess)}>Play</button>  </p>
      {/* <input
        type="text"
        onChange={({ target: { value } }) => setWords(value)} />
      <p>{words}</p> */}
      <p><span style={{ fontWeight: "bold", color: "#121213" }}>It's Awesome</span></p>
      <div>
        <button onClick={() => removeNote()} disabled={currentGuess.length == 0} className="sixCharsButton">Delete</button>
        <button onClick={() => removeAllNotes()} disabled={currentGuess.length == 0} id="deleteAllButton">Delete All</button>
        <button onClick={() => handleSubmit()} className="sixCharsButton" disabled={currentGuess.indexOf("") >= 0}>Submit</button>
      </div>
      <div id="piano"><Piano onClick={(note) => handleChange(note)} disabled={currentGuess.indexOf("") < 0} /></div>
    </div>
  );
}

// Garbage
// {aLL_nOTES.map((note) => <button onClick={() => handleChange(note)} disabled={currentGuess.indexOf("") < 0}>{note}</button>)}


export default App;
export { aLL_nOTES, Note };