// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors()); // Use the cors middleware

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  price: Number,
  image: String,
});

const Book = mongoose.model('Book', bookSchema);

// Function to seed initial data into the database
const seedDatabase = async () => {
  try {
    await Book.deleteMany(); // Clear existing data

    const books = [
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 20, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 15, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvb2t8ZW58MHx8MHx8fDA%3D' },
      { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 255, image: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3N8ZW58MHx8MHx8fDA%3D' },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 220, image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2tzfGVufDB8fDB8fHww' },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 1115, image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzfGVufDB8fDB8fHww' },
      { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 125, image: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvb2tzfGVufDB8fDB8fHww' },
      // Add more books as needed
    ];

    await Book.insertMany(books);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Seed the database on server startup
seedDatabase();

// Define API endpoint for fetching all books
app.get('/api/books', async (req, res) => {
  try {
    // Fetch all books from the database
    const allBooks = await Book.find();

    // Send the entire books array as JSON response
    res.json(allBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
