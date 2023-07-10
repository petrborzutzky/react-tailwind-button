import './App.css';
import { useRef, useState, useReducer } from 'react';
import Character from './Character';

export const ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
  UPDATE: 'update',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.ADD:
      const newCharacter = newCharacters(
        action.payload.who,
        action.payload.wat
      );
      console.log([...state, newCharacter]);
      return [...state, newCharacter];

    case ACTION.REMOVE:
      return state.filter((character) => character.id !== action.id);
    case ACTION.UPDATE:
      return state.map((character) => {
        if (character.id === action.payload.id) {
          return { ...character, cool: action.payload.cool };
        }
        return character;
      });

    default:
      throw new Error('Nepoznam typ akcie');
  }
}

function newCharacters(who, wat) {
  return {
    id: Date.now(),
    who: who,
    wat: wat,
    cool: 12,
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [dude, setDude] = useState('Marceline the Vampire Queen');
  const [dudeDescription, setDudeDescription] = useState('A vampire queen');
  const dudeRef = useRef();

  const initialState = [
    {
      id: Date.now(),
      who: 'Finn the Human',
      wat: 'A silly kid who wants to become a great hero one day.',
      cool: 12,
    },
    {
      id: Date.now(),
      who: 'Jake the Dog',
      wat: "A magical dog who is Finn's constant companion.",
      cool: 24,
    },
  ];

  function handleSubmit(event) {
    //event.preventDefault();
    if (event.key === 'Enter' && dude !== '' && dudeDescription !== '') {
      dispatch({
        type: ACTION.ADD,
        payload: { who: dude, wat: dudeDescription },
      });
      setDude('');
      setDudeDescription('');
      dudeRef.current.focus();
    }
  }

  //console.log(state);

  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-900 text-white">
      <h1 className="text-3xl p-10 text-white">Tlacitka v reactu</h1>
      <ul>
        {state.map((character) => (
          <Character
            key={character.id}
            character={character}
            dispatch={dispatch}
          />
        ))}
      </ul>
      <form
        className="flex flex-col items-center w-96"
        onKeyDown={handleSubmit}
      >
        <input
          autoFocus
          value={dude}
          ref={dudeRef}
          onChange={(e) => setDude(e.target.value)}
          type="text"
          className="w-full bg-inherit text-white text-center border-b-2"
        />

        <input
          type="text"
          value={dudeDescription}
          onChange={(e) => setDudeDescription(e.target.value)}
          className="w-full bg-inherit text-white text-center border-b-2"
        />
      </form>
    </main>
  );
}

export default App;
