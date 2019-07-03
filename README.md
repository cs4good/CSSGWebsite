# CS+Social Good Website
This is the repository for CS+Social Good's new website. Based on the uiCookies theme "Landing."

To get started, run "npm install" from the root directory. "npm run start" will launch the website from a local server.

NOTE: the build will probably fail because there is supposed to be a file called src/keys.js which contains following information:

```
const CLIENT_ID = "xxxx";
const CAL_ID = "xxxx";
const API_KEY = "xxxx";
const SCOPES = "xxxx";

export {CLIENT_ID, CAL_ID, API_KEY, SCOPES};
```

This file contains the API keys that allow us to fetch information about new events from the CS+Social Good Google Calendar. Contact mattsun@stanford.edu if you have questions.

When you are done editing the website code run "npx webpack --config webpack.config.js" to package the website into "dist/". To upload the changes to the actual website, only upload the "dist/" directory. The dist folder is the optimized version of the website that is created by webpack for production. 
