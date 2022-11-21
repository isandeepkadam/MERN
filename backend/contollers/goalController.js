const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

//@desc Get all goals
//@route GET /API/Goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//@desc set all goals
//@route POST /API/Goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please input a text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//@desc update goal
//@route PUT /API/Goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
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
  const goal = Goal.findById(req.params.id);
  if (!goal) {
    throw new Error('Goal not found');
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
