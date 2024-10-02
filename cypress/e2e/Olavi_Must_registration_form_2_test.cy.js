beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

// FAKER added by OM for tests
import { faker } from '@faker-js/faker';
//const RandomUserName = faker.internet.userName()
//const RandomEmail = faker.internet.email({ provider: 'om.chub.com' })
//const RandomFirstName = faker.person.firstName()
//const RandomLastName = faker.person.lastName()



describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        // 4.1
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

    it.only('User can NOT submit form if 1 of mandatory fields are not filled', () => {
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
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
    });

    it('Check navigation part', () => {
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


//OM function to fill in optional data
function inputOptionalData() {
    const RandomFirstName = faker.person.firstName()
    const RandomLastName = faker.person.lastName()
    cy.log('optional fields will be filled')
}



