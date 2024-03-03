// **********************************************************************
//  Purpose: Auth Middleware/ Authorization Layer
//  SN  Date       Change Description      Modified By
//  1   03/03/2024     Base Version        Ritesh
// **********************************************************************

/**
 * @file auth.js
 * @summary User authentication and verification middleware
 * @description This file contains utility methods for authentication and verification of user.
 * */

const path = require('path');
const { sign, verify } = require("jsonwebtoken");
const { Response } = require(path.join(__basedir, 'app', 'common', 'Common'));
const { constants, messages } = require(path.join(__basedir, "app", "config"));
const Role = require(path.join(__basedir, 'app', 'database', 'operations', 'Role'));
const User = require(path.join(__basedir, 'app', 'database', 'operations', 'User'));
const { commonValidator } = require('./validator');

const { SECRET } = constants;

/**
 * Method to extract and verify JWT token from HTTP headers
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next HTTP next callback method
 * */
const authenticateUserWithToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            console.log(messages.ACCESS_DENIED);
            return Response.commonResponse(res, constants.ERROR.BAD_REQUEST, messages.ACCESS_DENIED, error);
        }
        const authParts = auth.split(" ");
        if (authParts.length !== 2) {
            console.log(messages.TOKEN_FORMAT);
            return Response.commonResponse(res, constants.ERROR.BAD_REQUEST, messages.TOKEN_FORMAT, error);
        }
        const [scheme, token] = authParts;
        if (new RegExp("^Bearer$").test(scheme)) {
            try {
                const { userId }  = await verify(token, SECRET);
                let user = await User.getUserData('_id', userId);
                req.currentUser = user;
                commonValidator(req, res, next)
                // next();
            } catch (e) {
                console.log(`${messages.ERROR_AUTH}: `, e.message);
            }
        } else {
            console.log(messages.TOKEN_FORMAT);
            return Response.commonResponse(res, constants.ERROR.UNAUTHENTICATED, messages.TOKEN_FORMAT, error);
        }
    } catch (error) {
        return Response.commonResponse(res, constants.ERROR.UNAUTHENTICATED, messages.ERROR, error);
    }
};

/**
 * Method to generate token from a given payload
 * @param {object} payload Payload to be injected in token
 * */
const createToken = payload => {
    const tokenPayload = Object.assign({ time: new Date().getTime() }, payload);
    return sign(tokenPayload, SECRET, { expiresIn: constants.TOKEN_VALIDITY });
};

module.exports = {
    createToken,
    authenticateUserWithToken,
};
