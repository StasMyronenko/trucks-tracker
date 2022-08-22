const { Load } = require('./models');
const { STATE } = require('../../data/load');
const { Truck } = require('../truck/models');

const getLoads = async (req, res, next) => {
  const status = req.query.status || undefined;
  const limit = req.query.status || 10;
  const offset = req.query.status || 0;

  // eslint-disable-next-line no-underscore-dangle
  const loads = await Load.aggregate([
    {
      $match: {
        $or: [
          // eslint-disable-next-line no-underscore-dangle
          { assigned_to: req.user._id },
          // eslint-disable-next-line no-underscore-dangle
          { created_by: req.user._id },
          (status) ? { status } : { undefined },
        ],
      },
    },
    { $skip: offset },
    { $limit: limit },
  ]);
  // eslint-disable-next-line no-underscore-dangle
  //   .aggregate().$or()
  //   .$sort({ status });
  // .$skip(offset)
  // .$limit(limit);
  try {
    res.status(200).json(loads);
    next();
  } catch (err) {
    res.status(400).json({ message: `Error ${err.message}` });
  }
};

const addLoad = async (req, res, next) => {
  const load = new Load({
    name: req.body.name,
    payload: req.body.payload,
    pickup_address: req.body.pickup_address,
    delivery_address: req.body.delivery_address,
    dimensions: req.body.dimensions,
    created_date: (new Date()).toString(),
  });
  await load.save();
  res.status(200).json({ message: 'Load created successfully' });
  next();
};

const getActiveLoad = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const load = await Load.findOne({ assigned_to: req.user._id });
  res.status(200).json({ load });
  next();
};

const newState = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const load = await Load.findOne({ assigned_to: req.user._id });
  load.state = STATE[STATE.indexOf(load.state) + 1];
  await load.save();
  res.status(200).json({ message: load.state });
  next();
};

const getLoadById = async (req, res, next) => {
  await res.status(200).json({ load: await Load.findOne({ _id: req.params.id }) });
  next();
};

const updateLoadById = async (req, res, next) => {
  const load = Load.findOne({ _id: req.params.id });
  if (req.body.name) {
    load.name = req.body.name;
  }

  if (req.body.payload) {
    load.payload = req.body.payload;
  }

  if (req.body.pickup_address) {
    load.pickup_address = req.body.pickup_address;
  }

  if (req.body.delivery_address) {
    load.delivery_address = req.body.delivery_address;
  }

  if (req.body.dimensions.width) {
    load.dimensions.width = req.body.dimensions.width;
  }

  if (req.body.dimensions.length) {
    load.dimensions.length = req.body.dimensions.length;
  }

  if (req.body.dimensions.height) {
    load.dimensions.height = req.body.dimensions.height;
  }

  await load.save();

  res.status(200).json({
    message: 'Load details changed successfully',
  });
  next();
};

const deleteLoadById = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  await Load.findOneAndDelete({ _id: req.user._id });
  res.status(200).json({ message: 'Load deleted successfully' });
  next();
};

const findDriver = async (req, res, next) => {
  const load = await Load.findOne({ _id: req.params.id });
  load.status = 'POSTED';
  await load.save();
  const truck = await Truck.aggregate([
    {
      $match: {
        status: 'IS',
        width: { $lse: load.dimensions.width },
        length: { $lse: load.dimensions.length },
        height: { $lse: load.dimensions.height },
      },
      $limit: 1,
    },
  ]);
  if (truck) {
    truck.status = 'OL';
    // eslint-disable-next-line no-underscore-dangle
    load.assigned_to = truck._id;
    load.STAUS = 'ASSIGNED';
    truck.save();
    load.save();
    res.status(200).json({
      message: 'Load posted successfully',
      driver_found: true,
    });
    next();
  } else {
    load.logs.append({ message: 'Driver was not find', time: (new Date()).toString() });
    load.save();
    res.status(200).json({
      message: 'Driver was not find',
      driver_found: false,
    });
  }
};

const allInfoLoad = async (req, res, next) => {
  const load = await Load.findById(req.params.id);
  const truck = await Truck.findById(load.assigned_to);
  res.status(200).json({ load, truck });
  next();
};

module.exports = {
  getLoads,
  addLoad,
  getActiveLoad,
  newState,
  getLoadById,
  updateLoadById,
  deleteLoadById,
  findDriver,
  allInfoLoad,
};
