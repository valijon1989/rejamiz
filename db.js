const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const state = {
  client: null,
  db: null,
};

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envLines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  envLines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

loadEnvFile();

const connectionString = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME || "Reja";

async function connect() {
  if (state.db) {
    return state.db;
  }

  if (!connectionString) {
    throw new Error("MONGO_URL is missing. Update the .env file with your Atlas URI.");
  }

  const client = new MongoClient(connectionString);
  await client.connect();

  state.client = client;
  state.db = client.db(dbName);

  return state.db;
}

function getDb() {
  if (!state.db) {
    throw new Error("MongoDB connection is not ready yet");
  }

  return state.db;
}

function getDbName() {
  return dbName;
}

module.exports = {
  connect,
  getDb,
  getDbName,
};
