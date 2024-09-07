const { defineConfig } = require("cypress");

module.exports = defineConfig({
  trashAssetsBeforeRuns: true,   //Whether Cypress will trash assets within the downloadsFolder, screenshotsFolder, and videosFolder before tests run with cypress run.

  //Screenshots
  screenshotsFolder: 'cypress/screenshots',
  screenshotOnRunFailure: true,  //Whether Cypress will take a screenshot when a test fails during cypress run.

  //Videos
  video: true,            //Whether Cypress will capture a video of the tests run with cypress run.
  videosFolder: 'cypress/videos',
  videoCompression: false,            //The quality setting for the video compression, in Constant Rate Factor (CRF).

  //Viewport  (Override with cy.viewport() command)
  viewportHeight: 800,   //Default height in pixels for the application under tests' viewport. 
  viewportWidth: 1200,  //Default width in pixels for the application under tests' viewport.

  //Timeouts
  defaultCommandTimeout: 5000, //Time, in milliseconds, to wait until most DOM based commands are considered timed out.

  //cypress-mochawesome-reporter
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true, //Genarates Chart in HTML report
    reportPageTitle: 'OpenCart Test Report', //Report title will be set to the mentioned string
    embeddedScreenshots: true, //Screenshot will be embedded within the report
    inlineAssets: true, //No separate assets folder will be created
    videoOnFailOnly: false, //If Videos are recorded and added to the report, setting this to true will add the videos only to tests with failures.
  },

  //The number of times to retry a failing test. Can be configured to apply to cypress run or cypress open separately.
  //If you want to configure retry attempts on a specific test or suite, you can set this by using the test's/suite's configuration.
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 1,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 1
  },

  e2e: {
    //A String or Array of glob patterns of the test files to load.
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      // implement node event listeners here

      //Load the testing configuration and environment variables from separate JSON files.
      //we put the baseUrl and envionment specific config settings in settings/env.settings.json
      const environmentName = config.env.environmentName || 'local';
      const environmentFilename = `./settings/${environmentName}.settings.json`;
      console.log('loading %s', environmentFilename);
      const settings = require(environmentFilename);

      //overwriting the baseUrl from settings file to config
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl
      }

      //cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);  

      //cypress grep plugin config for tags
      require('@cypress/grep/src/plugin')(config);

      //It is very important to return the updated config object to the caller, so Cypress knows to use the changes configuration.
      return config;
    },

    //Any key/value you set in your Cypress configuration under the env key will become an environment variable.
    //When your tests are running, you can use the Cypress.env function to access the values of your environment variables.
    env: {
      URL: 'https://naveenautomationlabs.com/opencart/index.php'
    }
  },
});
