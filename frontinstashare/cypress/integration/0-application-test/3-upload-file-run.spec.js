const faker = require('faker');
export const API_ENDPOINT = Cypress.env('BACKEND_URL') || 'http://localhost:8000/api';
const email_user = faker.internet.email();
const password = '123';
let token = "";

describe('test upload file', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test


    })

    it('upload file', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.

        cy.request('POST', API_ENDPOINT + '/register',
            {
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                email: email_user,
                password: password,
                password_confirmation : "123"
            }).then((response) => {
            // Check response
            expect(response.status).eq(200);

            cy.request('POST', API_ENDPOINT + '/login',
                {
                    email: email_user,
                    password: password
                }).then((responselogin) => {

                token = responselogin.body.access_token;

                cy.intercept({
                    method: 'GET',
                    url: API_ENDPOINT + '/filesByUser',
                    headers: {
                        Authorization: 'Bearer '+token
                    },
                }).as('apiFilesUser');


                cy.visit('http://localhost:3000')

                cy.get('input[placeholder="Enter email"]').type(email_user);

                cy.get('input[placeholder="Enter password"]').type(password);

                cy.get('.btn').click();

                const filepath = 'public/logo192.png';
                cy.get('input[name="upload_file"]').click();
                cy.get('input[name="upload_file"]').attachFile(filepath)
                cy.get('button[type="submit"]').click()

                cy.get('.alert-success').should('contain','is saved is in process of compressing')

                cy.get('.txt-overflow').should('contain', 'logo192.png');
                cy.get('.color-compressed').should('contain', 'Compressed');
            })
        });



    })

    it('upload file twice throw error', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.

        const filepath = 'public/logo192.png';
        cy.get('input[name="upload_file"]').click();
        cy.get('input[name="upload_file"]').attachFile(filepath)
        cy.get('button[type="submit"]').click()

        cy.get('.alert-danger').should('contain','File with name logo192.png already exists')

    })

    it('edit file name', () => {

        cy.get(':nth-child(6) > a').click();
        cy.get('input[type="text"]').should('have.value', 'logo192.png');
        cy.get('input[type="text"]').clear();
        cy.get('input[type="text"]').type('logoChange.png');
        cy.get('button.btn-dark[type="button"]').click()



        cy.get('.txt-overflow').should('have.text', 'logoChange.png');
    });


    it('check file donwload', () => {

        cy.get(':nth-child(5) > a')
            .invoke('attr', 'href')
            .should('contain', 'downloadfile')

    });

})