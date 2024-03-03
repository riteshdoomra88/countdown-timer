// **********************************************************************
//  Purpose: Timer Service Layer
//  SN  Date       Change Description      Modified By
//  1   03/03/2024     Base Version        Ritesh
// **********************************************************************

/**
 * @file timer.service.js
 * @summary Timer Service
 * @description This file contains business logics for timer controller.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */
const path = require('path');
const Timer = require(path.join(__basedir, 'app', 'database', 'operations', 'Timer'));
const ObjectId = require('mongodb').ObjectID;

const saveTimerData = async (reqData) => {
    let { timerTime } = reqData;
    let data = {
        timerTime,
        startTime: new Date()
    }
    return await Timer.insertData(data);
};

const getTimerData = async (reqData) => {
    return await Timer.getTimerData('status',true);
};

module.exports = { saveTimerData, getTimerData };