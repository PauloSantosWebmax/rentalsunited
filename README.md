# Rentals United

![RENTALS UNITED](https://new.rentalsunited.com/images/logo_new.svg)

Package for rentalsunited API

Basic usage:
```
// Import to your project
let RU = require('rentalsunited')

// Set credentials to your app
RU.setCredentials('email', 'password')

// Basic call to Rentals united
RU.getOwners().then(res => console.log(res.data))
              .catch(err => console.log(err))

```

Insert a reservation:

```
// create a reservation object
let reservation = {
    StayInfos: [
      {
        pid: '1790744',
        fromDate: '2018-05-18',
        toDate: '2018-05-20',
        pax: '2',
        RUPrice: '4063.11',
        clientPrice: '4130.64',
        alreadyPaid: '0'
      }
    ],
    name: 'John',
    surName: 'Snow',
    email: 'js@gmail.com',
    phone: '960000000',
    skypeId: '',
    address: 'Street o programming well',
    zipcode: '400',
    cityId: '42'
}

// make a call
RU.bookProperty(reservation).then(res => console.log(res.data))
                            .catch(err => console.log(err))
```

Create seasons for a specific property:

```
// create seasons for a single property
RU.setSeason('125893',{
    "DateFrom": "2018-04-26",
    "DateTo": "2018-04-30",
    "Price": "100",
    "Extra": "120",
    "EGPS": [
        {
          "ExtraGuests": "1",
          "Price": "120"
        }
    ]
})
```

_* All methods should return an XML document_

***Available methods:***
- setCredentials(email, password)
- RURequest()
- getPaymentMethods()
- getAgents()
- getLocations()
- getOwners()
- getOwnerDetails(ownerId)
- getProperties(ownerId)
- getProperty(propertyId)
- getPropertiesList(locCode)
- addProperty(property)
- getLocationDetails()
- getRoomAmenities()
- getAmenities()
- getPropertyTypes()
- getLocationCurrencies()
- getCalendar(pid, blocks)
- getRates(pid)
- getDiscounts(pid)
- getRealtimeRates(pid, fromDate, toDate)
- getMinstay(pid)
- bookProperty(reservation)
- cancelBooking()
- getReservations(fromDate, toDate, locationID)
- getPropertyPrice(pid, fromDate, toDate)
- setCalendar(pid, fromDate, toDate, pax, RUPrice, clientPrice, alreadyPaid, name, surName, email, phone, skypeId, address, zipcode, cityId)
- setLNMPutHandlerUrl(url)
- setSeason(pid, seasons)
- getPricesAndAvailability(pid, dateFrom, dateTo)

***Rentals United documentation***

http://rm.rentalsunited.com/api/RUSpecification.pdf

http://rm.rentalsunited.com/api/RUQuickStartGuide.pdf

***Author: Paulo Santos***
