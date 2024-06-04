import React, { useContext } from 'react'
import noteContext from '../Context/notes/notesContext';

export default function Alert() {

  const context = useContext(noteContext);
  const {alert} = context;

  return (
    alert && <div>
      <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        <strong>{alert.msg}</strong>
      </div>
    </div>
  )
}