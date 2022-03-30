"use strict";

import station from "../models/stationModel.js";
import { rectangleBounds } from "../utils/rectangleBounds.js";
import connections from "../models/connections.js";

const station_list_get = async (req, res) => {
  try {
    const resultLimit = req.query.limit || 10;
    res.json(
      await station.find().populate(stationPopulationOptions).limit(resultLimit)
    );
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const station_get = async (req, res) => {
  try {
    res.json(
      await station.findById(req.params.id).populate(stationPopulationOptions)
    );
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const station_list_get_by_area = async (req, res) => {
  try {
    if (req.query.topRight && req.query.bottomLeft) {
      const topRight = JSON.parse(req.query.topRight);
      const bottomLeft = JSON.parse(req.query.bottomLeft);
      const polygon = rectangleBounds(topRight, bottomLeft);

      const stations = await station
        .find()
        .populate(stationPopulationOptions)
        .where("Location")
        .within(polygon);

      res.send(stations);
    } else {
      res.status(400).send("Specify coordinates");
    }
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

const station_post = async (req, res) => {
  try {
    const parsedConnection = await JSON.parse(req.body.Connections);
    const parsedStation = await JSON.parse(req.body.Station);

    const insertedConnections = await connections.create(parsedConnection);

    const newStation = await station.create({
      Title: parsedStation.Title,
      Town: parsedStation.Town,
      AddressLine1: parsedStation.AddressLine1,
      StateOrProvince: parsedStation.StateOrProvince,
      Postcode: parsedStation.Postcode,
      Location: {
        coordinates: parsedStation.Location.coordinates,
        type: parsedStation.Location.type,
      },
      Connections: insertedConnections,
    });

    res.json(newStation);
  } catch (e) {
    //console.log('station controller create failed', e);
    res.json({ message: e.message });
  }
};

const station_put = async (req, res) => {
  try {
    const parsedConnections = await JSON.parse(req.body.Connections);
    const parsedStation = await JSON.parse(req.body.Station);
    console.log(parsedStation.id);

    await station.findOneAndUpdate(
      { _id: parsedStation._id },
      {
        Title: parsedStation.Title,
        Town: parsedStation.Town,
        AddressLine1: parsedStation.AddressLine1,
        StateOrProvince: parsedStation.StateOrProvince,
        Postcode: parsedStation.Postcode,
        Location: {
          coordinates: parsedStation.Location.coordinates,
          type: parsedStation.Location.type,
        },
      }
    );

    for (const connection of parsedConnections) {
      await connections.findOneAndUpdate(
        { _id: connection._id },
        {
          ConnectionTypeID: connection.ConnectionTypeID,
          CurrentTypeID: connection.CurrentTypeID,
          LevelID: connection.LevelID,
          Quantity: connection.Quantity,
        }
      );
    }

    res.json("updated");
  } catch (e) {
    //console.log('station controller create failed', e);
    res.json({ message: e.message });
  }
};

const station_delete = async (req, res) => {
  try {
    const deleted = await station.deleteOne({ _id: req.params.id });
    return res.send(deleted);
  } catch (error) {
    console.error(error);
    return res.json({ error: error.message });
  }
};

const stationPopulationOptions = [
  {
    path: "Connections",
    populate: { path: "ConnectionTypeID" },
  },
  {
    path: "Connections",
    populate: { path: "LevelID" },
  },
  {
    path: "Connections",
    populate: { path: "CurrentTypeID" },
  },
];

export {
  station_list_get,
  station_get,
  station_list_get_by_area,
  station_post,
  station_put,
  station_delete,
};
