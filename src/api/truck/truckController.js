const { Truck } = require('./models');

const getTrucks = async (req, res, next) => {
  const trucks = await Truck.find({}).all();
  try {
    res.status(200).json({ trucks });
    next();
  } catch (err) {
    res.status(400).json({ message: `Error^ ${err}` });
  }
};

const addTruck = async (req, res, next) => {
  try {
    const truck = await new Truck({
      // eslint-disable-next-line no-underscore-dangle
      created_by: req.user._id,
      assigned_to: null,
      type: req.body.type,
      created_date: (new Date()).toString(),

    });
    truck.save();
    await res.status(200).json({
      message: 'Truck created successfully',
    });
    next();
  } catch (err) {
    res.status(400).json({
      message: `Error: ${err.message}`,
    });
  }
};

const getTruckById = async (req, res, next) => {
  const truck = await Truck.findById(req.params.id);
  try {
    res.status(200).json(truck);
    next();
  } catch (err) {
    res.status(400).json({ message: `Error^ ${err}` });
  }
};

const updateTruckById = async (req, res, next) => {
  const truck = await Truck.findById(req.params.id);
  try {
    truck.type = req.body.type;
    truck.save();
    await res.status(200).json({
      message: 'Truck details changed successfully',
    });
    next();
  } catch (err) {
    res.status(400).json({
      message: `Error: ${err.message}`,
    });
  }
};

const deleteTruckById = async (req, res, next) => {
  await Truck.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json({ message: 'Truck deleted successfully' });
    next();
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
};

const assignTruckById = async (req, res, next) => {
  const truck = await Truck.findById(req.params.id);
  if (truck) {
    // eslint-disable-next-line no-underscore-dangle
    truck.assigned_to = req.user._id;
    await truck.save();
    res.status(200).json({ message: 'Truck assigned successfully' });
    next();
  } else {
    res.status(400).json({ message: 'Truck invalid id' });
  }
};

module.exports = {
  getTrucks,
  addTruck,
  getTruckById,
  updateTruckById,
  deleteTruckById,
  assignTruckById,
};
