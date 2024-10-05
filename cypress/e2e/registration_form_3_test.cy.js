beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})


//Assignement 7: Add visual&functional tests for registration form 3

// FAKER added to be used in OM tests
import { faker } from '@faker-js/faker'

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

    // 7.2 OM
    it('DROPDON Check that radio button list is correct and working', () => {

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





    it.only('Veryfy checkboxes, their content and links', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)





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






    // 7.2 OM
    //it('xx', () => {       })

    // 7.2 OM
    //it('xx', () => {       })





})


describe('Section 2: Functional tests', () => { })
