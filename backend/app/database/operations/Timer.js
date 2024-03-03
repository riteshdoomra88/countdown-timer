// **********************************************************************
//  Purpose: Timer Operation Layer
//  SN  Date       Change Description      Modified By
//  1   03/03/2024     Base Version        Ritesh
// **********************************************************************

const path = require('path');
const { Schema } = require(path.join(__basedir, 'app', 'config'));
const { Base } = require('./Base');
class Timer extends Base {
    constructor() {
        super()
        this._modelName = Schema.TIMER;
        super.initialize(this)
    }

    /**
     * Returns all the user from database.
     *
     *
     * @since      1.0.0
     * @access     public
     *
     *
     * @alias    getTimerData
     * @memberof TimerClass
     *
     * @param offset sets the offset
     * @param limit sets the limit
     * @return {Promise} Transactions Data
     */
    async getTimerData(fieldKey, fieldValue) {
        let query = (fieldKey) ? { [fieldKey]: fieldValue } : {};
        return await this._getOne(query);
    }

    async getData (limit = 10, offset = 0) {
        return await this._get(false,false,false,false,limit, offset);
      }
    
      async insertData (data) {
        return await this._create(data);
      }

}

module.exports = new Timer()