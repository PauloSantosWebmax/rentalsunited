# Rentals United
Package for rentalsunited API

Basic usage:
```
// Import to your project
let RU = require('rentalsunited')

// Set credentials to your app
RU.setCredentials('email', 'password')

// install vue dependencies
npm run install_api_packages

// Basic call to Rentals united
RU.getOwners().then(res => console.log(res.data))
              .catch(err => console.log(err))

```

***Available methods:***
- setCredentials()
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
- bookProperty()
- cancelBooking()
- getPropertyReservations(pid, fromDate, toDate)
- setCalendar(pid, fromDate, toDate, pax, RUPrice, clientPrice, alreadyPaid, name, surName, email, phone, skypeId, address, zipcode, cityId)


***Author: Paulo Santos***
