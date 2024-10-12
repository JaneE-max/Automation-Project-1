beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */

describe('Visual Tests for Registration Form', () => {
    // Test 1: Verify that radio buttons and their content are displayed correctly
    it('should display the radio buttons with correct labels', () => {
        cy.get('input[type="radio"][name="freq"]').should('have.length', 4);
        cy.get('label').contains('Daily').should('be.visible');
        cy.get('label').contains('Weekly').should('be.visible');
        cy.get('label').contains('Monthly').should('be.visible');
        cy.get('label').contains('Never').should('be.visible');
    });

    // Test 2: Verify that dropdowns work correctly (country and city)
    it('should display country dropdown and update city list based on country selection', () => {
        cy.get('#country').should('be.visible').select('Estonia');
        cy.get('#city').should('be.visible').select('Tallinn');

        // Change country and check if city selection resets
        cy.get('#country').select('Spain');
        cy.get('#city').should('not.have.value', 'Tallinn'); // City should reset
    });

    // Test 3: Verify checkboxes and their links
    it('should display checkboxes with privacy and cookie policy links', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2); // Two checkboxes
        cy.get('button').contains('Accept our cookie policy').should('have.attr', 'href', 'cookiePolicy.html');
    });

    // Test 4: Verify email format validation
    it('should show error message for invalid email format', () => {
        cy.get('input[name="email"]').type('invalid-email');
        cy.get('h2').contains('Birthday').click(); // Blur the field to trigger validation
        cy.get('#emailAlert').should('contain.text', 'Invalid email address');
    });

    // Test 5: Verify visual appearance of the registration page header
    it('should display the registration page header and image', () => {
        cy.get('.w3-container.w3-teal h1').contains('Registration page').should('be.visible');
        cy.get('img[data-testid="picture"]').should('have.attr', 'src', 'cerebrum_hub_logo.png');
    });
});

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

describe('Functional Tests for Registration Form', () => {
    
    // Test 1: All fields are filled in + corresponding assertions
    it('should allow form submission when all fields are filled in', () => {
        // Fill out all form fields
        cy.get('#name').type('John Doe');
        cy.get('input[name="email"]').type('john@example.com');
        cy.get('#country').select('Estonia');
        cy.get('#city').select('Tallinn');
        cy.get('input[name="birthday"]').type('1990-01-01');
        cy.get('input[type="radio"][value="Weekly"]').check();
        cy.get('input[type="checkbox"]').first().check(); // Accept privacy policy
        cy.get('#myFile').attachFile('sample.pdf'); // Attach a file (See note below)
        
        // Submit the form
        cy.get('input[type="submit"]').click();

        // Assertions
        cy.get('#successFrame').should('contain', 'Successful registration');
    });

    // Test 2: Only mandatory fields are filled in + corresponding assertions
    it('should allow form submission when only mandatory fields are filled in', () => {
        // Fill out only mandatory form fields
        cy.get('#name').type('Jane Doe');
        cy.get('input[name="email"]').type('jane@example.com');
        cy.get('#country').select('Austria');
        cy.get('input[name="birthday"]').type('1995-05-10');
        cy.get('input[type="checkbox"]').first().check(); // Accept privacy policy

        // Submit the form
        cy.get('input[type="submit"]').click();

        // Assertions
        cy.get('#successFrame').should('contain', 'Successful registration');
    });

    // Test 3: Mandatory fields are absent + corresponding assertions (using function)
    function assertFormSubmissionFails() {
        cy.get('input[type="submit"]').click();
        cy.get('#successFrame').should('not.contain', 'Successful registration');
        cy.get('#name').then(($input) => {
            expect($input[0].checkValidity()).to.be.false; // Name is required
        });
        cy.get('input[name="email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false; // Email is required
        });
        cy.get('#country').then(($input) => {
            expect($input[0].checkValidity()).to.be.false; // Country is required
        });
    }

    it('should not allow form submission when mandatory fields are missing', () => {
        // Leave all fields empty
        assertFormSubmissionFails();
    });

    // Test 4: Add file functionality (use the `cypress-file-upload` plugin)
    it('should allow file to be uploaded', () => {
        // Upload a file to the form
        cy.get('#myFile').attachFile('sample.pdf'); // This requires the `cypress-file-upload` plugin

        // Check if the file input has the correct file name
        cy.get('#myFile').then(($input) => {
            const fileName = $input[0].files[0].name;
            expect(fileName).to.equal('sample.pdf');
        });

        // Submit the form
        cy.get('input[type="submit"]').click();

        // Assertions
        cy.get('#successFrame').should('contain', 'Successful registration');
    });
});