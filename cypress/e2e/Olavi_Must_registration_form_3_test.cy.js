// THIS IS SOFT ASSERT WITH POPUP ERROR MESSAGE SO TEST WONT STOP (is marked as "PASSED" though)
Cypress.Commands.add('softAssert', (selector, callback) => {
    cy.get(selector).then(($el) => {
      try {
        // Run the assertion function
        callback($el)
      } catch (err) {
        // Get the current test's name (the 'it' block title)
        const testName = Cypress.currentTest.title
  
        // Automatically describe what was being tested
        const testedAttribute = 'placeholder'
        const expectedConditions = [
          'should exist',
          'should not be empty'
        ].join(' and ')  // Combine multiple conditions for the error message
  
        // Display a pop-up on the screen with the error message
        cy.document().then((doc) => {
          const popup = doc.createElement('div')
          popup.setAttribute('id', 'popup-message')
          popup.setAttribute('style', 'position: fixed; top: 20px; left: 20px; background-color: red; color: white; padding: 20px; z-index: 9999;')
  
          // Custom error message with dynamically generated text
          popup.innerText = `Error in test: "${testName}"\nSelector: ${selector}\nTested: ${testedAttribute}\nExpected: ${expectedConditions}\nDetails: ${err.message}`
          doc.body.appendChild(popup)
  
        // Wait for 10 seconds before removing the pop-up
        cy.wait(10000).then(() => {
            // Remove the pop-up after the wait
            doc.getElementById('popup-message').remove()
          })
        })
  
        // Log the error in the Cypress logs as well
        cy.log(`Test: "${testName}" | Assertion error for selector ${selector}: ${err.message}`)
      }
    })
  })



beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')


})


