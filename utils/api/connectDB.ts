import { connect, connection } from "mongoose"

export default async function connectDB() {
  if (connection.readyState === 1) return
  const dbUrl: string = process.env.DATABASE_URL!
  try {
    const conn = await connect(dbUrl)
    console.log("CONNECTED TO DATABASE")
    console.log("host:", conn.connection.host)
  } catch (error: any) {
    console.error(error)
    throw new Error("THERE IS AN ERROR:", error)
  }
}
