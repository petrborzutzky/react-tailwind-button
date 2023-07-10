import React from 'react';
import { ACTION } from './App';

export default function Character({ character, dispatch }) {
  return (
    <li key={character.id} className="flex flex-row items-center">
      <a
        className="text-white font-bold"
        href="#"
        onClick={(e) => dispatch({ type: ACTION.REMOVE, id: character.id })}
      >
        x
      </a>

      <article
        className={`text-xl font-bold bg-yellow-500 rounded-lg m-5 p-3 text-white text-center shadow-xl w-96 ${
          character.cool < 10
            ? 'opacity-50'
            : character.cool > 20
            ? 'bg-red-500'
            : ''
        }`}
      >
        {character.who} <br />
        <span className=" text-sm">{character.wat}</span>
      </article>

      <input
        className="w-10 bg-inherit text-center text-white border-2 rounded"
        type="number"
        value={character.cool}
        onChange={(e) => {
          dispatch({
            type: ACTION.UPDATE,
            payload: { id: character.id, cool: e.target.value },
          });
        }}
      />
    </li>
  );
}
