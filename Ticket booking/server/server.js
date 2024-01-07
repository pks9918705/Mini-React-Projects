// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Ticket = require('./models/Ticket');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define API routes
app.post('/api/tickets', async (req, res) => {
  try {
    const priorities = {
      Low: 'green',
      Medium: 'yellow',
      High: 'red',
    };

    const ticket = await Ticket.create({
      ...req.body,
      color: priorities[req.body.priority],
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/tickets/:id', async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// MongoDB connection
mongoose.connect('mongodb://localhost/ticketdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Error connecting to MongoDB:', error));
db.once('open', async () => {
  console.log('MongoDB connected successfully');

  // Seed the database with sample tickets
  await seedDatabase();

  // Start the server after MongoDB connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

async function seedDatabase() {
  try {
    await Ticket.deleteMany(); // Clear existing data

    const sampleTickets = [
      {
        heading: 'Fix Bug in Login Page',
        description: 'Users are unable to login due to a bug in the login page.',
        priority: 'High',
        color: 'red',
      },
      {
        heading: 'Update Homepage Design',
        description: 'The homepage design needs to be refreshed to improve user experience.',
        priority: 'Medium',
        color: 'yellow',
      },
      {
        heading: 'Add User Profile Page',
        description: 'Create a new page to display user profiles with relevant information.',
        priority: 'Low',
        color: 'green',
      },
      {
        heading: 'Add User Profile Page',
        description: 'Create a new page to display user profiles with relevant information.',
        priority: 'Low',
        color: 'green',
      },
      {
        heading: 'Add User Profile Page',
        description: 'Create a new page to display user profiles with relevant information.',
        priority: 'Low',
        color: 'green',
      },
    ];

    const createdTickets = await Ticket.create(sampleTickets);
    // console.log('Sample tickets added to the database:', createdTickets);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
