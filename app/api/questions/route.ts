// app/api/questions/route.ts
import { NextResponse } from "next/server";
import { questions } from "../../../client/src/lib/questions.ts"; 

export async function GET() {
  return NextResponse.json(questions);
}