describe('Section 1: Visual tests', () => {


    // 1.1
    it('Check that radio button list is correct and working', () => {

        cy.log('Verify array of radio button elements with given selector has 4 elements in total')
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.log('Verify labels of the radio buttons are matching')
        cy.get('input[type="radio"]').next().then(labels => {
            const freqTexts = [...labels].map(label => label.innerText.trim())
            expect(freqTexts).to.deep.eq(['Daily', 'Weekly', 'Monthly', 'Never'])
        })

        cy.log('Verify default state of radio buttons to be NOT checked')
        cy.get('input[type="radio"]').each(($radio, index) => {
            cy.wrap($radio).should('not.be.checked')
        })

        cy.log('Verify selecting one radio button will remove selection from the other radio button')
        cy.get('input[type="radio"]').each(($radio, index) => {
            // Click the radio button at the current index
            cy.wrap($radio).check()

            // Verify that the clicked radio button is checked
            cy.wrap($radio).should('be.checked')

            // Verify that other radio buttons are not checked
            cy.get('input[type="radio"]').not($radio).should('not.be.checked')
        })
    })

    // 1.2
    it('Check that radio button list is correct and working', () => {

        cy.log('Verify array of radio button elements with given selector has 4 elements in total')
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.log('Verify labels of the radio buttons are matching')
        cy.get('input[type="radio"]').next().then(labels => {
            const freqTexts = [...labels].map(label => label.innerText.trim())
            expect(freqTexts).to.deep.eq(['Daily', 'Weekly', 'Monthly', 'Never'])
        })

        cy.log('Verify default state of radio buttons to be NOT checked')
        cy.get('input[type="radio"]').each(($radio, index) => {
            cy.wrap($radio).should('not.be.checked')
        })

        cy.log('Verify selecting one radio button will remove selection from the other radio button')
        cy.get('input[type="radio"]').each(($radio, index) => {
            // Click the radio button at the current index
            cy.wrap($radio).check()

            // Verify that the clicked radio button is checked
            cy.wrap($radio).should('be.checked')

            // Verify that other radio buttons are not checked
            cy.get('input[type="radio"]').not($radio).should('not.be.checked')
        })
    })

    // 1.3
    it('Verify default state of dropdowns ', () => {
        cy.get('#country').should('have.value', '')
        cy.get('#country').find('option').should('have.length', 4)
        cy.get('#city').should('be.disabled')
    })

    // 1.4
    it('Verify Countries dropdown list', () => {
        const countriesText = ['', 'Spain', 'Estonia', 'Austria']
        countriesText.forEach((country, index) => {
            cy.get('#country').find('option').eq(index).should('have.text', country)
        })
    })

    // 1.5
    it('Verify cities droptown correspondances related to selected countries', () => {

        //Verify Spain cities
        const SpainCitiesText = ['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo']

        cy.get('#country').select(1)
        cy.screenshot('Spain&cities')
        cy.get('#city').find('option').should('have.length', 5)
        SpainCitiesText.forEach((country, index) => {
            cy.get('#city').find('option').eq(index).should('have.text', country)
        })

        //Verify Estonian cities
        const EstonianCitiesText = ['', 'Tallinn', 'Haapsalu', 'Tartu']

        cy.get('#country').select(2)
        cy.screenshot('Estonia&cities')
        cy.get('#city').find('option').should('have.length', 4)
        EstonianCitiesText.forEach((country, index) => {
            cy.get('#city').find('option').eq(index).should('have.text', country)
        })

        //Verify Austrian cities
        const AustriannCitiesText = ['', 'Vienna', 'Salzburg', 'Innsbruck']

        cy.get('#country').select(3)
        cy.screenshot('Austria&cities')
        cy.get('#city').find('option').should('have.length', 4)
        AustriannCitiesText.forEach((country, index) => {
            cy.get('#city').find('option').eq(index).should('have.text', country)
        })
    })


    // 1.6
    it('Verify, if country selection is changed, city selection is removed', () => {
        cy.get('#country').select(2)
        cy.get('#city').select(2).should('not.have.text', '')
        cy.screenshot('7_6_1_Country&City selected')
        cy.get('#country').select(1)
        cy.screenshot('7_6_Country_changed_No_city_selected')
        cy.get('#city').should('have.class', 'ng-invalid')  //no city selected
    })

    // 1.7
    it('Veryfy checkboxes, their content and links', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked').siblings().should('contain', 'Accept our cookie policy')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked').parent().find('button a').should('have.attr', 'href', 'cookiePolicy.html')
        cy.get('input[type="checkbox"]').eq(1).parent().find('button a').click()
        cy.url().should('contain', '/cookiePolicy.html')
        cy.screenshot('P4_R3_Cookie_Policy_Page')
        cy.go('back')
        cy.log('Back again in registration form 3')      
    })

    // 1.8
    it('Check the e-mail format validation & errors', () => {

        //Verify there is email input field enabled and no errors displayed by default
        cy.get('input[name="email"]').should('exist').should('be.enabled')
        cy.get('span').contains('Email is required.').should('not.be.visible')
        cy.get('span').contains('Invalid email address.').should('not.be.visible')
        //cy.get('input[name="email"]').should('have.attr', 'placeholder').and('not.be.empty')    // In code there is no placeholder so it fails and ruins other tests. Should have placeholder as name field have it.

        cy.log('EXPECT EMAIL TO HAVE PLACEHOLDER')
        // Using CUSTOM "soft assert" to check for the placeholder attribute. If failing, error displayed in log, but test continues and is marked as passed.
        cy.softAssert('input[name="email"]', (el) => {
            const placeholder = el.attr('placeholder')
            expect(placeholder).to.exist                // Check that the placeholder exists
            expect(placeholder).to.not.be.empty         // Check that the placeholder is not an empty string
        })

        //Verify there are no error messages displayed when valid email entered
        cy.get('input[name="email"]').type('validemail@yeap.com')
        cy.get('span').contains('Email is required.').should('not.be.visible')
        cy.get('span').contains('Invalid email address.').should('not.be.visible')

        //Verify error messages for invalid and cleared email field
        cy.get('input[name="email"]').clear()
        cy.get('input[name="email"]').type('w#%@')
        cy.get('span').contains('Invalid email address.').should('be.visible')
        cy.get('input[name="email"]').clear()
        cy.get('span').contains('Email is required.').should('be.visible')
    })

})


