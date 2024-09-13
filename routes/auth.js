const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { getDatabase, ref, set, get, push } = require('firebase/database');

// Enable CORS for all routes
router.use(cors());

// Register route
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user in the Realtime Database
    const db = getDatabase();
    await set(ref(db, 'users/' + user.uid), {
      name: name || 'Anonymous', // Provide a default value if name is not provided
      email: email,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).json({ message: 'User logged in successfully', userId: user.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Score route
router.post('/score', async (req, res) => {
  const { userId, score } = req.body;
  
  if (!userId || score === undefined) {
    return res.status(400).json({ error: 'User ID and score are required' });
  }

  try {
    const db = getDatabase();
    const userScoreRef = ref(db, `users/${userId}/scores`);
    
    // Push a new score to the user's scores array
    const newScoreRef = push(userScoreRef);
    await set(newScoreRef, {
      score: score,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ message: 'Score added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user scores route
router.get('/scores/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const db = getDatabase();
    const userScoreRef = ref(db, `users/${userId}/scores`);
    const snapshot = await get(userScoreRef);

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'No scores found for this user' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users with scores route
router.get('/users-with-scores', async (req, res) => {
  try {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const users = snapshot.val();
      const usersWithScores = Object.entries(users).map(([userId, userData]) => {
        return {
          userId,
          name: userData.name,
          email: userData.email,
          scores: userData.scores ? Object.values(userData.scores) : []
        };
      });

      res.status(200).json(usersWithScores);
    } else {
      res.status(404).json({ message: 'No users found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', (req, res) => {
  res.send("hello");
});

module.exports = router;