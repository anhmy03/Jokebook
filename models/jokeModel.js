"use strict";
const db = require("./db-conn");

// Get all categories
function getCategories() {
    return db.all("SELECT * FROM categories");
}

// Get category ID by name
function getCategoryIdByName(categoryName) {
    const row = db.get("SELECT id FROM categories WHERE name = ?", categoryName);
    return row ? row.id : null;
}

// Get jokes by category ID
function getJokesByCategory(categoryId, limit = 10) {
    return db.all("SELECT * FROM jokes WHERE category_id = ? LIMIT ?", categoryId, limit);
}

// Get a random joke
function getRandomJoke() {
    return db.get("SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1");
}

// Add a new joke
function addJoke(categoryId, setup, delivery) {
    const result = db.run(
        "INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)",
        categoryId,
        setup,
        delivery
    );
    return { id: result.lastInsertRowid, categoryId, setup, delivery };
}

module.exports = {
    getCategories,
    getCategoryIdByName,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};