describe('Section 2: Functional tests', () => {

    //2.1 
    it('User can submit form only MANDATORY data filled/selected', () => {
        fillAll({ username: 'Tester Olavi', email: 'testemail1@om.com' })       // uses function to fill in all fields

        //Clear optional fields
        cy.get('input[type="date"]').clear()                //Clear registration date

        cy.get('input[name="freq"]').each(($el) => {
            cy.wrap($el).invoke('prop', 'checked', false)   // Uncheck each radio button
        })

        //return  // "return" helps to stop further testing inside it-block if uncommented      

        CheckForm()   // verify form validity

        //Verify submit button and submit form
        cy.get('#successFrame').siblings('input[type="submit"]').should('not.be.disabled')          // Submit button is NOT disabled 
        cy.get('#successFrame').siblings('input[type="submit"]').click()                            // Click on submit button
        cy.get('#successFrame').should('be.visible').and('contain', 'Successful registration')      // Verify sucess message is visible
    })

    //2.2
    it('User can submit form with all data filled/selected (File not added) ', () => {
 
        fillAll({ username: 'Tester Olavi', email: 'testemail1@om.com' })                           // uses function to fill in all fields 

        CheckForm()   // verify form validity

        //Verify submit button and submit form
        cy.get('#successFrame').siblings('input[type="submit"]').should('not.be.disabled')          // Submit button is NOT disabled 
        cy.get('#successFrame').siblings('input[type="submit"]').click()                            // Click on submit button
        cy.get('#successFrame').should('be.visible').and('contain', 'Successful registration')      // Verify sucess message is visible
    })


    //2.3
    it('Submit form while 1 mandatory field removed (Cookie policy checkbox unchecked)', () => {
        fillAll({ username: 'Cookie Policy Unchecked', email: 'testemail1@om.com' })
        CheckForm()
        cy.get('input[type="checkbox"]').eq(1).uncheck()
        CheckForm()
    })



    //2.4
    it('Upload the file', () => {

        cy.get('#myFile').attachFile('cerebrum_hub_logo.png')

        //Verify the file upload
        cy.get('input[type="file"]').then(($input) => {
            expect($input.val()).to.match(/cerebrum_hub_logo\.png$/) // Use a regex to match the filename
        })

        //Verify that button is enabled and click to submit
        cy.get('button[type="submit"]').should('not.be.disabled').click()

         // Check that currently opened URL is correct
         cy.url().should('contain', '/upload_file.html')

         // Go back to previous page
         cy.go('back')
         cy.url().should('contain', '/registration_form_3.html')
         cy.log('Back again in registration form 3')
    })

})

// FUNCTION - generates random date. By default 01.01.1950 - yesterday.
function getDate({ minYear = 1950, maxYear, returnToday = false, futureYear = false } = {}) {

    /*
    USAGE:
        PAST:
            getDate()                           	        Returns random date starting from January 1, 1950-default value, up to yesterday (inclusive), regardless of the current year.
            getDate({ minYear: 2000 })                      Returns random date starting from January 1, 2000 (minYear), up to yesterday (inclusive), regardless of the current year.
            getDate({minYear: 2021 , maxYear: 2021 })       Returns random date from past including selected years first and last dates
            getDate({ minYear: 2021, maxYear: value set in future})        Returns random date from selected year till yesterday eventhough maxYear is set to be in future
        
        PRESENT:
            getDate(returnToday:true)                       Returns todays date
            getDate({ minYear: 2021, maxYear: 2025, returnToday: true })    ignores other and returns only todays date

        FUTURE
            getDate({ futureYear: true })                   Returns random date from from tomorrow till end of this year
            getDate({ futureYear: true, maxYear: 2025 })    Returns random date from tomorrow till 31.12.2025( till end of maxYear)
    */

    // Set current date according today
    const today = new Date()

    // Set maxYear to the current year if not provided
    maxYear = maxYear || today.getFullYear()

    // Return today's date if specified
    if (returnToday) {
        return today.toISOString().split('T')[0] // Format date to YYYY-MM-DD
    }

    let selectedDate

    // Generate a random date based on whether we are generating a future date
    if (futureYear) {
        // Generate a date starting from tomorrow for the current year
        const nextDay = new Date(today)
        nextDay.setDate(today.getDate() + 1)

        // Ensure max date is the last day of maxYear
        let maxDate = new Date(maxYear, 11, 31) // December 31 of maxYear
        const futureTimeFrame = Math.floor((maxDate - nextDay) / (1000 * 60 * 60 * 24)) // Calculate number of days between tomorrow and maxDate

        // Generate a random number of days from tomorrow to the last day of maxYear
        const randomDays = Math.floor(Math.random() * (futureTimeFrame + 1))
        selectedDate = new Date(nextDay)
        selectedDate.setDate(nextDay.getDate() + randomDays)
    } else {
        // Generate a random past date between minYear and maxYear - 1 (yesterday)
        const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear
        const month = Math.floor(Math.random() * 12)
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        // Ensure the last day is yesterday
        let lastDate = new Date(today)
        lastDate.setDate(today.getDate() - 1) // yesterday

        if (year === today.getFullYear()) {
            // Ensure the maximum date is yesterday for the current year
            lastDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
        }

        // Randomly select a day from the available days in the month
        const randomDaysPast = Math.floor(Math.random() * daysInMonth) + 1
        selectedDate = new Date(year, month, randomDaysPast)

        // Ensure the selected date is not greater than yesterday
        while (selectedDate > lastDate) {
            const newYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear
            const newMonth = Math.floor(Math.random() * 12)
            const newDaysInMonth = new Date(newYear, newMonth + 1, 0).getDate()
            const newDay = Math.floor(Math.random() * newDaysInMonth) + 1
            selectedDate = new Date(newYear, newMonth, newDay)
        }
    }

    // Format the selected date to YYYY-MM-DD
    return selectedDate.toISOString().split('T')[0]
}


