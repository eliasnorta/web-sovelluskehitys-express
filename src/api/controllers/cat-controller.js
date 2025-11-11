import {addCat, findCatById, listAllCats} from '../models/cat.model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  // Combine form data with uploaded file info
  const catData = {
    ...req.body,
    filename: req.file ? req.file.filename : null
  };
  
  const result = addCat(catData);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});

    console.log('Form data:', req.body);
    console.log('File info:', req.file);
    console.log('Cat data saved:', catData);
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  res.json({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  res.json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};
