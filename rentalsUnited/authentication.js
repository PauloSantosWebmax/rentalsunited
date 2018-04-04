
'use strict'

/**
 * Get authentication
 *
 * @return string | xml authentication block 
 */
const authentication = () => {
    return `<Authentication>
                <UserName>${process.env.RU_USERNAME}</UserName>
                <Password>${process.env.RU_PASSWORD}</Password>
            </Authentication>`
}

module.exports = authentication
