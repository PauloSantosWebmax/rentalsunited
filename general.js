
'use strict'

// grab the authentication
const { authentication, setCredentials } = require('./authentication')
const RURequest = require('./request')

/**
 * List available languages
 * @return xmlDocument
 */
const listLanguages = () => {
  return RURequest(`
    <Pull_ListLanguages_RQ>
      ${authentication()}
    </Pull_ListLanguages_RQ>
  `);
};

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

    return RURequest(`<Push_PutAvb_RQ>
                        ${authentication()}
                        <Calendar PropertyID="${propertyId}">
                          ${availability}
                        </Calendar>
                      </Push_PutAvb_RQ>`);
}

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
 * Get a list of property types OTA supported
 *
 * @return xmlDocument
 */
const getPropertyTypesOTA = () => {
    return RURequest(`<Pull_ListOTAPropTypes_RQ>>
                ${authentication()}
               </<Pull_ListOTAPropTypes_RQ>>`);
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
 * @param mixed fromDate, From date (yyyy-mm-dd hh:ii:ss)
 * @param mixed toDate, to date (yyyy-mm-dd hh:ii:ss)
 * @param mixed locationID
 * @return xmlDocument
 */
const getReservations = (fromDate, toDate, locationID = 0) => {
    return RURequest(`<Pull_ListReservations_RQ>
                ${authentication()}
                <DateFrom>${fromDate}</DateFrom>
                <DateTo>${toDate}</DateTo>
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

/**
 * Set descriptions
 *
 * @return xmlDocument
 */
const descriptions = (descriptionsSetup) => {

    let d = '';

    // set early departure fee
    if (descriptionsSetup.length) {
        d = '<Descriptions>';
        descriptionsSetup.forEach(i => {
            d = `${d}<Description LanguageID="${i.LanguageID}">
                        <Text>${i.Text}</Text>
                     </Description>`
        })
        d = `${d}</Descriptions>`
    }

    return d;
}

/**
 * Format images as XML
 *
 * @return xmlDocument
 */
const formatImages = (images) => {

    let imagesXml = '<Images>';

    if (images.length) {
        images.forEach(img => {
            imagesXml = `${imagesXml}
                            <Image ImageTypeID="${img.ImageTypeID}">${img.Source}</Image>` 
        })
        imagesXml = `${imagesXml}</Images>`;
    }

    return imagesXml;
}

/**
 * Set the arrival instructions
 *
 * @return xmlDocument
 */
const arrivalInstructions = (arrivalSetup) => {

    let hta = '',
        ps = '';

    // set how to arrive
    if (arrivalSetup.HowToArrive.length) {
        hta = '<HowToArrive>';
        arrivalSetup.HowToArrive.forEach(i => {
            hta = `${hta}<Text LanguageID="${i.LanguageID}">${i.Text}</Text>`
        })
        hta = `${hta}</HowToArrive>`
    }

    // set pickup service
    if (arrivalSetup.PickupService.length) {
        ps = '<PickupService>';
        arrivalSetup.PickupService.forEach(i => {
            ps = `${ps}<Text LanguageID="${i.LanguageID}">${i.Text}</Text>`
        })
        ps = `${ps}</PickupService>`
    }

    return `<ArrivalInstructions>
                <Landlord>${arrivalSetup.Landlord}</Landlord>
                <Email>${arrivalSetup.Email}</Email>
                <Phone>${arrivalSetup.Phone}</Phone>
                <DaysBeforeArrival>${arrivalSetup.DaysBeforeArrival}</DaysBeforeArrival>
                ${hta}
                ${ps}
            </ArrivalInstructions>`
}

/**
 * Set check in/out
 *
 * @return xmlDocument
 */
const checkInOut = (checkInOutSetup) => {

    let laf = '',
        edf = '';

    // set how to arrive
    if (checkInOutSetup.LateArrivalFees.length) {
        laf = '<LateArrivalFees>';
        checkInOutSetup.LateArrivalFees.forEach(i => {
            laf = `${laf}<LateArrivalFee From="${i.From}" To="${i.To}">${i.Value}</LateArrivalFee>`
        })
        laf = `${laf}</LateArrivalFees>`
    }

    // set early departure fee
    if (checkInOutSetup.EarlyDepartureFees.length) {
        edf = '<EarlyDepartureFees>';
        checkInOutSetup.EarlyDepartureFees.forEach(i => {
            edf = `${edf}<EarlyDepartureFee From="${i.From}" To="${i.To}">${i.Value}</EarlyDepartureFee>`
        })
        edf = `${edf}</EarlyDepartureFees>`
    }

    return `<CheckInOut>
                <CheckInFrom>${checkInOutSetup.CheckInFrom}</CheckInFrom>
                <CheckInTo>${checkInOutSetup.CheckInTo}</CheckInTo>
                <CheckOutUntil>${checkInOutSetup.CheckOutUntil}</CheckOutUntil>
                <Place>apartment</Place>
                ${laf}
                ${edf}
            </CheckInOut>`;
}

/**
 * Set payments
 *
 * @return xmlDocument
 */
const paymentMethods = (paymentMethods) => {

    let pm = '';

    // set early departure fee
    if (paymentMethods.length) {
        pm = '<PaymentMethods>';
        paymentMethods.forEach(i => {
            pm = `${pm}<PaymentMethod PaymentMethodID="${i.PaymentMethodID}">${i.Value}</PaymentMethod>`
        })
        pm = `${pm}</PaymentMethods>`
    }

    return pm;
}

/**
 * Set cancelation policies
 *
 * @return xmlDocument
 */
const cancellationPolicies = (cancellationPoliciesSetup) => {

    let cp = '';

    // set early departure fee
    if (cancellationPoliciesSetup.length) {
        cp = '<CancellationPolicies>';
        cancellationPoliciesSetup.forEach(i => {
            cp = `${cp}<CancellationPolicy ValidFrom="${i.ValidFrom}" ValidTo="${i.ValidTo}">${i.Value}</CancellationPolicy>`
        })
        cp = `${cp}</CancellationPolicies>`
    }

    return cp;
}

/**
 * Set addicinal fees
 *
 * @return xmlDocument
 */
const additionalFees = (additionalFeesSetUp) => {

    let af = '';

    // set early departure fee
    if (additionalFeesSetUp.length) {
        af = '<AdditionalFees>';
        additionalFeesSetUp.forEach(i => {
            af = `${af}<AdditionalFee KindID="${i.KindID}" DiscriminatorID="${i.DiscriminatorID}" Order="${i.Order}" Name="${i.Name}" Optional="${i.Optional}" Refundable="${i.Refundable}" FeeTaxType="${i.FeeTaxType}">
                         <Value>${i.Value}</Value>
                       </AdditionalFee>`
        })
        af = `${af}</AdditionalFees>`
    }

    return af;
}

/**
 * Set up rooms amenities
 *
 * @return xmlDocument
 */
const compositionRoomsAmenities = (compositionRoomsAmenities) => {

    let cra = '';

    if (compositionRoomsAmenities == undefined) return ''

    if (compositionRoomsAmenities.length) {
        cra = '<CompositionRoomsAmenities>'
        compositionRoomsAmenities.forEach(i => {
            cra = `${cra}<CompositionRoomAmenities CompositionRoomID="${i.CompositionRoomID}">
                            <Amenity Count="${i.Count}">${i.Count}</Amenity>
                         </CompositionRoomAmenities>`
        })
        cra = `${cra}</CompositionRoomsAmenities>`
    }

    return cra;
}

/**
 * Set amenities
 *
 * @return xmlDocument
 */
const amenities = (amenities) => {

    let a = '';

    if (amenities.length) {
        a = '<Amenities>'
        amenities.forEach(i => {
            a = `${a}<Amenity Count="${i.Count}">${i.Value}</Amenity>`
        })
        a = `${a}</Amenities>`
    }

    return a;
}

/**
 * Add new fresh property
 *
 * @param object basicInfo
 * @param array images
 * @param object descriptionsSetup
 * @param object arrivalInstructions
 * @param object checkInOutSetup
 * @param object paymentMethodsSetup
 * @param object cancellationPoliciesSetup
 * @param object additionalFeesSetUp
 *
 * @return xmlDocument, confirmation of cancellation
 */
const addProperty = (property) => {

    let now = new Date().toISOString().split('T')[0];

    return RURequest(`<Push_PutProperty_RQ>
                ${authentication()}
                <Property>
                    <PUID BuildingID="-1">-1</PUID>
                    <Name>${property.BasicInfo.name}</Name>
                    <OwnerID>${property.BasicInfo.ownerId}</OwnerID>
                    <DetailedLocationID TypeID="3">${property.BasicInfo.detailedLocationID}</DetailedLocationID>
                    <LastMod NLA="false">${now}</LastMod>
                    <DateCreated>${now}</DateCreated>
                    <UserID>${property.BasicInfo.userId}</UserID>
                    <IsActive>true</IsActive>
                    <IsArchived>false</IsArchived>
                    <CleaningPrice>${property.BasicInfo.cleaningPrice}</CleaningPrice>
                    <Space>${property.BasicInfo.space}</Space>
                    <StandardGuests>${property.BasicInfo.standardGuests}</StandardGuests>
                    <CanSleepMax>${property.BasicInfo.canSleepMax}</CanSleepMax>
                    <PropertyTypeID>${property.BasicInfo.propertyTypeID}</PropertyTypeID>
                    <ObjectTypeID>${property.BasicInfo.objectTypeID}</ObjectTypeID>
                    <NoOfUnits>1</NoOfUnits>
                    <Floor>${property.BasicInfo.floor}</Floor>
                    <Street>${property.BasicInfo.street}</Street>
                    <ZipCode>${property.BasicInfo.zipCode}</ZipCode>
                    <Coordinates>
                        <Longitude>${property.BasicInfo.lng}</Longitude>
                        <Latitude>${property.BasicInfo.lat}</Latitude>
                    </Coordinates>
                    <Deposit DepositTypeID="${property.Deposit.DepositTypeID}">${property.Deposit.Value}</Deposit>
                    <SecurityDeposit DepositTypeID="${property.SecurityDeposit.DepositTypeID}">${property.SecurityDeposit.Value}</SecurityDeposit>
                    ${descriptions(property.Descriptions)}
                    ${formatImages(property.Images)}
                    ${arrivalInstructions(property.ArrivalInstructions)}
                    ${checkInOut(property.CheckInOut)}
                    ${paymentMethods(property.PaymentMethods)}
                    ${cancellationPolicies(property.CancellationPolicies)}
                    ${additionalFees(property.AdditionalFees)}
                    ${compositionRoomsAmenities(property.CompositionRoomsAmenities)}
                    ${amenities(property.Amenities)}
                </Property>
            </Push_PutProperty_RQ>`);
}

/**
 * Set min stay nights between dates
 *
 * @param string pid propertyId
 * @param array of dates range <{ DateFrom: 'YYYY-MM-DD', DateTo: 'YYYY-MM-DD', NumNights: '1' }>
 *
 * @return xmlDocument, confirmation of cancellation
 */
const setMinStay = (pid, propertyMinStays) => {

  let ms = '';

  if (propertyMinStays.length) {
    propertyMinStays.forEach(m => {
      ms += `<MinStay DateFrom="${m.DateFrom}" DateTo="${m.DateTo}">${m.NumNights}</MinStay>`;
    });
  }

  return RURequest(`<Push_PutMinstay_RQ>
                      ${authentication()}
                      <PropertyMinStay PropertyID="${pid}">
                        ${ms}
                      </PropertyMinStay>
                    </Push_PutMinstay_RQ>`);
};

/**
 * Get min stay nights between dates
 *
 * @param string pid propertyId
 * @param string from from date
 * @param string pid to date
 *
 * @return xmlDocument, confirmation of cancellation
 */
const getMinStay = (pid, from, to) => {
  return RURequest(`<Pull_ListPropertyMinStay_RQ>
                      ${authentication()}
                      <PropertyID>${pid}</PropertyID>
                      <DateFrom>${from}</DateFrom>
                      <DateTo>${to}</DateTo>
                    </Pull_ListPropertyMinStay_RQ>`);
};

const listAdditionFeesKinds = () => {
  return RURequest(`<Pull_ListAdditionalFeeKinds_RQ>
                      ${authentication()}
                    </Pull_ListAdditionalFeeKinds_RQ>`);
};

const listAdditionFeesTypes = () => {
  return RURequest(`<Pull_ListChangeoverTypes_RQ>
                      ${authentication()}
                    </Pull_ListChangeoverTypes_RQ>`);
};

const listAdditionFeesDiscriminators = () => {
  return RURequest(`<Pull_ListAdditionalFeeDiscriminators_RQ>
                      ${authentication()}
                    </Pull_ListAdditionalFeeDiscriminators_RQ>`);
};

module.exports = {
  listLanguages,
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
  getPropertyTypesOTA,
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
  setSeason,
  getMinStay,
  setMinStay,
  listAdditionFeesKinds,
  listAdditionFeesTypes,
  listAdditionFeesDiscriminators
}
