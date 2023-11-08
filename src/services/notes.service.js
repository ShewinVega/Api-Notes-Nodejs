const Notes = require('../models/notes.model');
const logger = require('../config/logger.config');
const recordEmitter = require('../listeners/record.listener');


module.exports = {

  async create(body,payload)  {
    try {
      const { title, description } = body;
      const noteReference = new Notes({title, description, user: payload.id});
      
      const data = await noteReference.save();

      if(!data) {
        return {
          error: true,
          message: `Note was not created`,
        }
      }
  
      const newData = await Notes.findById(data._id).populate({
        path: 'user',
        select: 'name'
      }).select(['-__v','-updatedAt']);
      if(!newData) {
        return {
          error: true,
          message: `Note was not got it`,
        }
      }

      await recordEmitter.emit(
        'addRecord',
        payload.id,
        'Evento generado, Nota Guardada',
      );

      return {
        error: false,
        message: `Note created successfully`,
        data: newData
      }

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }

  },

  async allNotes(payload) {
    try {
      
      const data = await Notes.find({user: payload.id}).populate({
        path: 'user',
        select: 'name'
      }).sort({ createdAt: 'desc' }).select(['-__v','-updatedAt']);

      if(!data) return {
        error: false,
        message: `There are not notes in the system at the moment`,
      }

      return {
        error: false,
        message: `Notes`,
        data
      }

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  },

  async findNoteById(id) {
    try {
      
      const data = await Notes.findById(id).populate('users');

      if(!data) return {
        error: true,
        message: `Note does not exist in the system`,
      }

      return {
        error: false,
        message: `Note found`,
        data
      }

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  },

  async updateNote(id, body) {
    try {
      
      if(!id) return {
        error: true,
        message: `Note identification was not sent!`,
      }

      const data = await Notes.findByIdAndUpdate({_id:id},
        {
          ...body
        }
      ).populate({
        path: 'user',
        select: 'name'
      });

      if(!data) return {
        error: true,
        message: `Note was not updated!`,
      }

      return {
        error: false,
        message: `Note updated successfully`,
        data,   
      }

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  },


  async deleteNote(id) {
    try {
      
      if(!id) return {
        error: true,
        message: `Note identification was not sent!`,
      }

      const noteDeleted = await Notes.findByIdAndDelete(id);

      if(!noteDeleted) return {
        error: true,
        message: `Note was not deleted!`,
      }

      return {
        error: false,
        message: `Note was deleted successfully`,
      }

    } catch (error) {
      logger.error(`There was an error: ${error}`);
      return {
        error: true,
        message: `There was an unexpected error!. check the logs`,
      }
    }
  }

}