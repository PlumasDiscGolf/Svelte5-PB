/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select1874629670",
    "maxSelect": 2,
    "name": "tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Heavily Wooded",
      "Moderately Wooded",
      "Lightly Wooded",
      "Open",
      "Very Hilly",
      "Moderately Hilly",
      "Slightly Hilly",
      "Flat",
      "Water Hazards"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select1874629670",
    "maxSelect": 2,
    "name": "tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Heavily Wooded",
      "Moderately Wooded",
      "Lightly Wooded",
      "Open",
      "Very Hilly",
      "Moderately Hilly",
      "Slightly Hilly",
      "Water Hazards"
    ]
  }))

  return app.save(collection)
})
