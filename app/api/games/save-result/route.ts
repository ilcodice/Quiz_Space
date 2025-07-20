import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "../../lib/mongodb";
import Game from "../../games/models/Game";

export async function POST(req: NextRequest) {


  await connectToDB();

  const { gameId, score } = await req.json();

  const game = await Game.findOne({ _id: gameId });
  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  game.score = score;
  game.end_time = new Date();
  await game.save();

  return NextResponse.json({ message: "Score saved!" });
}
