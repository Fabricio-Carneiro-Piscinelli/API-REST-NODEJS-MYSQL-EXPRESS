var express = require('express');
var router = express.Router();
var Item = require('../models/Item');


router.get('/', (req, res, next) => {
    if(!req.query.id){
        Item.getAll((err, rows) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }else {
        Item.getById(req.query.id, (err, rows) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
});

router.post('/', (req, res, next) => {
    Item.add(req.body, (err, count) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.delete('/:id', (req, res, next) => {
    Item.delete(req.query.id, (err, count) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }
    });
});

router.put('/:id', (req, res, next) => {
    Item.update(req.query.id, req.body, (err, rows) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;