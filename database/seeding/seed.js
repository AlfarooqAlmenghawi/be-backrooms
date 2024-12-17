const format = require("pg-format");
const db = require("../connection");

const seed = ({ levelData }) => {
  return db
    .query(`DROP TABLE IF EXISTS levels;`)
    .then(() => {
      return db.query(`CREATE TABLE levels (
        level_id SERIAL PRIMARY KEY,
        level_number INT NOT NULL,
        title TEXT,
        threat_index INT NOT NULL,
        image TEXT,
        ambience TEXT,
        description TEXT,
        entity_information TEXT,
        entrances TEXT,
        exits TEXT[]
      );`);
    })
    .then(() => {
      const insertLevelsQuery = `
        INSERT INTO levels 
          (level_number, title, threat_index, image, ambience, description, entity_information, entrances, exits) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *;
      `;

      // Use Promise.all to insert all rows sequentially
      const insertPromises = levelData.map(
        ({
          level_number,
          title,
          threat_index,
          image,
          ambience,
          description,
          entity_information,
          entrances,
          exits,
        }) => {
          return db.query(insertLevelsQuery, [
            level_number,
            title,
            threat_index,
            image,
            ambience,
            description,
            entity_information,
            entrances,
            exits, // Pass the array directly
          ]);
        }
      );

      return Promise.all(insertPromises);
    })
    .then((results) => {
      console.log("Seeded successfully:", results.length, "rows");
    });
};

module.exports = seed;
