/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select1883776062",
    "maxSelect": 1,
    "name": "eventType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "League",
      "Tournament",
      "Series",
      "Outreach",
      "Clinic"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select1883776062",
    "maxSelect": 1,
    "name": "eventType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "League",
      "Tournament",
      "Outreach",
      "Clinic"
    ]
  }))

  return app.save(collection)
})
