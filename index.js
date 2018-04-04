
'use strict'

const RequestRU = require('./rentalsUnited/RequestRU')
const configs = require('./rentalsUnited/configs')
const addProperty = require('./rentalsUnited/addProperty')

// grab the authentication
const authentication = require('./rentalsUnited/authentication')
const { setCalendar } = require('./rentalsUnited/priceAndAvailability')

/**
 * Get a list of all payment methods available
 *
 * @return xmlDocument
 */
const getPaymentMethods = () => {
    return `<Pull_ListPaymentMethods_RQ>
                ${authentication()}
            </Pull_ListPaymentMethods_RQ>`;
}

/**
 * Get a list of agents
 *
 * @return xmlDocument
 */
const getAgents = () => {
    return `<Pull_GetAgents_RQ>
                ${authentication()}
            </Pull_GetAgents_RQ>`;
}

/**
 * Get a list of all the location where properties are provided
 * 
 * @return xmlDocument
 */
const getLocations = () => {
    return `<Pull_ListLocations_RQ>
               ${authentication()}
            </Pull_ListLocations_RQ>`;
}

/**
 * Get a list of all owners, including name, phonenumber and email
 * 
 * @return xmlDocument
 */
const getOwners = () => {
    return `<Pull_ListAllOwners_RQ>
                ${authentication()}
            </Pull_ListAllOwners_RQ>`;
}

/**
 * Get the details of a single owner, Email, phone number etc..
 * 
 * @param mixed ownerId, Owner ID
 * @param mixed extended
 * @return xmlDocument
 */
const getOwnerDetails = (ownerId) => {
    return `<Pull_GetOwnerDetails_RQ>
                ${authentication()}
                <OwnerID>${ownerId}</OwnerID>
            </Pull_GetOwnerDetails_RQ>`;
}

/**
 * Get a list of all properties in a location
 * 
 * @param mixed locCode, Location ID listed in getLocations()
 * @return xmlDocument
 */
const getProperties = (ownerId) => {
    return `<Pull_ListOwnerProp_RQ>
                ${authentication()}
                <OwnerID>${ownerId}</OwnerID>
            </Pull_ListOwnerProp_RQ>`;
}

/**
 * Get all property details based on a property ID from getPropertiesList()
 * 
 * @param mixed pid, property ID
 * @return xmlDocument
 */
const getProperty = (propertyId) => {
    return `<Pull_ListSpecProp_RQ>
                ${authentication()}
                <PropertyID>${propertyId}</PropertyID>
            </Pull_ListSpecProp_RQ>`;
}

/**
 * Get a list of all properties in a location
 * 
 * @param mixed locCode, Location ID listed in getLocations()
 * @return xmlDocument
 */
const getPropertiesList = (locCode) => {
    return `<Pull_ListProp_RQ>
                ${authentication()}
                <LocationID>${locCode}</LocationID>
            </Pull_ListProp_RQ>`;
}

/**
 * Get the details for the location from getLocations()
 * 
 * @param mixed locId, location ID
 * @return xmlDocument
 */
const getLocationDetails = (locId) => {
    return `<Pull_GetLocationDetails_RQ>
               ${authentication()}     
                <LocationID>${locId}</LocationID>
            </Pull_GetLocationDetails_RQ>`;
}

/**
 * Get all amenities available per room
 * 
 * @return xmlDocument
 */
const getRoomAmenities = () => {
    return `<Pull_ListAmenitiesAvailableForRooms_RQ>
                ${authentication()}    
            </Pull_ListAmenitiesAvailableForRooms_RQ>`;
}

/**
 * Get a list of all amenities available
 * 
 * @return xmlDocument
 */
const getAmenities = () => {
    return `<Pull_ListAmenities_RQ>
                ${authentication()}
            </Pull_ListAmenities_RQ>`;
}

/**
 * Get a list of property types supported, one bedroom, tho bedroom, etc
 * 
 * @return xmlDocument
 */
const getPropertyTypes = () => {
    return `<Pull_ListPropTypes_RQ>
                ${authentication()}
            </Pull_ListPropTypes_RQ>`;
}

/**
 * Get a list of all the currencies for each location
 * 
 * @return xmlDocument
 */
const getLocationCurrencies = () => {
    return `<Pull_ListCurrenciesWithCities_RQ>
                ${authentication()}
            </Pull_ListCurrenciesWithCities_RQ>`;
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

    return `<${tag}>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
                <DateFrom>${now}</DateFrom>
                <DateTo>${dte}</DateTo>
            </${tag}>`;
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

    return `<Pull_ListPropertyPrices_RQ>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
                <DateFrom>${now}</DateFrom>
                <DateTo>${dte}</DateTo>
            </Pull_ListPropertyPrices_RQ>`;
}

