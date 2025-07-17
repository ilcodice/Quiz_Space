// /api/users
 
export async function GET() {

 
  return Response.json({ users: [{ id: 1, name: "Delshad" }] });
}



export async function POST() {

 
  return Response.json({ users: [{ id: 1, name: "Delshad" }] });
}