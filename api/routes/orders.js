const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders fetched'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Orders created'
    });
});

router.get('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'Orders details',
        orderId: req.param.orderId
    });
});

router.delete('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'Orders deleted',
        orderId: req.param.orderId
    });
});

module.exports = router;