
'use strict'

const addProperty = require('./addProperty')

// grab the authentication
const { authentication, setCredentials } = require('./authentication')
const { setCalendar } = require('./priceAndAvailability')
const RURequest = require('./request')

/** 
 * Get prices and availability
 *
 * @param string pid | ru property id
 * @param string dateFrom | date start 0000-00-00
 * @param string dateTo | date to 0000-00-00
 * @return xmlDocument
 */
const getPricesAndAvailability = (pid, dateFrom, dateTo) => {
    return RURequest(`<Pull_ListPropertyPrices_RQ>
                          ${authentication()}
                          <PropertyID>${pid}</PropertyID>
                          <DateFrom>${dateFrom}</DateFrom>
                          <DateTo>${dateTo}</DateTo>
                      </Pull_ListPropertyPrices_RQ>`);
}

/**
 * Get a list of all payment methods available
 *
 * @return xmlDocument
 */
const getPaymentMethods = () => {
    return RURequest(`<Pull_ListPaymentMethods_RQ>
                          ${authentication()}
                      </Pull_ListPaymentMethods_RQ>`);
}

/**
 * Get a list of agents
 *
 * @return xmlDocument
 */
const getAgents = () => {
    return RURequest(`<Pull_GetAgents_RQ>
                 ${authentication()}
               </Pull_GetAgents_RQ>`);
}

/**
 * Get a list of all the location where properties are provided
 * 
 * @return xmlDocument
 */
const getLocations = () => {
    return RURequest(`<Pull_ListLocations_RQ>
                  ${authentication()}
               </Pull_ListLocations_RQ>`);
}

/**
 * Get a list of all owners, including name, phonenumber and email
 * 
 * @return xmlDocument
 */
const getOwners = () => {
    return RURequest(`<Pull_ListAllOwners_RQ>
                ${authentication()}
               </Pull_ListAllOwners_RQ>`);
}

/**
 * Get the details of a single owner, Email, phone number etc..
 * 
 * @param mixed ownerId, Owner ID
 * @param mixed extended
 * @return xmlDocument
 */
const getOwnerDetails = (ownerId) => {
    return RURequest(`<Pull_GetOwnerDetails_RQ>
                 ${authentication()}
                 <OwnerID>${ownerId}</OwnerID>
               </Pull_GetOwnerDetails_RQ>`);
}

/**
 * Get a list of all properties in a location
 * 
 * @param mixed locCode, Location ID listed in getLocations()
 * @return xmlDocument
 */
const getProperties = (ownerId) => {
    return RURequest(`<Pull_ListOwnerProp_RQ>
                 ${authentication()}
                 <OwnerID>${ownerId}</OwnerID>
               </Pull_ListOwnerProp_RQ>`);
}

/**
 * Get all property details based on a property ID from getPropertiesList()
 * 
 * @param mixed pid, property ID
 * @return xmlDocument
 */
const getProperty = (propertyId) => {
    return RURequest(`<Pull_ListSpecProp_RQ>
                ${authentication()}
                <PropertyID>${propertyId}</PropertyID>
               </Pull_ListSpecProp_RQ>`);
}

/**
 * Get a list of all properties in a location
 * 
 * @param mixed locCode, Location ID listed in getLocations()
 * @return xmlDocument
 */
const getPropertiesList = (locCode) => {
    return RURequest(`<Pull_ListProp_RQ>
                ${authentication()}
                <LocationID>${locCode}</LocationID>
              </Pull_ListProp_RQ>`);
}

/**
 * Get the details for the location from getLocations()
 * 
 * @param mixed locId, location ID
 * @return xmlDocument
 */
const getLocationDetails = (locId) => {
    return RURequest(`<Pull_GetLocationDetails_RQ>
               ${authentication()}     
                <LocationID>${locId}</LocationID>
              </Pull_GetLocationDetails_RQ>`);
}

/**
 * Get all amenities available per room
 * 
 * @return xmlDocument
 */
const getRoomAmenities = () => {
    return RURequest(`<Pull_ListAmenitiesAvailableForRooms_RQ>
                ${authentication()}    
              </Pull_ListAmenitiesAvailableForRooms_RQ>`);
}

/**
 * Get a list of all amenities available
 * 
 * @return xmlDocument
 */
const getAmenities = () => {
    return RURequest(`<Pull_ListAmenities_RQ>
                ${authentication()}
              </Pull_ListAmenities_RQ>`);
}

/**
 * Get a list of property types supported, one bedroom, tho bedroom, etc
 * 
 * @return xmlDocument
 */
const getPropertyTypes = () => {
    return RURequest(`<Pull_ListPropTypes_RQ>
                ${authentication()}
               </Pull_ListPropTypes_RQ>`);
}

/**
 * Get a list of all the currencies for each location
 * 
 * @return xmlDocument
 */
