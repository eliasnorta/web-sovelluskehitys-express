import {
  addCat,
  findCatById,
  findCatsByUserId,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat.model.js';

const getCat = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    console.error('Error getting cats:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (cat) {
      res.json(cat);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error getting cat by ID:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getCatsByUserId = async (req, res) => {
  try {
    const cats = await findCatsByUserId(req.params.userId);
    res.json(cats);
  } catch (error) {
    console.error('Error getting cats by user ID:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const postCat = async (req, res) => {
  try {
    const catData = {
      ...req.body,
      filename: req.file ? req.file.filename : null,
    };

    const result = await addCat(catData);
    if (result && result.cat_id) {
      res.status(201);
      res.json({message: 'New cat added.', result});

      console.log('Form data:', req.body);
      console.log('File info:', req.file);
      console.log('Cat data saved:', catData);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error('Error adding cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const putCat = async (req, res) => {
  try {
    const result = await modifyCat(req.body, req.params.id);
    if (result) {
      res.json({message: 'Cat item updated.'});
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error updating cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteCat = async (req, res) => {
  try {
    const result = await removeCat(req.params.id);
    if (result) {
      res.json({message: 'Cat item deleted.'});
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export {getCat, getCatById, getCatsByUserId, postCat, putCat, deleteCat};
