const router = require('express').Router();
const {
  verifyToken
} = require('../middlewares/auth.middleware');
const {
  createNewNote,
  deleteNote,
  findNote,
  notes,
  updateNote,
} = require('../controllers/notes.controller');


// Get all Notes
router.get('', verifyToken ,notes);
router.get('/:id', verifyToken ,findNote);

// Create new Notes routes
router.post('/new-note',verifyToken,createNewNote);



// Update Note
router.put('/edit/:id', verifyToken ,updateNote); 

// Delete Note 
router.delete('/delete/:id', verifyToken ,deleteNote);


module.exports = router;