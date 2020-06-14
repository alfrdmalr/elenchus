import React from 'react';

export interface Pupil {
  first: string;
  last: string;
  penalty?: number;
}

export interface PupilProps extends Pupil {
  penalize: () => void;
  absolve: () => void;
}

export function PupilItem(props: Pupil) {
  return (
    <div>
      <p>{props.last}, {props.first} {props.penalty ? `(${props.penalty})` : undefined}</p>
    </div>
  )
}

export function ChosenPupil(props: PupilProps) {
  return (
    <div>
      <p>{props.first} {props.last}</p>
      <p>Current Penalty: {props.penalty || "0"}</p>
      <button onClick={props.penalize}>penalize</button>
      <button onClick={props.absolve}>absolve</button>
    </div>
  )
}