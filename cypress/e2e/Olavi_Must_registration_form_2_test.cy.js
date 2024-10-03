beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

// FAKER added to be used in OM tests
import { faker } from '@faker-js/faker';


describe('Section 1: Functional tests', () => {


    // 4.1
    it('User can use only same both first and validation passwords', () => {
        
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible 
        // Change the test, so the passwords would match
        // Add assertion, that error message is not visible anymore
        // Add assertion, that submit button is now enabled

        // Filling in all mandatory fields with walid data using function (Username, e-mail, first name, last name and phone number)
        inputMandatoryData()

        // Filling in password and confirmation password that do not match (function for matching passwords + changing confirmation password)
        inputMatchingPasswords()
        cy.get('[name="confirm"]').clear().type('ElmStreet1')
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Asserting that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Asserting that password error message is visible
        cy.get('#password_error_message').should('be.visible')

        // Setting passwords to match
        inputMatchingPasswords()
        cy.get('h2').contains('Password').click()

        // Asserting that password error message is not visible
        cy.get('#password_error_message').should('not.be.visible')  //No message shown on page but it can be tested

        // Asserting that Submit button is not disabled
        cy.get('.submit_button').should('not.be.disabled')
    })




    // 4.2
    it('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields                 
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message

        //OM. Not sure if radio buttons and chsckboxes also needed to be filled/marked!? On web page those are marked as "Not mandatory field" that basically means they belong to "All fields".

        // Filling in all mandatory fields with walid data using function (Username, e-mail, first name, last name and phone number)
        inputMandatoryData()

        // Filling in all optional "fields" with vlid data (Favourite web language, favourite transport, car, favourite animal)
        //write more advanced code to count items later
        cy.get('input[type="radio"]').eq(2).check()         //0-3
        cy.get('input[type="checkbox"]').eq(2).check()      //0-2
        cy.get('#cars').select(3)                           //0-3
        cy.get('#animal').select(3)                         //0-5

        // Filling in password and matching password confirmation
        inputMatchingPasswords()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is not disabled
        cy.get('.submit_button').should('not.be.disabled')

        // Submitting data
        cy.get('.submit_button').click()

        // Asserting that sucess message is visible
        cy.get('#success_message').should('be.visible')

    })



    it('User can submit form with valid data and only mandatory fields added', () => {
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        // SAMPLE FUNCTION inputValidData('johnDoe')

        // Filling in all mandatory fields with walid data using function (Username, e-mail, first name, last name and phone number)
        inputMandatoryData()

        // Filling in password and matching password confirmation
        inputMatchingPasswords()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is not disabled
        cy.get('.submit_button').should('not.be.disabled')

        // Submitting data
        cy.get('.submit_button').click()

        // Asserting that sucess message is visible
        cy.get('#success_message').should('be.visible')

        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')

    })

    // Add at least 1 test for checking some mandatory field's absence 4.4

    it('User can NOT submit form if 1 of mandatory fields are not filled', () => {
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

        // example, how to use function, which fills in all mandatory data
        // in order to see the content of the function, scroll to the end of the file
        // SAMPLE FUNCTION inputValidData('johnDoe')

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
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // OM TEST 5.1 - OK
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
                expect($img.width()).to.equal(116); // Assert the width

                // Assert the width is within the specified range
                expect($img.width()).to.be.greaterThan(100); // Assert width is greater than 100
                expect($img.width()).to.be.lessThan(120); // Assert width is less than 120

                // Assert the exact height
                expect($img.height()).to.equal(88); // Assert the height

                // Assert the height is within the specified range
                expect($img.height()).to.be.greaterThan(70); // Assert height is greater than 70
                expect($img.height()).to.be.lessThan(100); // Assert height is less than 100
            })

    })

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

    // OM TEST 5.2
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


    // SAMPLE
    it('Check that radio button list is correct', () => {
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

    // OM TEST 5.3
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


    // SAMPLE
    it('Car dropdown is correct', () => {
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

    // OM TEST 5.4
    it('Animals dropdown is correct', () => {

        //Assert the length of array of elements in Animals dropdown
        cy.get('#animal').find('option').should('have.length', 6)


        const animalsText = ['Dog', 'Cat', 'Snake', 'Hippo', 'Cow', 'Horse'];   //NB! For text "Horse" there is actual option value "mouse"!
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
            });

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

// OM function to fill in valid mandatory data except password
function inputMandatoryData() {
    const RandomFirstName = faker.person.firstName()
    const RandomLastName = faker.person.lastName()
    cy.log('Username, e-mail, first name, last name and phone number will be filled')
    cy.get('#username').type('JonnIpunn')
    cy.get('#email').type('jonnipunn@om.com')       //must have small letters so faker wont work here
    cy.get('input[title="Add first name"]').type(RandomFirstName)
    cy.get('#lastName').type(RandomLastName)
    cy.get('[data-testid="phoneNumberTestId"]').type('54541010')

    // Asserting that input error message is not visible after inserting data above
    cy.get('#input_error_message').should('not.be.visible')
}

// OM function to fill in matching passwords
function inputMatchingPasswords() {
    cy.log('Matching passwords will be filled')
    cy.get("input[name='password']").clear().type('ElmStreet1428')
    cy.get('[name="confirm"]').clear().type('ElmStreet1428')
}


//OM function to fill in optional data (TO BE ADDED)
function inputOptionalData() {
    const RandomFirstName = faker.person.firstName()
    const RandomLastName = faker.person.lastName()
    cy.log('optional fields will be filled')
}