const getLocationCurrencies = () => {
    return RURequest(`<Pull_ListCurrenciesWithCities_RQ>
                ${authentication()}
               </Pull_ListCurrenciesWithCities_RQ>`);
}

/**
 * Get the blocked dates for a property
 * 
 * @param mixed $pid, property ID
 * @return xmlDocument
 */
const getCalendar = (pid, blocks = false) => {

    let now = new Date().toISOString().split('T')[0],
        dte = new Date();
        dte.setDate(dte.getDate() + 364),
        dte = dte.toISOString().split('T')[0];

    let tag = 'Pull_ListPropertyAvailabilityCalendar_RQ';

    if (blocks) {
        tag = 'Pull_ListPropertyBlocks_RQ'
    }

    return RURequest(`<${tag}>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
                <DateFrom>${now}</DateFrom>
                <DateTo>${dte}</DateTo>
              </${tag}>`);
}

/**
 * Get the prices for a property
 * 
 * @param mixed pid, property ID
 * @return xmlDocument
 */
const getRates = (pid) => {

    let now = new Date().toISOString().split('T')[0],
        dte = new Date();
        dte.setDate(dte.getDate() + 364),
        dte = dte.toISOString().split('T')[0];

    return RURequest(`<Pull_ListPropertyPrices_RQ>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
                <DateFrom>${now}</DateFrom>
                <DateTo>${dte}</DateTo>
              </Pull_ListPropertyPrices_RQ>`);
}

/**
 * Get disounts for a property in case set
 * 
 * @param mixed $pid, property ID
 * @return xmlDocument
 */
const getDiscounts = (pid) => {
    return RURequest(`<Pull_ListPropertyDiscounts_RQ>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
               </Pull_ListPropertyDiscounts_RQ>`);                
}

/**
 * Get the realtime rate for a property
 * 
 * @param mixed pid, property ID
 * @param mixed fromDate, From date (yyyy-mm-dd)
 * @param mixed toDate, To date (yyyy-mm-dd)
 * @return xmlDocument
 */
const getRealtimeRates = (pid, fromDate, toDate) => {
    return RURequest(`<Pull_GetPropertyAvbPrice_RQ>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
                <DateFrom>${fromDate}</DateFrom>
                <DateTo>${toDate}</DateTo>
              </Pull_GetPropertyAvbPrice_RQ>`);         
}

/**
 * Get the minimum stay for a property
 * 
 * @param mixed pid, property ID
 * @return xmlDocument
 */
const getMinstay = (pid) => {

    let now = new Date().toISOString().split('T')[0],
        dte = new Date();
        dte.setDate(dte.getDate() + (364 * 5 - 1)),
        dte = dte.toISOString().split('T')[0];

    return RURequest(`<Pull_ListPropertyMinStay_RQ>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
                <DateFrom>${now}</DateFrom>
                <DateTo>${dte}</DateTo>
              </Pull_ListPropertyMinStay_RQ>`);
}

/**
 * Get all reservations for especific property
 *
 * @param mixed fromDate, From date (yyyy-mm-dd)
 * @param mixed toDate, to date (yyyy-mm-dd)
 * @param mixed locationID
 * @return xmlDocument
 */
const getReservations = (fromDate, toDate, locationID = 0) => {
    return RURequest(`<Pull_ListReservations_RQ>
                ${authentication()}
                <DateFrom>${fromDate} 00:00:00</DateFrom>
                <DateTo>${toDate} 00:00:00</DateTo>
                <LocationID>${locationID}</LocationID>
              </Pull_ListReservations_RQ>`);
}

/**
 * Get property price for available dates
 *
 * @param mixed pid, property ID
 * @param mixed fromDate, From date (yyyy-mm-dd)
 * @param mixed toDate, to date (yyyy-mm-dd)
 * @return xmlDocument
 */
const getPropertyPrice = (pid, dateFrom, dateTo) => {
    return RURequest(`<Pull_GetPropertyPrice_RQ>
                        ${authentication()}
                        <PropertyID>${pid}</PropertyID>
                        <DateFrom>${dateFrom}</DateFrom>
                        <DateTo>${dateTo}</DateTo>
                      </Pull_GetPropertyPrice_RQ>`);
}

/**
 * Generate stay infos xml
 *
 * @param array | stayInfos
 * @return xmlDocument
 */
const generateStayInfos = (stayInfos) => {

    let si = '';

    if (typeof stayInfos != 'object' || !stayInfos.length) {
        return si;
    }

    stayInfos.forEach(stayInfo => {
        si += `<StayInfo>
                <PropertyID>${stayInfo.pid}</PropertyID>
                <DateFrom>${stayInfo.fromDate}</DateFrom>
                <DateTo>${stayInfo.toDate}</DateTo>
                <NumberOfGuests>${stayInfo.pax}</NumberOfGuests>
                <Costs>
                  <RUPrice>${stayInfo.RUPrice}</RUPrice>
                  <ClientPrice>${stayInfo.clientPrice}</ClientPrice>
                  <AlreadyPaid>${stayInfo.alreadyPaid}</AlreadyPaid>
                </Costs>
               </StayInfo>`
    })

    return si;
}

