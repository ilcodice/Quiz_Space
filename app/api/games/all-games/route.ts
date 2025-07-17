import { NextResponse } from 'next/server';

const games = [
  {
    _id: '1',
    name: 'Geography Quiz',
    difficulty: 'Easy',
    startDate: '2025-07-15',
    createdBy: 'Admin',
    mode: 'Single Player',
    max_players: 1,
    start_time: '10:00',
  },
  {
    _id: '2',
    name: 'Science Quiz',
    difficulty: 'Medium',
    startDate: '2025-07-16',
    createdBy: 'Admin',
    mode: 'Multiplayer',
    max_players: 4,
    start_time: '12:00',
  },
  // Add more mock games as you want
];

export async function GET() {
  return NextResponse.json(games);
}