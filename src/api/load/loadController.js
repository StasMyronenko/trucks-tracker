const mongoose = require('mongoose');
const { Load } = require('./models');
const { STATE, STATUS } = require('../../data/load');
const { Truck } = require('../truck/models');
const { SIZE } = require('../../data/truck');

const getLoads = async (req, res, next) => {
  const status = req.query.status || undefined;
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  // eslint-disable-next-line no-underscore-dangle
  const truck = await Truck.findOne({ assigned_to: req.user._id });
  const loads = await Load.aggregate([
    {
      $match: {
        $or: [
          // eslint-disable-next-line no-underscore-dangle
          { created_by: mongoose.Types.ObjectId(req.user._id) },
          // eslint-disable-next-line no-underscore-dangle
          { assigned_to: mongoose.Types.ObjectId(truck?._id) },
        ],
      },
    },
    {
      $match: {
        status: { $in: status ? [status] : [...STATUS] },
      },
    },
    { $skip: offset },
    { $limit: limit },
  ]);
  try {
    await res.status(200).json({ loads });
    next();
  } catch (err) {
    await res.status(400).json({ message: `Error ${err.message}` });
  }
};

const createLoad = async (req, res, next) => {
  const load = new Load({
    // eslint-disable-next-line no-underscore-dangle
    created_by: req.user._id,
    status: 'NEW',
    state: null,
    name: req.body.name,
    payload: req.body.payload,
    pickup_address: req.body.pickup_address,
    delivery_address: req.body.delivery_address,
    dimensions: req.body.dimensions,
    created_date: (new Date()).toString(),
    logs: [{ message: 'Load was created', time: (new Date()).toString() }],
  });
  await load.save();
  await res.status(200).json({ message: 'Load created successfully' });
  next();
};

const getActiveLoad = async (req, res) => {
  // When I use next it will  be error.
  try {
    // eslint-disable-next-line no-underscore-dangle
    const truck = await Truck.findOne({ assigned_to: req.user._id });
    // eslint-disable-next-line no-underscore-dangle
    const load = await Load.findOne({ assigned_to: truck._id, status: 'ASSIGNED' });
    await res.status(200).json({ load });
  } catch (err) {
    await res.status(400).json({ message: err.message });
  }
};

const newState = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const truck = await Truck.findOne({ assigned_to: req.user._id });
  // eslint-disable-next-line no-underscore-dangle
  const load = await Load.findOne({ assigned_to: truck._id, status: 'ASSIGNED' });
  let index;
  if (!load) {
    await res.status(400).json({ message: 'Incorrect data. Might be load already shipped or you don\'t have active loads' });
    return;
  }
  if (load.state) {
    index = STATE.indexOf(load.state);
  } else {
    index = -1;
  }
  if (index === 2) {
    load.status = 'SHIPPED';
    load.state = null;
  }
  if (index <= 2) {
    load.state = STATE[index + 1];
  }

  await load.save();
  await res.status(200).json({ message: load.state });
  next();
};

const getLoadById = async (req, res, next) => {
  await res.status(200).json({ load: await Load.findOne({ _id: req.params.id }) });
  next();
};

const updateLoadById = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const load = await Load.findOne({ created_by: req.user._id, _id: req.params.id, status: 'NEW' });

  if (!load) {
    await res.status(400).json({ message: 'Not Found' });
    return;
  }

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

  await res.status(200).json({
    message: 'Load details changed successfully',
  });
  next();
};

const deleteLoadById = async (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  await Load.findOneAndDelete({ created_by: req.user._id, _id: req.params.id, status: 'NEW' });
  await res.status(200).json({ message: 'Load deleted successfully' });
  next();
};

const postLoad = async (req, res, next) => {
  const load = await Load.findOne({ _id: req.params.id });
  load.status = 'POSTED';
  await load.save();
  const types = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const type in SIZE) {
    if (SIZE[type].width >= load.dimensions.width
      && SIZE[type].length >= load.dimensions.length
      && SIZE[type].height >= load.dimensions.height) {
      types.push(type);
    }
  }
  const trucks = await Truck.aggregate([
    {
      $match: {
        status: 'IS',
        type: {
          $in: [...types],
        },
      },
    },
    {
      $limit: 1,
    },
  ]);

  if (trucks.length > 0) {
    // eslint-disable-next-line no-underscore-dangle
    const truck = await Truck.findById(trucks[0]._id); // strange
    if (truck.assigned_to) {
      truck.status = 'OL';
      // eslint-disable-next-line no-underscore-dangle
      load.assigned_to = truck._id;
      load.status = 'ASSIGNED';
      load.state = 'En route to Pick Up';
      await truck.save();
      await load.save();
      await res.status(200).json({
        message: 'Load posted successfully',
        driver_found: true,
      });
      next();
    } else {
      load.logs.push({ message: 'Driver was not find', time: (new Date()).toString() });
      await load.save();
      await res.status(200).json({
        message: 'Driver was not find',
        driver_found: false,
      });
    }
  } else {
    load.logs.push({ message: 'Driver was not find', time: (new Date()).toString() });
    await load.save();
    await res.status(200).json({
      message: 'Driver was not find',
      driver_found: false,
    });
  }
};

const allInfoLoad = async (req, res, next) => {
  const load = await Load.findById(req.params.id);
  const truck = await Truck.findById(load.assigned_to);
  await res.status(200).json({ load, truck });
  next();
};

module.exports = {
  getLoads,
  createLoad,
  getActiveLoad,
  newState,
  getLoadById,
  updateLoadById,
  deleteLoadById,
  postLoad,
  allInfoLoad,
};
