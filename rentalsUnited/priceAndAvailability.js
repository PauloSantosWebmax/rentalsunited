
'use strict'

// grab the authentication
const authentication = require('./authentication')

/**
 * Set calendar
 *
 * @param string propertyId
 * @param object dates
 * @return xmlDocument
 */
const setCalendar = (propertyId, dates) => {

    let availability = '';

    if (dates.length) {
        dates.forEach((date, key) => {
            availability = `${availability}<Availability DateFrom="${date.DateFrom}" DateTo="${date.DateTo}">${date.Value}</Availability>`
        });
    }

    return `<Push_PutAvb_RQ>
                ${authentication()}
                <Calendar PropertyID="${propertyId}">
                    ${availability}
                </Calendar>
            </Push_PutAvb_RQ>`;
}

module.exports = {
    setCalendar
}
