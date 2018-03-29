var mongoose = require('mongoose');
var Items = require('../models/items.js');

exports.itemsGet = (req, res) => {
    Items.find((err, items)=>{
        res.send(items);
    });
}

exports.itemsAdd = (req, res) => {
    new Items({finished: false, name: req.body.itemName}).save();
    res.send({finished: false, name: req.body.itemName});
}

exports.itemsDelete = (req, res) => {
    let itemId = mongoose.Types.ObjectId(req.body.itemId);
    let deletedItem = {};
    Items.find({_id: itemId}).exec((err, items)=>{
        deletedItem = items;
        Items.remove({_id: itemId}).exec((err, items)=>{
            res.send(deletedItem);
        });
    });
}

exports.itemsUpdate = (req, res) => {
    let itemId = mongoose.Types.ObjectId(req.body.itemId);
    let updatedItem = {};
    Items.find({_id: itemId}).exec((err, item)=>{
        updatedItem = item;
        Items.update(
            {_id: itemId},
            {
                $set : {
                    finished: req.body.newItem.finished,
                    name: req.body.newItem.name
                }
            }
        ).exec((err, item)=>{
            res.send(updatedItem);
        });
    });
}
