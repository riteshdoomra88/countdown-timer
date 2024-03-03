// **********************************************************************
//  Purpose: Validator Json
//  SN  Date       Change Description      Modified By
//  1   03/03/2024     Base Version        Ritesh
// **********************************************************************


/* Required : true
   Alternative : option
   Type : body / params / query
*/

const Requests = {
    TIMER: {
        type: 'body',
        timerTime:{
            required:true,
            type: 'number',
        },
    },
};

module.exports = {
    Requests
};