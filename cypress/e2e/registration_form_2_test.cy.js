beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it.only('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('Something')
        cy.get('#email').type('test@test.ee')
        cy.get('[data-cy="name"]').type('Jane')
        cy.get('#lastName').type('East')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Tere')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match')
        cy.get('input[name="confirm"]').clear()
        cy.get('input[name="confirm"]').type('Password123')
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('Something')
        cy.get('#email').type('test@test.ee')
        cy.get('[data-cy="name"]').type('Jane')
        cy.get('#lastName').type('East')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#htmlFavLanguage').check()
        cy.get('#vehicle2').check()
        cy.get('select[name="cars"]').select('Volvo').should('have.value', 'volvo')
        cy.get('select[name="animal"]').select('Hippo').should('have.value', 'hippo')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('johnDoe')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can not submit form when mandatory first name is missing', ()=>{
        inputValidData('johnDoe')
        cy.get('[data-cy="name"]').scrollIntoView()
        cy.get('[data-cy="name"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
    }) 
    
    it('User can not submit form when mandatory phone number is missing', ()=>{
        inputValidData('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').scrollIntoView()
        cy.get('[data-testid="phoneNumberTestId"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
    }) 
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        cy.url().should('contain', '/registration_form_1.html')
        
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 3)

        cy.get('input[type="radio"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','I have a boat')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#cars').children().should('have.length', 6)
        cy.get('#cars').find('option').should('have.length', 6)
        
        cy.get('#cars').find('option').eq(0).should('have.text', 'Hippo')
        
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })

})

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