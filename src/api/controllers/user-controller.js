import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user.model.js';

const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const postUser = async (req, res) => {
  try {
    const result = await addUser(req.body);
    if (result && result.user_id) {
      res.status(201);
      res.json({message: 'New user added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const putUser = async (req, res) => {
  try {
    const result = await modifyUser(req.body, req.params.id);
    if (result) {
      res.json({message: 'User item updated.'});
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await removeUser(req.params.id);
    if (result) {
      res.json({
        message: 'User and associated cats deleted successfully',
        details: {
          catsDeleted: result.catsDeleted,
          userDeleted: result.userDeleted,
        },
      });
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res
      .status(500)
      .json({message: 'Failed to delete user and associated data'});
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
