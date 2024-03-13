'use client';
import React from 'react';

type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorButton({ text, onClick }: Props) {
  return <button onClick={onClick}>{text}</button>;
}
