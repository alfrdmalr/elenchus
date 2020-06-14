import React, { useState } from 'react';
import { Pupil } from './Pupil';

export interface AddPupilProps {
  addPupil: (p: Pupil) => void
}

export function AddPupil(props: AddPupilProps) {
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");

  return (
    <div>
      <div>
        First Name: <input type="text" value={first} onChange={e => setFirst(e.target.value)} />
      </div>
      <div>
        Last Name: <input type="text" value={last} onChange={e => setLast(e.target.value)} />
      </div>

      <button onClick={() => props.addPupil({ first: first, last: last })}>add student</button>
    </div>
  )
}

export function BulkAddPupil(props: AddPupilProps) {
  const [list, setList] = useState<string>("");
  const bulkAdd = (str: string) => {
    const names: string[] = str.split(';');
    for (const fullname of names) {
      if (fullname === "") {
        continue;
      }
      const pair = fullname.split(',');

      if (pair.length !== 2) {
        throw new Error('invalid format')
      }

      const last = pair[0]
      const first = pair[1]
      const whitespaceRegex = /^\s+|\s+$/
      const trimmedLast = last.replace(whitespaceRegex, '');
      const trimmedFirst = first.replace(whitespaceRegex, '');
      props.addPupil({ first: trimmedFirst, last: trimmedLast })
    }

    //do some regex parsing and then add for each student name
  }

  return (
    <div>

      <p>
        To bulk add students, separate last and first names by comma and students by semicolon
      like: <code>"Smith,John;Doe,Jane;Hyphenated-Surname,Bobby"</code>
      </p>
      <input type="text" value={list} onChange={e => setList(e.target.value)} />
      <button onClick={() => bulkAdd(list)}>bulk add</button>
    </div>
  )

}
