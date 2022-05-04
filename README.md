# Promoter score application documentation

## Frontend

### Main structure:

Application has several layouts:

- Welcome page
- SignUp page
- LogIn page
- Dashboard
- Statistics
- Create survey page
- Survey page (form for getting scores)
- Notification page (result of the action)
- Settings page

### SignUp and LogIn pages send

```
{
    login: 'username',
    password: 'password
}
```

### Dashboard

### MongoDB

1. Database: NPS
2. Collection: users

```
[
    {
        id: ObjectId('huf34f893ffif4945394'),
        login: 'admin',
        password: 'admin
    },
    {
        id: ObjectId('owej9034jf93448934i'),
        login: 'ironman',
        password: 'JARVIS3000'
    }
]
```

1. Database: NPS
2. Collection: surveys

```
[
    {
        id: ObjectId('11rjf394934uf340d23'),
        name: 'Job satisfaction',
        period: 'March',
        template: {
            q1: 'How are you satisfied with the food?',
            comment1: true,
            q2: 'Rate your satisfaction with the salary:',
            comment2: false,
            q3: 'How are you?',
            comment3: true
        },
        statistics: [
            {
                ip: '127.7.5.2',
                q1: 7,
                comment1: '',
                q2: 9,
                q3: 10,
                comment3: 'I am super happy with my life'
            },
            {
                ip: '124.2.54.21',
                q1: 4,
                comment1: '',
                q2: 3,
                q3: 10,
                comment3: 'Nothing to add'
            },
            {
                ip: '137.45.29.0',
                q1: 2,
                comment1: '',
                q2: 3,
                q3: 6,
                comment3: 'The weather is rainy'
            }
        ]
    }
]
```

### Testing with Cypress

1.  Installing Cypress:

    - `npm install cypress --dev` to install as a dev dependency in our project

2.  running Cypress:
    - Before running Cypress, in the `.env` replace the end point `NPSDB` with `BCH-NPS-Project`.
    - In the project **package.json**, change the script test to: `"test": "cypress open",` so when running `npm test` it launches automatically the test runner interface.
    - to fix the `cy` conflict, adding the **.eslinterc.json**
      file and add the script `{ "extends": ["plugin:cypress/recommended"] }` within.
3.  Commenting out the test integrations exemples: By adding a `.` to the name of the files, i.e :`.2-advanced-examples` so it won't display to the Run testing interface.
4.  Configuring Cypress.json:

    - `"baseUrl": "http://localhost:3000"` make it the base to visit to DRY our code.

5.  Using Plugins:

    - Installing a plugin to try it out: form the official documents, getting `cypress-testing-library` the verified, installing according to github steps
    - adding the **jsconfig.json** file to allow auto completion for the methods:`"include": ["node_modules/cypress", "./cypress/**/*.js"]`
    - adding `import '@testing-library/cypress/add-commands'` to `cypress/support/commands.js`

6.  Writing the first test:
    `describe("render the form page", () => {`
    `it("correct rendering", () => {`
    `cy.visit("/form");`
    `});`
    `});`
7.  Cypress Studio:

    - A helper to interact with the UI and events in the test runner, and translate to a code in cypress.spec.js file, in case we don't know what to target exactly.
    - implementation: in the cypress.json: `"experimentalStudio": true`
