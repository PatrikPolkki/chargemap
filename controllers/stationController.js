"use strict";
// stationController
import stations from "../models/stationModel";
import connections from "../models/connections";
import { parseJSON } from "../utils/parseJSON";

const station_list_get = async (req, res) => {
  const limit = req.body.limit || 10;
  try {
    res.json(
      await stations.find().populate(stationPopulationOptions).limit(limit)
    );
  } catch (error) {
    console.log(error);
  }
};

const station_get = async (req, res) => {
  try {
    const station = await stations
      .findById(req.params.id)
      .populate(stationPopulationOptions);
    res.send(station);
  } catch (error) {
    console.error(error);
  }
};

const station_list_get_by_area = async (req, res) => {
  try {
    if (req.query.topRight && req.query.bottomLeft) {
      const topRight = JSON.parse(req.query.topRight);
      const bottomLeft = JSON.parse(req.query.bottomLeft);
      const polygon = rectangleBounds(topRight, bottomLeft);

      const stations = await stations
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
  console.log(await parseJSON(req.body.Connections, undefined));
  try {
    const parsedStation = req.body.Station;
    const parsedConnection = req.body.Connections;

    console.log(parsedStation);

    const insertedConnections = await connections.create(parsedConnection);

    const newStation = await stations.create({
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
    console.log(e);
  }
};

const station_put = async (req, res) => {
  try {
    const parsedConnections = await JSON.parse(req.body.Connections);
    const parsedStation = await JSON.parse(req.body.Station);
    console.log(parsedConnections[0]._id);

    await stations.findOneAndUpdate(
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
    res.status(400).json(e);
  }
};

const station_delete = async (req, res) => {
  try {
    res.json(await stations.deleteOne({ _id: req.params.id }));
  } catch (e) {
    res.json(e);
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
