import React, { useState } from 'react';
import { Pupil, PupilItem, ChosenPupil } from './Pupil';
import { AddPupil, BulkAddPupil } from './AddPupil';

interface RollProps {
  initialPupils: Pupil[];
}

export function Roll(props: RollProps) {
  const [pupils, setPupils] = useState<Pupil[]>(props.initialPupils);
  const [penaltyIncrement, setPenaltyIncrement] = useState<number>(5);
  const [penaltyTotal, setPenaltyTotal] = useState<number>(
    // compute the initial penalty total from the initial students' predefined penalties
    props.initialPupils.reduce<number>((total, curPupil) => total + (curPupil.penalty || 0), 0)
  );
  const [penaltyMode, setPenaltyMode] = useState<boolean>(true);
  const [chosen, setChosen] = useState<Pupil | null>(null);

  const addPupil = (pupil: Pupil) => {
    setPupils(pupils => pupils.concat(pupil));
  }

  const generateWeightedArr = (): Array<Pupil[]> => {
    let unpenalized = [];
    let penalized = [];

    for (const pupil of pupils) {
      if (pupil.penalty) { // 0 is falsey
        penalized.push(pupil)
      } else {
        unpenalized.push(pupil);
      }
    }

    let weightedArray: Array<Pupil[]> = [];
    for (const pupil of penalized) {
      // casting since we added to penalty based on whether penalty was a number
      for (let i = 0; i < (pupil.penalty as number); i++) {
        weightedArray.push([pupil]);
      }
    }

    if (penaltyTotal > 100 || unpenalized.length === 0) {
      return weightedArray;
    }

    // add a reference to the whole group at once
    for (let i = weightedArray.length; i < 100; i++) {
      weightedArray.push(unpenalized);
    }

    return weightedArray;
  }

  const pickPupil = (): Pupil => {
    if (!penaltyMode) {
      return pickRandomly(pupils);
    }

    const weightedRoll: Array<Pupil[]> = generateWeightedArr();
    const firstPass: Pupil[] = pickRandomly(weightedRoll);
    const secondPass: Pupil = pickRandomly(firstPass);

    return secondPass;
  }

  // using trailing comma syntax to define a generic type and not JSX expression
  const pickRandomly = <T,>(arr: T[]): T => {
    if (arr.length === 0) {
      throw new Error('invalid array to choose from');
    }

    if (arr.length === 1) {
      return arr[0];
    }

    const r = Math.floor(Math.floor(Math.random() * arr.length));
    return arr[r];
  }

  const clearPenalty = (pupil: Pupil): void => {
    if (pupil.penalty) {
      setPenaltyTotal(penaltyTotal - (pupil.penalty))
      pupil.penalty = 0;
    }
  }

  const penalize = (pupil: Pupil): void => {
    if (!pupil.penalty) {
      pupil.penalty = 0;
    }

    // add max penalty logic?
    pupil.penalty += penaltyIncrement;
    setPenaltyTotal(penaltyTotal + penaltyIncrement);
  }

  return (<div style={{display: 'flex', flexDirection: 'column'}}>
    <hr />
    <div style={{ display: 'flex' }}>
      <AddPupil
        addPupil={addPupil}
      />

      <BulkAddPupil
        addPupil={addPupil}
      />

    </div>
    <hr />
    <button onClick={() => setChosen(pickPupil())}>Select Student</button>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h2>All Students</h2>
        {pupils.map(p => (
          <PupilItem
            {...p}
          />
        ))}
      </div>

      <div>
        <h2>Selected Student</h2>
        {chosen !== null &&
          <ChosenPupil
            {...chosen}
            penalize={() => penalize(chosen)}
            absolve={() => clearPenalty(chosen)}
          />
        }

      </div>
    </div>


  </div>
  )
}