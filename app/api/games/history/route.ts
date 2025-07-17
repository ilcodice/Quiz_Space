import { NextRequest, NextResponse } from "next/server";
import Game from "@/models/Game";
import { connectToDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {

  await connectToDB();

  const results = await Game.find()
    .sort({ datePlayed: -1 })   
    .lean();

  return NextResponse.json(results);
}
