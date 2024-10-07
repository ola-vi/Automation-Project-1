beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

//Assignement 4: add content to the following tests

// FAKER added to be used in OM tests
import { faker } from '@faker-js/faker'

describe('Section 1: Functional tests', () => {


    // 4.1
    it('User can use only same both first and validation passwords', () => {

        // Filling in all mandatory fields with vlid data using function. Filled in fields: username, e-mail, first name, last name and phone number + validity check
        inputMandatoryData()

        // Filling in password and confirmation password that do not match (function for matching passwords + changing confirmation password)
        inputMatchingPasswords()
        cy.get('[name="confirm"]').clear().type('ElmStreet1')
        cy.get('h2').contains('Password').click()

        // Asserting: Submit button is disabled, success message is NOT visible, password error message is visible
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')

        // Setting passwords to match
        inputMatchingPasswords()
        cy.get('h2').contains('Password').click()

        // Asserting that password error message is NOT visible and submit button is NOT disabled
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('not.be.disabled')
    })

    // 4.2
    it('User can submit form with all fields added', () => {
        
        //OM. Not sure if radio buttons and checkboxes also needed to be filled/marked!? On web page those are marked as "Not mandatory field" that basically means they belong to "All fields".

        // Filling in all mandatory fields with walid data using function (Username, e-mail, first name, last name and phone number)
        inputMandatoryData()

        // Filling in all optional "fields" with vlid data (Favourite web language, favourite transport, car, favourite animal)
        //MEMO for OM -->> write more advanced code to count items later
        cy.get('input[type="radio"]').eq(2).check()         //0-3
        cy.get('input[type="checkbox"]').eq(2).check()      //0-2
        cy.get('#cars').select(3)                           //0-3
        cy.get('#animal').select(3)                         //0-5

        // Filling in password and matching password confirmation
        inputMatchingPasswords()    //FUNCTION for inserting matching passwords
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is not disabled
        cy.get('.submit_button').should('not.be.disabled')

        // Submitting data & asserting that sucess message is visible
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    // 4.3
    it('User can submit form with valid data and only mandatory fields added', () => {
        
        // Filling in all mandatory fields with walid data using function (Username, e-mail, first name, last name and phone number)
        inputMandatoryData()

        // Filling in password and matching password confirmation
        inputMatchingPasswords()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is NOT disabled
        cy.get('.submit_button').should('not.be.disabled')

        // Submitting data & asserting that sucess message is visible. 
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
        cy.window().scrollTo('bottom')
    })

    // 4.4
    it('User can NOT submit form if 1 of mandatory fields are not filled', () => {
       
        // Filling in all mandatory fields with walid data using function (Username, e-mail, first name, last name and phone number)
        inputMandatoryData()

        // Clear Last name
        cy.get('#lastName').clear()

        // Filling in password and matching password confirmation
        inputMatchingPasswords()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')
    })


})


/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {

    // SAMPLE
    it('Check that logo is correct and has correct size (SAMPLE)', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    //5.1 -  OM TEST 
    it('My test for second picture', () => {

        // Verify image is visible and with correct attributes
        cy.get('img[data-cy="cypress_logo"]')
            .should('be.visible')
            .should('have.attr', 'src')
            .should('include', 'cypress_logo.png')

        // Use the jQuery wrapped element to access its width and height properties and assert values
        cy.get('img[data-cy="cypress_logo"]')
            .then($img => {

                // Assert the exact width
                expect($img.width()).to.equal(116) // Assert the width

                // Assert the width is within the specified range
                expect($img.width()).to.be.greaterThan(100) // Assert width is greater than 100
                expect($img.width()).to.be.lessThan(120) // Assert width is less than 120

                // Assert the exact height
                expect($img.height()).to.equal(88) // Assert the height

                // Assert the height is within the specified range
                expect($img.height()).to.be.greaterThan(70) // Assert height is greater than 70
                expect($img.height()).to.be.lessThan(100) // Assert height is less than 100
            })

    })

    //5.2 - SAMPLE 
    it('Check navigation part - link 1 (SAMPLE)', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 

    // 5.3 - OM TEST
    it('Check navigation part - link 2', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    // 5.4 - SAMPLE
    it('Check that radio button list is correct (SAMPLE)', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes

    // 5.5 - OM TEST
    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the checkboxes
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        //Verify default state of checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Selecting one will not remove selection from the other checkbox
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })


    // 5.6 - SAMPLE
    it('Car dropdown is correct (SAMPLE)', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one

    // 5.7 OM TEST
    it('Animals dropdown is correct', () => {

        //Assert the length of array of elements in Animals dropdown
        cy.get('#animal').find('option').should('have.length', 6)


        const animalsText = ['Dog', 'Cat', 'Snake', 'Hippo', 'Cow', 'Horse']   //NB! For text "Horse" there is actual option value "mouse"!
        animalsText.forEach((animal, index) => {
            cy.get('#animal').find('option').eq(index).should('have.text', animal)
        })


        // OM - more advanced way, how to check the content of the animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            const expectedAnimals = ['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse']    // NB! Mouse value = horse text!

            // Loop through expected values, assert and make screenshots
            expectedAnimals.forEach((expectedAnimals, index) => {
                cy.get('#animal').select(index).screenshot(`checking_value_${expectedAnimals}`, 'animal drop-down')
                expect(actual[index]).to.eq(expectedAnimals) // Check each value
            })

            // Final screenshot after all checks
            cy.screenshot('final_check_complete')
            cy.log('Please go to see also images in Cypress folder "Screenshots!"')
        })

    })



})


// SAMPLE FUNCTION
function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}


// OM advanced function to fill in valid mandatory data except password
function inputMandatoryData() {

    let RandomFirstName
    do {
        RandomFirstName = faker.person.firstName()
    } while (!/^[A-Za-z]+$/.test(RandomFirstName)) // Repeat if the name contains non-letter characters
    cy.log('Generated First Name: ' + RandomFirstName)  // Logs only a valid name containing letters

    let RandomLastName
    do {
        RandomLastName = faker.person.lastName()
    } while (!/^[A-Za-z]+$/.test(RandomLastName)) // Repeat if the name contains non-letter characters
    cy.log('Generated Last Name: ' + RandomLastName)  // Logs only a valid name containing letters


    cy.log('Username, e-mail, first name, last name and phone number will be filled')
    cy.get('#username').type('JonnIpunn')
    cy.get('#email').type('jonnipunn@om.com')       //must have small letters
    cy.get('input[title="Add first name"]').type(RandomFirstName)
    cy.get('#lastName').type(RandomLastName)
    cy.get('[data-testid="phoneNumberTestId"]').type('54541010')

    // Asserting that input error message is not visible after inserting data above
    cy.get('#input_error_message').should('not.be.visible')

    // Asserting validity of mandatory input fields
    const inputSelectors = ['#username', '#email', 'input[title="Add first name"]', '#lastName', '[data-testid="phoneNumberTestId"]']  // Mixed selectors
    cy.log('ASSERTING VALIDITY OF MANDATORY INPUT FIELDS')
    cy.wrap(inputSelectors).each((selector) => {
        cy.get(selector)
            .then(($input) => {
                expect($input[0].validity.valid).to.equal(true)  // Check if each input is valid
            })
    })

}



// OM function to fill in matching passwords
function inputMatchingPasswords() {
    cy.log('Matching passwords will be filled')
    cy.get("input[name='password']").clear().type('ElmStreet1428')
    cy.get('[name="confirm"]').clear().type('ElmStreet1428')
}


//OM function to fill in optional data (TO BE ADDED IF NEEDED)
function inputOptionalData() {
    const RandomFirstName = faker.person.firstName()
    const RandomLastName = faker.person.lastName()
    cy.log('optional fields will be filled')
}



