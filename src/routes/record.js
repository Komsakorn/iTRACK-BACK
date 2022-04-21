const { response } = require("express");
const express = require("express");
const RecordModel = require("../models/record");
const router = express.Router();

router.use("/:recordId", async (req, res, next) => {
  const recordId = req.params.recordId;

  if (recordId && !recordId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).send("Record not found");
  }

  const foundRecord = await RecordModel.findById(recordId);
  if (!foundRecord) {
    return res.status(404).send("Record not found");
  }

  req.record = foundRecord;
  return next();
});

router.get("/:recordId", (req, res, next) => {
  return res.send(req.record);
});

router.get("/", async (req, res, next) => {
  const records = await RecordModel.find({}).sort({ timestamp: -1 });
  res.send(records);
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const newRecord = new RecordModel(body);
  const errors = newRecord.validateSync();
  if (errors) {
    const errorFieldNames = Object.keys(errors.errors);
    if (errorFieldNames.length > 0) {
      return res.status(400).send(errors.errors[errorFieldNames[0]].message);
    }
  }
  await newRecord.save();
  return res.status(201).send(newRecord);
});

router.put(":recordId", async (req, res, next) => {
  const collection = records.get("activities");
  const record = {
    img: req.body.img,
    id: req.body.id,
    activityName: req.body.activityName,
    description: req.body.description,
    timestamp: req.body.timestamp,
    duration: req.body.duration,
    calories: req.body.calories,
    tags: req.body.tags[i],
  };
  collection.update(
    { _id: req.params._id },
    {
      $set: record,
    }
  );
  console.log(collection);
  return res.status(201).send("Updated");
});

router.delete("/:recordId", async (req, res, next) => {
  await RecordModel.deleteOne({ _id: req.params.recordId });
  return res.status(204).send(); // 204 = No content which mean it successfully removed
});

module.exports = router;
