
'use strict'

// grab the authentication
const authentication = require('./authentication')

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
    if (arrivalSetup.length) {
        hta = '<HowToArrive>';
        arrivalSetup.forEach(i => {
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
            af = `${af}<AdditionalFee KindID="${i.KindID}" DiscriminatorID="${i.DiscriminatorID}" Order="${i.Order}">
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

    return `<Push_PutProperty_RQ>
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
                    <ObjectTypeID>35</ObjectTypeID>
                    <NoOfUnits>1</NoOfUnits>
                    <Floor>${property.BasicInfo.floor}</Floor>
                    <Street>${property.BasicInfo.street}</Street>
                    <ZipCode>${property.BasicInfo.zipCode}</ZipCode>
                    <Coordinates>
                        <Longitude>${property.BasicInfo.lng}</Longitude>
                        <Latitude>${property.BasicInfo.lat}</Latitude>
                    </Coordinates>
                    <Deposit DepositTypeID="3">15.00</Deposit>
                    <SecurityDeposit DepositTypeID="5">85.00</SecurityDeposit>
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
            </Push_PutProperty_RQ>`;
}

module.exports = addProperty
