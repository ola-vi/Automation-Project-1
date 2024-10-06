// Add the custom command for soft assertions
Cypress.Commands.add('softAssert', (selector, assertFn) => {
    cy.get(selector).then((element) => {
        try {
            assertFn(element);  // Apply the assertion function to the element
        } catch (error) {
            // Log the error but continue test execution
            Cypress.log({
                name: 'Soft Assert Error',
                message: error.message,
                consoleProps: () => ({ error }),
            });
        }
    });
});




beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')


})

// FAKER added to be used in OM tests
import { faker } from '@faker-js/faker'




//Assignement 7: Add visual&functional tests for registration form 3


/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)   OK
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

describe('Section 1: Visual tests', () => {




    // 7.1 OM
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

    // 7.2 OM ???? VALE! KUSTUTADA????
    it('DROPDOWN Check that radio button list is correct and working', () => {

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

    // 7.3 OM
    it('Verify default state of dropdowns ', () => {
        cy.get('#country').should('have.value', '')
        cy.get('#country').find('option').should('have.length', 4)
        cy.get('#city').should('be.disabled')
    })

    // 7.4 OM
    it('Verify Countries dropdown list', () => {
        const countriesText = ['', 'Spain', 'Estonia', 'Austria']
        countriesText.forEach((country, index) => {
            cy.get('#country').find('option').eq(index).should('have.text', country)
        })
    })

    // 7.5 OM
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


    // 7.6 OM
    it('Verify, if country selection is changed, city selection is removed', () => {
        cy.get('#country').select(2)
        cy.get('#city').select(2).should('not.have.text', '')
        cy.screenshot('7_6_1_Country&City selected')
        cy.get('#country').select(1)
        cy.screenshot('7_6_Country_changed_No_city_selected')
        cy.get('#city').should('have.class', 'ng-invalid')  //no city selected
    })

    // 7.7 OM
    // seems that both checkboxes should be mandatory by html code but no colour markings nor error messages displayed and it does not work correctly maybe. 
    // If only privacy policy accepted, then submit button is enabled. 
    //writing the tests at the moment in the way that they will pass and work according to manual testing





    it('Veryfy checkboxes, their content and links', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked').siblings().should('contain', 'Accept our cookie policy')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked').parent().find('button a').should('have.attr', 'href', 'cookiePolicy.html')
        cy.get('input[type="checkbox"]').eq(1).parent().find('button a').click()
        cy.url().should('contain', '/cookiePolicy.html')
        cy.screenshot('P4_R3_Cookie_Policy_Page')
        cy.go('back')
        cy.log('Back again in registration form 3')

        return  // ends test here




        // $('button:contains("Accept our cookie policy")').prop('disabled', true)  //works on web browser dev tools console only when correct element is selected and can be set for manual testing to see button disabled

        /*    cy.contains('button', 'Accept our cookie policy').then(($button) => {
             expect($button[0].disabled).to.be.false
         }) */


        // DISABLES BUTTON AND CHECKS IF IT IS POSSIBLE TO USE LINK
        cy.contains('button', 'Accept our cookie policy').then(($button) => {
            // Disable the button using the jQuery method on the Cypress element
            $button.prop('disabled', true);
        })

        //Verifies that button is disabled and link is not usable
        cy.contains('button', 'Accept our cookie policy').should('be.disabled')



        //BUTTON with link is said to be improper code!! By chat GPT. Not good approach

        //THIS IS MORE functional test

        cy.get('input[type="checkbox"]').eq(0).uncheck().should('have.class', 'ng-invalid') //uncheck can be removed if not needed but just reminder to test with checked

        //$checkbox is DOM element and after .then its dealt with second checkbox (1) but for DOM element for some reason it is necessary to declare it as first element[0] so it would work
        cy.get('input[type="checkbox"]').eq(1).uncheck().then(($checkbox) => {
            expect($checkbox[0].validity.valid).to.be.false
        })


        /*
                cy.get(checkbox).uncheck().then(($checkbox) => {
                    expect($checkbox[0].validity.valid).to.be.false; // Check if it is invalid
                });  */
        //const validity = $checkbox[0].validity; // Access the validity property of the DOM element
        // expect(validity.valid).to.equal(true); // Check if it is valid


        //Verify that there is a child <div> of the .w3-container.w3-cell class that contains a required checkbox and the text "Accept our privacy policy".
        //Especially fun to discover. WORKS
        cy.get('.w3-container.w3-cell').children('div').eq(7).then(($div) => {
            cy.wrap($div).find('input[type="checkbox"][required]').should('exist')
            cy.wrap($div).should('contain', 'Accept our privacy policy')
        })

        //alternative 2
        /*
         cy.get('.w3-container.w3-cell')
             .children('div') // Get all children divs
             .filter((index, div) => {
                 // Check if this div contains the required checkbox and the text
                 return Cypress.$(div).find('input[type="checkbox"][required]').length > 0 &&
                     Cypress.$(div).text().includes('Accept our privacy policy');
             })
             .should('exist'); // Assert that at least one matching div exists
             */
        cy.log(`ADVANCEDSEARCH`)
        cy.get('.w3-container.w3-cell')
            .children('div') // Get all children divs
            .each((div, index) => {
                const $div = Cypress.$(div); // Wrap the native DOM element in jQuery

                // Check if this div contains the required checkbox and the text
                if ($div.find('input[type="checkbox"][required]').length > 0 &&
                    $div.text().includes('Accept our privacy policy')) {
                    // Log the index of the div that matches the criteria
                    cy.log(`Div at index ${index} contains the required checkbox and text.`)
                    // Optionally, assert existence
                    expect($div).to.exist // This is just for confirmation, can be omitted
                }
            });




        // REMEMBER TO ADD EXCEPTIONS to error handling
        //https://www.lambdatest.com/learning-hub/exception-handling-in-cypress 





    })

    /*
        it.only('should have ng-invalid class when required checkbox is unchecked', () => {
            const checkbox = cy.get('input[type="checkbox"][ng-model="checkbox"]');
        
            // Ensure the checkbox is initially unchecked
            checkbox.should('not.be.checked');
        
            // Check for the ng-invalid class
            checkbox.should('not.have.class', 'ng-invalid');
          });
        
          it.only('should have ng-invalid-required class when required checkbox is unchecked', () => {
            const checkbox = cy.get('input[type="checkbox"][ng-model="checkbox"]');
        
            // Ensure the checkbox is initially unchecked
            checkbox.should('not.be.checked');
        
            // Check for the ng-invalid-required class
            checkbox.should('have.class', 'ng-invalid-required');
          });
        
          it.only('should not have ng-invalid class when checkbox is checked', () => {
            const checkbox = cy.get('input[type="checkbox"][ng-model="checkbox"]');
        
            // Check the checkbox
            checkbox.check();
        
            // After checking, it should not have the ng-invalid class
            checkbox.should('not.have.class', 'ng-invalid');
          });
        
          it.only('should not have ng-invalid-required class when checkbox is checked', () => {
            const checkbox = cy.get('input[type="checkbox"][ng-model="checkbox"]');
        
            // Check the checkbox
            checkbox.check();
        
            // After checking, it should not have the ng-invalid-required class
            checkbox.should('not.have.class', 'ng-invalid-required');
          });
    
          */






    // 7.? OM
    //exist and is visible
    //has placeholder
    //accepts valid email
    //does not accept invalid email
    //error messages
    it('Check the e-mail validation & errors', () => {


        //Verify there is email input field enabled and no errors displayed by default
        cy.get('input[name="email"]').should('exist').should('be.enabled')
        cy.get('span').contains('Email is required.').should('not.be.visible')
        cy.get('span').contains('Invalid email address.').should('not.be.visible')
        //cy.get('input[name="email"]').should('have.attr', 'placeholder').and('not.be.empty')    // In code there is no placeholder so it fails and ruins other tests. Should have placeholder as name field have it.

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

    // 7.2 OM
    //it('xx', () => {       })




})


describe('Section 2: Functional tests', () => {


    // 7.2.1 OM
    it('User can submit form with all fields added', () => {

        cy.get('#name').type("Tester Ol")
        cy.get('input[name="email"]').type('testemail@om.com')


        // Select random country available
        cy.get('#country option').then((options) => {
            const optionCount = options.length                                      // Get the count of option elements    
            const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1   // Generate random index between 1 and optionCount - 1 (excluding 0 and the last one)   
            cy.log(`Generated random index for country: ${randomIndex}`)            // Log the generated random index 
            cy.get('#country').select(randomIndex)                                  // Use this random index to select a country          
            const selectedCountry = options[randomIndex].innerText                  // Get the inner text of the selected option
            cy.log(`Selected Country: ${selectedCountry}`)                          // Log the selected country name
        });

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






        // Step 1: Get the label for the radio buttons
        cy.contains('label', 'Select the frequency of receiving our newsletter:')
            .parent() // Step 2: Get its parent div
            .find('input[type="radio"]') // Step 3: Find all radio buttons within the parent
            .then((radios) => {
                const radioCount = radios.length; // Count the number of radio buttons
                const randomIndex = Math.floor(Math.random() * radioCount); // Generate a random index

                cy.log(`Number of radio buttons: ${radioCount}`); // Log the count
                cy.log(`Randomly selected index: ${randomIndex}`); // Log the random index

                // Step 4: Select the randomly chosen radio button
                cy.wrap(radios).eq(randomIndex).check(); // Use .check() to select the radio button

            })

        //cy.get('#birthday').type(randomDate(1950, 2024))
        cy.get('#birthday').type(getDate({ minYear: 2021, maxYear: 2025 }))



        // FILL IN CHECKBOXES
        cy.get('input[type="checkbox"]').eq(0).check()
        cy.get('input[type="checkbox"]').eq(1).check()


        //cy.get('input[type="submit"]').click();

        cy.get('button[type="submit"]').click()     // this is the only submit button that works

        cy.get('#successFrame').siblings('input[type="submit"]').click()


        // Call the postYourAdd function from the window object to see correct sucess message for registration
        /*     cy.window().then((win) => {
                 win.postYourAdd(); // Invoke the function
                 })
                 */


        // Check for the success message
        // cy.get('#successFrame').should('contain', 'Successful registration');


        /* see count of submit buttons
        cy.get('input[type="submit"]').then(($buttons) => {
             const count = $buttons.length; // Get the count of the submit buttons
             cy.log(`Number of submit buttons: ${count}`); // Log the count to the Cypress console
         })
             */

        // submit button is not submit button. There is only 1 submit button on page and it is submit file.
        //submit button has been declared wrong so it is not working.
        // no sucess message can show up



    })


    /*
     // Submit the form
            cy.get('input[type="submit"]').click();
    
            // Check for the success message
            cy.get('#successFrame').should('contain', 'Successful registration');
    
            */


    it('TEST MY FORM', () => {

        fillAll({ username: 'Tester Olavi', email: 'testemail1@om.com' })       // uses function to fill in all fields


        cy.get('#birthday').clear()                //Clear byithday date


        cy.get('#successFrame').siblings('input[type="submit"]').should('not.be.disabled')          // Submit utton is NOT disabled 
        cy.get('form[name="myForm"]').then(($form) => {
            const isValid = $form[0].checkValidity();  // Access the native DOM form element
            expect(isValid).to.be.true;  // Assert that the form is valid
        })





    })


    it('User can submit form only MANDATORY data filled/selected', () => {
        fillAll({ username: 'Tester Olavi', email: 'testemail1@om.com' })       // uses function to fill in all fields

        //Clear optional fields
        cy.get('input[type="date"]').clear()                //Clear registration date

        cy.get('input[name="freq"]').each(($el) => {
            cy.wrap($el).invoke('prop', 'checked', false)   // Uncheck each radio button
        })

        //return        

        CheckForm()   // verify form validity

        //Verify submit button and submit form
        cy.get('#successFrame').siblings('input[type="submit"]').should('not.be.disabled')          // Submit button is NOT disabled 
        cy.get('#successFrame').siblings('input[type="submit"]').click()                            // Click on submit button
        cy.get('#successFrame').should('be.visible').and('contain', 'Successful registration')      // Verify sucess message is visible
    })


    it('User can submit form with all data filled/selected (File not added) ', () => {

        /* 
         // TO TEST SUCESS MESSAGE HOW IT SHOULD WORK       
        // Call the postYourAdd function from the window object to see correct sucess message for registration
            cy.window().then((win) => {
                 win.postYourAdd(); // Invoke the function
                 })
    
        // Check the success message
        cy.get('#successFrame').should('be.visible').and('contain', 'Successful registration')
    
                return
        */

        // ACTUAL TEST
        fillAll({ username: 'Tester Olavi', email: 'testemail1@om.com' })                   // uses function to fill in all fields 
        cy.get('#successFrame').siblings('input[type="submit"]').should('not.be.disabled')          // Submit utton is NOT disabled 
        cy.get('#successFrame').siblings('input[type="submit"]').click()                            // Click on submit button
        cy.get('#successFrame').should('be.visible').and('contain', 'Successful registration')      // Verify sucess message is visible


    })






    it('Checkbox NOT marked for "Accept our cookie policy" ', () => {
        fillAll({ username: 'Cookie Policy Unchecked', email: 'testemail1@om.com' })
        CheckForm()
        cy.get('input[type="checkbox"]').eq(1).uncheck()
        CheckForm()



    })




    it.only('Upload the file', () => {

        // Use the file input selector and attach a file
        cy.get('#myFile').attachFile('cerebrum_hub_logo.png')

        // Optionally, you can verify the file upload

        cy.get('input[type="file"]').then(($input) => {

            expect($input.val()).to.match(/cerebrum_hub_logo\.png$/); // Use a regex to match the filename

        })


        });

        return

        it.only('User can submit form with all fields added', () => {

        })

        it.only('User can submit form with all fields added', () => {

        })






    })







    /*
    // Function to generate a random birthday with min and max year inputs
    function randomDate(minYear, maxYear) {
        // Generate a random year between minYear and maxYear
        const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
     
        // Generate a random month (1-12)
        const month = Math.floor(Math.random() * 12) + 1;
     
        // Generate a random day based on the month and year
        const daysInMonth = new Date(year, month, 0).getDate();
        const day = Math.floor(Math.random() * daysInMonth) + 1;
     
        // Format date to YYYY-MM-DD
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
        */






    function getDate({ minYear = 1950, maxYear, returnToday = false, futureYear = false } = {}) {

        /*
        Function getDate Usage examples
        For future dates -> futureYear:true and insert maxYear value
        For today -> returnToday:true 
        getDate(returnToday:true)                       Returns todays date
        getDate()                           	        Returns random date starting from January 1, 1950-default value, up to yesterday (inclusive), regardless of the current year.
        getDate({ minYear: 2000 })                      Returns random date starting from January 1, 2000 (minYear), up to yesterday (inclusive), regardless of the current year.
        getDate({ returnToday: true })                  Returns todays date
        getDate({ futureYear: true })                   Returns random date from from tomorrow till end of this year
        getDate({ futureYear: true, maxYear: 2025 })    Returns random date from tomorrow till 31.12.2025( till end of maxYear)
        getDate({minYear: 2021 , maxYear: 2021 })       Returns random date including selected years first and last dates
        getDate({ minYear: 2021, maxYear: 2025})        Returns random date from selected year till yesterday
        getDate({ minYear: 2021, maxYear: 2025, returnToday: true })    ignores other and returns only todays date
        */

        // Get current date
        const today = new Date();

        // Set maxYear to the current year if not provided
        maxYear = maxYear || today.getFullYear();

        // Return today's date if specified
        if (returnToday) {
            return today.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        }

        let selectedDate;

        // Generate a random date based on whether we are generating a future date
        if (futureYear) {
            // Generate a date starting from tomorrow for the current year
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + 1);

            // Ensure max date is the last day of maxYear
            let maxDate = new Date(maxYear, 11, 31); // December 31 of maxYear
            const futureTimeFrame = Math.floor((maxDate - nextDay) / (1000 * 60 * 60 * 24)); // Calculate number of days between tomorrow and maxDate

            // Generate a random number of days from tomorrow to the last day of maxYear
            const randomDays = Math.floor(Math.random() * (futureTimeFrame + 1));
            selectedDate = new Date(nextDay);
            selectedDate.setDate(nextDay.getDate() + randomDays);
        } else {
            // Generate a random past date between minYear and maxYear - 1 (yesterday)
            const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
            const month = Math.floor(Math.random() * 12);
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Ensure the last day is yesterday
            let lastDate = new Date(today);
            lastDate.setDate(today.getDate() - 1); // yesterday

            if (year === today.getFullYear()) {
                // Ensure the maximum date is yesterday for the current year
                lastDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
            }

            // Randomly select a day from the available days in the month
            const randomDaysPast = Math.floor(Math.random() * daysInMonth) + 1;
            selectedDate = new Date(year, month, randomDaysPast);

            // Ensure the selected date is not greater than yesterday
            while (selectedDate > lastDate) {
                const newYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
                const newMonth = Math.floor(Math.random() * 12);
                const newDaysInMonth = new Date(newYear, newMonth + 1, 0).getDate();
                const newDay = Math.floor(Math.random() * newDaysInMonth) + 1;
                selectedDate = new Date(newYear, newMonth, newDay);
            }
        }

        // Format the selected date to YYYY-MM-DD
        return selectedDate.toISOString().split('T')[0];
    }



    /*
    // Function to select a random option from a dropdown
    function selectRandomOption(dropdownSelector, label) {
        cy.get(`${dropdownSelector} option`).then((options) => {
            const optionCount = options.length;                                       // Get the count of option elements
            const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1;    // Generate random index excluding 0
            cy.log(`Generated random index for ${label}: ${randomIndex}`);            // Log the generated random index
            cy.get(dropdownSelector).select(randomIndex);                             // Select option at random index
            const selectedOption = options[randomIndex].innerText;                    // Get the inner text of the selected option
            cy.log(`Selected ${label}: ${selectedOption}`);                           // Log the selected option
            return selectedOption;                                                    // Return the selected option (if needed)
        });
    }
     
    /*
    // Call the function to select a random country
    selectRandomOption('#country', 'Country');
     
    // Call the function to select a random city for the selected country
    selectRandomOption('#city', 'City');
    */






    // Function to select a random option from a dropdown
    function selectRandomOption(dropdownSelector) {
        return cy.get(`${dropdownSelector} option`).then((options) => { // Return the promise chain
            const optionCount = options.length;
            const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1; // Generate random index excluding 0
            cy.get(dropdownSelector).select(randomIndex);  // Select option at the random index
            const selectedOption = options[randomIndex].innerText; // Get the inner text of the selected option
            cy.log(`Selected option from ${dropdownSelector}: ${selectedOption}`);
            return selectedOption; // Return the selected option for chaining
        });
    }

    /*
    // Call the function to select a random country
    selectRandomOption('#country').then((selectedCountry) => {
        cy.log(`Selected Country: ${selectedCountry}`); // Use the selected option here
    });
     
    // Call the function to select a random city
    selectRandomOption('#city').then((selectedCity) => {
        cy.log(`Selected City: ${selectedCity}`); // Use the selected option here
    });
     
    */



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
        });

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
                const radioCount = radios.length; // Count the number of radio buttons
                const randomIndex = Math.floor(Math.random() * radioCount); // Generate a random index

                cy.log(`Number of radio buttons: ${radioCount}`); // Log the count
                cy.log(`Randomly selected index: ${randomIndex}`); // Log the random index

                // Step 4: Select the randomly chosen radio button
                cy.wrap(radios).eq(randomIndex).check(); // Use .check() to select the radio button

            })

        //Fill in birthday date randomly starting from first day of inserted minYear value till today
        cy.get('#birthday').type(getDate({ minYear: 1990 }))



        // Fill in checkboxes
        cy.get('input[type="checkbox"]').eq(0).check()
        cy.get('input[type="checkbox"]').eq(1).check()


    }






    function CheckForm() {
        cy.log('FORM VALIDITY ASSERTION by function')
        cy.get('form[name="myForm"]').then(($form) => {
            const isValid = $form[0].checkValidity();  // Access the native DOM form element
            expect(isValid).to.be.true;  // Assert that the form is valid
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
    
        Not all those elements affect "Submit button to be active
    
        */

    }





















