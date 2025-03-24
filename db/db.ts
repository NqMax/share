import postgres from "postgres";

const connectionString = Deno.env.get("POSTGRES_CONNECTION_STRING");

if (!connectionString) {
  throw new Error("No connection string provided");
}

const sql = postgres(connectionString);

export { sql };