// Function to select a random option from a dropdown
function selectRandomOption(dropdownSelector) {
    return cy.get(`${dropdownSelector} option`).then((options) => { // Return the promise chain
        const optionCount = options.length
        const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1 // Generate random index excluding 0
        cy.get(dropdownSelector).select(randomIndex)  // Select option at the random index
        const selectedOption = options[randomIndex].innerText // Get the inner text of the selected option
        cy.log(`Selected option from ${dropdownSelector}: ${selectedOption}`)
        return selectedOption // Return the selected option for chaining
    })
}


function fillAll({ username = 'Tester Ol', email = 'testemail@om.com' } = {}) {

    cy.get('#name').type(username)
    cy.get('input[name="email"]').type(email)

    // Select random country available
    cy.get('#country option').then((options) => {
        const optionCount = options.length                                      // Get the count of option elements    
        const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1   // Generate random index between 1 and optionCount - 1 (excluding 0 and the last one)   
        cy.log(`Generated random index for country: ${randomIndex}`)            // Log the generated random index 
        cy.get('#country').select(randomIndex)                                  // Use this random index to select a country          
        const selectedCountry = options[randomIndex].innerText                  // Get the inner text of the selected option
        cy.log(`Selected Country: ${selectedCountry}`)                          // Log the selected country name
    })

    // Select random city available for previously selected country
    cy.get('#city option').then((options) => {
        const optionCount = options.length                                      // Get the count of option elements     
        const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1   // Generate random index between 1 and optionCount - 1 (exclusive of 0 and including optionCount - 1)   
        cy.log(`Generated random index for country: ${randomIndex}`)            // Log the generated random index 
        cy.get('#city').select(randomIndex)                                     // Use this random index to select a city
        const selectedCity = options[randomIndex].innerText                     // Get the inner text of the selected option
        cy.log(`Selected Country: ${selectedCity}`)                             // Log the selected country name
    })


    // Fill in registration date & assert that the value has been set as got from function getDate.

    const reg_date = getDate({ returnToday: true }) // const reg_date is defined by function "getDate" returned value. Function located at bottom of the page.

    cy.contains('label', 'Date of registration')    // Get the correct label close to date picker
        .parent()                                   // Get its parent
        .find('input[type="date"]')                 // Find the date input within the parent
        .type(reg_date)          // Type in todays date in format yyyy-mm-dd using multifunctional function "getDate", located at bottom of the page

    cy.get('input[type="date"]').should('have.value', reg_date)

    //NB! date picker displays date on page mm/dd/yyy  and manually picked dates are same format but from cypress it accepts only format yyyy-mm-dd

    //cy.contains('label', 'Date of registration').parent().find('input[type="date"]').type(getDate())                        // From cypress it does not accept past date. But it accepts while manual testing
    //cy.contains('label', 'Date of registration').parent().find('input[type="date"]').type(getDate({ futureYear: true }))   // From cypress it does not accept future date. But it accepts while manual testing


    // Select randomly frequency of receiving newsletter
    cy.contains('label', 'Select the frequency of receiving our newsletter:')
        .parent() // Step 2: Get its parent div
        .find('input[type="radio"]') // Step 3: Find all radio buttons within the parent
        .then((radios) => {
            const radioCount = radios.length // Count the number of radio buttons
            const randomIndex = Math.floor(Math.random() * radioCount) // Generate a random index

            cy.log(`Number of radio buttons: ${radioCount}`) // Log the count
            cy.log(`Randomly selected index: ${randomIndex}`) // Log the random index

            // Step 4: Select the randomly chosen radio button
            cy.wrap(radios).eq(randomIndex).check() // Use .check() to select the radio button
        })

    //Fill in birthday date randomly starting from first day of inserted minYear value till today
    cy.get('#birthday').type(getDate({ minYear: 1990 }))

    // Fill in checkboxes
    cy.get('input[type="checkbox"]').eq(0).check()
    cy.get('input[type="checkbox"]').eq(1).check()
}

// Function that checks if form is filled and ready for submitting.
function CheckForm() {
    cy.log('FORM VALIDITY ASSERTION by function')
    cy.get('form[name="myForm"]').then(($form) => {
        const isValid = $form[0].checkValidity()  // Access the native DOM form element
        expect(isValid).to.be.true  // Assert that the form is valid
    })

    /* 
    Required fields for form to be VALID (by those elements options) are:
    Name
    Email
    Country
    City
    Birthday
    Accept our privacy policy (checkbox)
    Accept our cookie policy (checkbox)
 
    Not all those elements affect <Submit> button to be active
 
    */
}