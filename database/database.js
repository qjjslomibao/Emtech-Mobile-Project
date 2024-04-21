import SQLite from 'react-native-sqlite-storage';

// Enable debug mode to see SQLite logs
SQLite.DEBUG(true);
// Use promises for better async handling
SQLite.enablePromise(true);

const database_name = "FishCatalogue.db"; // Define the database name

// Function to open or create the database
export const getDBConnection = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: database_name,
      location: 'default', // Use default location for the database
    });
    console.log("Database opened successfully");
    return db;
  } catch (error) {
    console.error('Failed to open database:', error);
    throw new Error('Failed to open database'); // Rethrow to handle in calling function
  }
};

// Function to create the 'Fishes' table if it does not already exist
export const createTable = async (db) => {
  if (!db) {
    throw new Error('Database connection is null in createTable');
  }
  const query = `
    CREATE TABLE IF NOT EXISTS Fishes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      tankSize TEXT,
      diet TEXT,
      temperatureRange TEXT,
      imageURL TEXT
    );
  `;
  try {
    await db.executeSql(query);
    console.log("Table created/verified successfully");
  } catch (error) {
    console.error('Failed to create table:', error);
    throw new Error('Failed to create table');
  }
};

// Function to insert initial data into the 'Fishes' table
export const insertInitialData = async (db) => {
  if (!db) {
    throw new Error('Database connection is null in insertInitialData');
  }
  const checkQuery = `SELECT count(id) AS count FROM Fishes`;
  try {
    const result = await db.executeSql(checkQuery);
    if (result[0].rows.item(0).count === 0) { // Only insert if the table is empty
      const insertQuery = `
        INSERT INTO Fishes (name, description, tankSize, diet, temperatureRange, imageURL) VALUES (?, ?, ?, ?, ?, ?);
      `;
      const fishes = [
        ["Shubunkin Goldfish", "Single-tailed with calico coloration, more streamlined body allowing for active swimming.", "20 Gallons", "Omnivore: Plant and animal-based foods", "65-75°F (18-24°C)", "./assets/SHUBUKIN.png"],
        ["Ryukin Goldfish", "Known for their high back and deep body.", "30 Gallons", "Omnivore: Includes flakes, pellets, and live foods", "65-75°F (18-24°C)", "./assets/ryukin.png"],
        ["Oranda Goldfish", "Known for their bubbly head and flowing fins.", "30 Gallons", "Omnivore: Pellets, vegetables, and occasional meaty foods", "65-75°F (18-24°C)", "./assets/oranda.png"],
        ["Ping Pong Goldfish", "Characterized by their rounded body and large, prominent eyes.", "20 Gallons", "Omnivore: Includes pellets, vegetables, and live foods", "65-75°F (18-24°C)", "./assets/ping-pong.png"],
        ["Calico Moore Goldfish", "Known for their distinctive coloration and rounded bodies.", "30 Gallons", "Omnivore: Includes high-quality pellets, veggies, and live food", "65-75°F (18-24°C)", "./assets/telescope.png"]
      ];
      for (let fish of fishes) {
        await db.executeSql(insertQuery, fish);
      }
      console.log("Initial data inserted successfully");
    }
  } catch (error) {
    console.error('Failed to insert initial data:', error);
    throw new Error('Failed to insert initial data');
  }
};

// Function to fetch all fish entries from the 'Fishes' table
export const fetchFishes = async (db) => {
  if (!db) {
    throw new Error('Database connection is null in fetchFishes');
  }
  try {
    const results = await db.executeSql('SELECT * FROM Fishes');
    console.log("Data fetched successfully:", results[0].rows.raw());
    return results[0].rows.raw(); // Return rows as an array of objects
  } catch (error) {
    console.error('Failed to fetch fishes from the database:', error);
    return []; // Return an empty array on error
  }
};
