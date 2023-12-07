# Library XYZ

## Running locally
### Live demo
https://library-xyz.fiq.me

### Install dependencies 
`npm run install`

### Running the project
`npm run dev`

### Testing the project
`npm run test`

### Building the project
`npm run build` will produce a `dist` folder that has the compiled code.

## Deployment Information
This project is deployed to Vercel and has automatic production deployments on pushes to the `main` branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamfeek%2Flibrary-xyz)

## Requirements

### Background

Library XYZ operates from 12pm to 8pm daily, booking of available pod can be made through the online web portal. Upon successful booking, pod booking details shall be displayed on the screen.

### Functional Specs

Design and develop an online web portal, where the user are able to fill up the library pod booking form and upon submission, the user will see an acknowledge page which contains their booking details.

### Form Filling

- Name
- NRIC/FIN
- Pod Number
  - Dropdown options varies from pod 1 to pod 8
- Pod Location
  - Disabled Text Field
  - Auto-populated based on Pod Number selection
  - free to decide what to be displayed, such as Green Room, Blue Room etc
- Date of Booking
  - Datepicker
- Timing of Booking
  - Dropdown options for timing of booking is 12pm, 12.30pm, 1pm and so on
- Duration of Booking
  - Dropdown option of 30mins, 1 hour, 1.5hours, and 2 hours
- Note: All fields are required

### Acknowledgement Page
A simple page that display name, pod number, pod location, start and end time of booking

### Technical Specs

- You are expected to implement validations for the fields based on the business requirements
- Please organise, and test your code as if they are production ready
- Please host your source code in a public repository eg. Github or Bitbucket etc
- You may choose host your application in your preferred server.
- Provide a README.md with instructions on running the application locally