/**
 * Make an online booking for a property, in case of success returns a reservation ID
 * 
 * @param object | reservation
 * -- mixed pid, property ID
 * -- mixed fromDate, From date (yyyy-mm-dd) 
 * -- mixed toDate, To date (yyyy-mm-dd)
 * -- mixed pax, Number of people
 * -- mixed RUPrice, Price by Rentals United
 * -- mixed clientPrice, Price offered to client
 * -- mixed alreadyPaid, Amount already paid
 * -- mixed name, Name of the client
 * -- mixed surName, Sur name of the client
 * -- mixed email, Email address of the client
 * -- mixed phone, Phone number of the client
 * -- mixed skypeId, Skype id/name (in case provided)
 * -- mixed address, Address of the client
 * -- mixed zipcode, Zip code of the client (in case provided)
 * -- mixed cityId, Rentals United City ID of the client from getLocations()
 * @return xmlDocument, reservation ID
 */
const bookProperty = (reservation) => {
    return RURequest(`<Push_PutConfirmedReservationMulti_RQ>
                ${authentication()}
                <Reservation>
                    <StayInfos>
                        ${generateStayInfos(reservation.StayInfos)}
                    </StayInfos>
                    <CustomerInfo>
                        <Name>${reservation.name}</Name>
                        <SurName>${reservation.surName}</SurName>
                        <Email>${reservation.email}</Email>
                        <Phone>${reservation.phone}</Phone>
                        <SkypeID>${reservation.skypeId}</SkypeID>
                        <Address>${reservation.address}</Address>
                        <ZipCode>${reservation.zipcode}</ZipCode>
                        <ContryID>${reservation.cityId}</ContryID>
                    </CustomerInfo>
                </Reservation>
            </Push_PutConfirmedReservationMulti_RQ>`);
} 

/**
 * Cancel a booking
 * 
 * @param mixed reservationID, reservation ID provided by bookProperty()
 * @return xmlDocument, confirmation of cancellation
 */
const cancelBooking = (reservationID) => {
    return RURequest(`<Push_CancelReservation_RQ>
                ${authentication()}
                <ReservationID>${reservationID}</ReservationID>
              </Push_CancelReservation_RQ>`);
}

/**
 * Set the notification url for the application
 *
 * @param string url
 * @return xmlDocument
 */
const setLNMPutHandlerUrl = (url) => {
    return RURequest(`<LNM_PutHandlerUrl_RQ>
                        ${authentication()}
                        <HandlerUrl>${url}</HandlerUrl>
                      </LNM_PutHandlerUrl_RQ>`);
}

/**
 * Set seasons
 *
 * @param String pid | property id on ru
 * @param Array seasons | array of seasons
 * @return xmlDocument
 */
const setSeason = (pid, seasons) => {

    let seasonsXml = ''

    if (seasons.length) {
        seasons.forEach(season => {
            seasonsXml += `<Season DateFrom="${season.DateFrom}" DateTo="${season.DateTo}">
                              <Price>${season.Price}</Price>
                              <Extra>${season.Extra}</Extra>`

                              if (season.EGPS.length) {

                                let egps = `<EGPS>`

                                  season.EGPS.forEach(e => {
                                    egps += `<EGP ExtraGuests="${e.ExtraGuests}">
                                              <Price>${e.Price}</Price>
                                             </EGP>`
                                  })
                                
                                egps += `</EGPS>`
                                seasonsXml += egps
                              }
                            seasonsXml += `</Season>`
        })
    }

    return RURequest(`<Push_PutPrices_RQ>
                        ${authentication()}
                        <Prices PropertyID="${pid}">
                            ${seasonsXml}
                        </Prices>
                      </Push_PutPrices_RQ>`);
}

module.exports = {
    setCredentials,
    RURequest,
    getPaymentMethods,
    getAgents,
    getLocations,
    getOwners,
    getOwnerDetails,
    getProperties,
    getProperty,
    getPropertiesList,
    addProperty,
    getLocationDetails,
    getRoomAmenities,
    getAmenities,
    getPropertyTypes,
    getLocationCurrencies,
    getCalendar,
    getRates,
    getDiscounts,
    getRealtimeRates,
    getMinstay,
    bookProperty,
    cancelBooking,
    getReservations,
    getPropertyPrice,

    // priceAndAvailability
    setCalendar,
    getPricesAndAvailability,

    // notifications
    setLNMPutHandlerUrl,
    setSeason
}
