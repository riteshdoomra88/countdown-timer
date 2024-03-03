/**
 * @file index.js
 * @summary User routes
 * @description This file contains routes for user entity
 * */
const { timerList, saveTimer } = require('./timer.controller');

module.exports = router => {
    /**
     * @swagger
     * /timer:
     *  get:
     *      tags:
     *          - TIMER
     *      security:
     *      - JWT: []
     *      summary: Get all timer
     *      description: Returns all timer
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: An array of User Objects
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/timer'
     *          400:
    *              description: Bad Request
    *          401:
    *              description: Authentication Failed
    *          403:
    *              description: Not Authorized
    *          404:
    *              description: Not Found
    *          500:
    *              description: Internal Error
     *
     */
    router.get("/timer", timerList);
    router.post("/timer", saveTimer);
};

/**
* Add model definitions
* @swagger
* definitions:
*  timer:
*      type: object
*      properties:
*          _id:
*              type: string
*              example: 1233asdad1313
*          name:
*              type: string
*              example: abc
*          email:
*              type: string
*              example: abc@def.com
*/