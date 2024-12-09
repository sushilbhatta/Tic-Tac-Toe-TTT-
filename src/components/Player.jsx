import { useState } from "react";

export default function Player({
  inintialName,
  symbol,
  isActive,
  onPlayerChange,
}) {
  // allow user to edit the playerName
  const [playerName, setPlayerName] = useState(inintialName);
  // weather player is editing or not
  const [isEditing, setisEditing] = useState(false);
  function handleEditClick() {
    setisEditing((editing) => !editing);
    if (isEditing) {
      onPlayerChange(symbol, playerName);
    }
  }

  function handleChange(e) {
    // re-render  with the  users input value
    setPlayerName(e.target.value);
  }
  let editablePlayerName = <span className='player-name'>{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input type='text' required value={playerName} onChange={handleChange} />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className='player'>
        {editablePlayerName}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