/**
 * Get disounts for a property in case set
 * 
 * @param mixed $pid, property ID
 * @return xmlDocument
 */
const getDiscounts = (pid) => {
    return `<Pull_ListPropertyDiscounts_RQ>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
            </Pull_ListPropertyDiscounts_RQ>`;                
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
    return `<Pull_GetPropertyAvbPrice_RQ>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
                <DateFrom>${fromDate}</DateFrom>
                <DateTo>${toDate}</DateTo>
            </Pull_GetPropertyAvbPrice_RQ>`;         
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

    return `<Pull_ListPropertyMinStay_RQ>
                ${authentication()}
                <PropertyID>${pid}</PropertyID>
                <DateFrom>${now}</DateFrom>
                <DateTo>${dte}</DateTo>
            </Pull_ListPropertyMinStay_RQ>`;
}

/**
 * Get all reservations for especific property
 *
 * @param mixed pid, property ID
 * @param mixed fromDate, From date (yyyy-mm-dd)
 * @param mixed toDate, to date (yyyy-mm-dd)
 * @return xmlDocument
 */
const getPropertyReservations = (pid, fromDate, toDate) => {
    return `<Pull_ListReservations_RQ>
                ${authentication()}
                <DateFrom>${fromDate} 00:00:00</DateFrom>
                <DateTo>${toDate} 00:00:00</DateTo>
                <LocationID>0</LocationID>
            </Pull_ListReservations_RQ>`
}

/**
 * Make an online booking for a property, in case of success returns a reservation ID
 * 
 * @param mixed pid, property ID
 * @param mixed fromDate, From date (yyyy-mm-dd) 
 * @param mixed toDate, To date (yyyy-mm-dd)
 * @param mixed pax, Number of people
 * @param mixed RUPrice, Price by Rentals United
 * @param mixed clientPrice, Price offered to client
 * @param mixed alreadyPaid, Amount already paid
 * @param mixed name, Name of the client
 * @param mixed surName, Sur name of the client
 * @param mixed email, Email address of the client
 * @param mixed phone, Phone number of the client
 * @param mixed skypeId, Skype id/name (in case provided)
 * @param mixed address, Address of the client
 * @param mixed zipcode, Zip code of the client (in case provided)
 * @param mixed cityId, Rentals United City ID of the client from getLocations()
 * @return xmlDocument, reservation ID
 */
const bookProperty = (pid, fromDate, toDate, pax, RUPrice, clientPrice, alreadyPaid, name, surName, email, phone, skypeId = '', address, zipcode = '', cityId) => {
    return `<Push_PutConfirmedReservationMulti_RQ>
                ${authentication()}
                <Reservation>
                    <StayInfos>
                        <StayInfo>
                            <PropertyID>${pid}</PropertyID>
                            <DateFrom>${fromDate}</DateFrom>
                            <DateTo>${toDate}</DateTo>
                            <NumberOfGuests>${pax}</NumberOfGuests>
                            <Costs>
                                <RUPrice>${RUPrice}</RUPrice>
                                <ClientPrice>${clientPrice}</ClientPrice>
                                <AlreadyPaid>${alreadyPaid}</AlreadyPaid>
                            </Costs>
                        </StayInfo>
                    </StayInfos>
                    <CustomerInfo>
                        <Name>${name}</Name>
                        <SurName>${surName}</SurName>
                        <Email>${email}</Email>
                        <Phone>${phone}</Phone>
                        <SkypeID>${skypeId}</SkypeID>
                        <Address>${address}</Address>
                        <ZipCode>${zipcode}</ZipCode>
                        <ContryID>${cityId}</ContryID>
                    </CustomerInfo>
                </Reservation>
            </Push_PutConfirmedReservationMulti_RQ>`;
} 

/**
 * Cancel a booking
 * 
 * @param mixed reservationID, reservation ID provided by bookProperty()
 * @return xmlDocument, confirmation of cancellation
 */
const cancelBooking = (reservationID) => {
    return `<Push_CancelReservation_RQ>
                ${authentication()}
                <ReservationID>${reservationID}</ReservationID>
            </Push_CancelReservation_RQ>`;
}

module.exports = {
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
    getPropertyReservations,
    setCalendar,
    configs,
    RequestRU
}
