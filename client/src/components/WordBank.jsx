import { useState } from 'react'
import { Link } from 'react-router-dom';

export const WordBank = () => {
  const [words, setWords] = useState([
    {
      date: "01.04.2024", words: [
        { word: "create", meaning: "to do something new, produce something" },
        { word: "create", meaning: "to do something new, produce something" },
        { word: "create", meaning: "to do something new, produce something" },
      ]
    }
  ])
  return (
    <div>
      {words ? (
        <div>
          {words.map((word, i) => (
            <div className='shadow-xl p-5 rounded-md flex bg-white' key={i}>
              <h1>{word.date}</h1>
              <div>Words saved: {word.words.length}</div>
              <Link className="btn" to="/profile">Open folder</Link>
              {/* <Link className="btn" to="/profile">Do flashcards</Link> */}
            </div>
          ))}
        </div>
      ) : <div>there no any words</div>}
    </div>
  )
}
