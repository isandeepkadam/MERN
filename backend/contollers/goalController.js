const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

//@desc Get all goals
//@route GET /API/Goals
//@access Private
const getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
};

//@desc set all goals
//@route POST /API/Goals
//@access Private
const setGoal = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    res.send('Please input a text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
};

//@desc update goal
//@route PUT /API/Goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure the logged in user matches the goal user
  if (goal.user?.toString() !== user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@desc Delete goal
//@route DELETE /API/Goal/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure the logged in user matches the goal user

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
