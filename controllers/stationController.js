"use strict";
// stationController
import stations from "../models/stationModel";

const station_list_get = async (req, res) => {
  try {
    res.json(await stations.find().populate("Connections"));
  } catch (error) {
    console.log(error);
  }
};

const station_get = async (req, res) => {
  try {
    const station = await stations.findById(req.params.id);
    res.send(station);
  } catch (error) {
    console.error(error);
  }
};

const station_post = async (req, res) => {
  console.log(req.body);
  try {
    const newstation = req.body;
    await stations.create(newstation);
    res.json(newstation);
  } catch (e) {
    console.log(e);
  }
};

const station_put = async (req, res) => {
  console.log(req.body);
  try {
    const color = req.body.color;
    const weight = req.body.weight;
    const name = req.body.name;
    const station = await stations.updateOne(
      { _id: req.params.id },
      { color, weight, name }
    );
    res.json(station);
  } catch (error) {
    console.log(error);
  }
};

const station_delete = async (req, res) => {
  try {
    res.json(await stations.deleteOne({ _id: req.params.id }));
  } catch (e) {
    res.json(e);
  }
};

export {
  station_list_get,
  station_get,
  station_post,
  station_put,
  station_delete,
};
