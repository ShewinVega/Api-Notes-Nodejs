const { 
  create,
  allNotes,
  deleteNote,
  findNoteById,
  updateNote,
} = require('../services/notes.service');
const logger = require('../config/logger.config');


module.exports = {

  async notes(req,res) {
    try {
    
      const { error, message, data } = await allNotes(req.payload);
      if(error) return res.status(400).json({
        error,
        message
      });

      return res.status(200).json({
        error,
        message,
        data
      });

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an unexpected error!. check the logs`,
      });
    }
  },

  async createNewNote(req,res) {
    try {
      
      const { error: dataError, message, data } = await create(req.body, req.payload);

      if(dataError) return res.status(400).json({
        error: dataError,
        message
      });

      return res.status(200).json({
        error: dataError,
        message,
        data
      });


    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs`,
      });
    }
  },

  async findNote(req,res) {
    try {
      
      const { error, message, data } = await findNoteById(req.params.id);

      if(error) return res.status(400).json({
        error,
        message
      });
      
      return res.status(200).json({
        error,
        message,
        data
      });

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs`, 
      });
    }
  },

  async updateNote(req,res) {
    try {
      
      const { error: dataError, message, data } = await updateNote(req.params.id, req.body);

      if(dataError) return res.status(400).json({
        error: dataError,
        message
      });

      return res.status(200).json({
        error: dataError,
        message,
        data
      });

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs`,
      });
    }
  },


  async deleteNote(req,res) {
    try {
      
      const { error, message } = await deleteNote(req.params.id);

      if(error) return res.status(400).json({
        error,
        message
      });

      return res.status(200).json({
        error,
        message
      });

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return res.status(500).json({
        error: true,
        message: `There was an expected error. Check the logs`,
      });
    }
  }

}
