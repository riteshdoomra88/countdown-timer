// **********************************************************************
//  Purpose: Timer Controller Layer
//  SN  Date       Change Description      Modified By
//  1   03/03/2024     Base Version        Ritesh
// **********************************************************************


/**
 * @file timer.controller.js
 * @summary Timer controllers
 * @description This file contains controller definition for timer entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */
const path = require('path');
const { Response } = require(path.join(__basedir, 'app', 'common', 'Common'));
const { constants, messages } = require(path.join(__basedir, 'app', 'config'));
const { getTimerData, saveTimerData } = require("./timer.service");

const { SUCCESS, ERROR } = constants;

/**
 * Controller to get timer data by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next next method
 * */
const timerList = async (req, res, next) => {
    try {
        let response = await getTimerData();
        Response.commonResponse(res, SUCCESS, messages.TIMER_FOUND, response);
        next();
    } catch (error) {
        console.log(`${messages.ERROR_TIMER}: `, error);
        return Response.commonResponse(res, ERROR.INTERNAL_SERVER_ERROR, messages.ERROR, error)
    }
};

const saveTimer = async (req, res, next) => {
    try {
        let response = await saveTimerData(req.body);
        Response.commonResponse(res, SUCCESS, messages.TIMER_SAVED);
        next();
    } catch (error) {
        console.log(`${messages.ERROR_TIMER}: `, error);
        return Response.commonResponse(res, ERROR.INTERNAL_SERVER_ERROR, messages.ERROR, error);
    }
}

module.exports = {
    timerList,
    saveTimer
};