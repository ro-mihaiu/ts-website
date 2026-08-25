"use client";

export function DeleteButton() {
  return <button className="text-red-300 hover:text-red-200" type="submit" onClick={(event) => { if (!window.confirm("Delete this farm and its schematic? This cannot be undone.")) event.preventDefault(); }}>Delete</button>;
}