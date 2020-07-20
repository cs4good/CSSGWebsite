# CS+Social Good Website
This is the repository for CS+Social Good's website. Based on the uiCookies theme "Landing."

### Local Server
To get started, run "npm install" from the root directory. "npm run start" will launch the website from a local server. 

NOTE: the build will probably fail because there is supposed to be a file called `src/keys.js` or `.env` with the keys needed to launch the website. 

For running the website from a local server there are two ways to configure the keys. You can edit the code at the imports in `src/index.js` to use either one of these two ways:

1. Using a `src/keys.js` file with following values:
```
const CLIENT_ID = "xxxx";
const CAL_ID = "xxxx";
const API_KEY = "xxxx";
const SCOPES = "xxxx";

export {CLIENT_ID, CAL_ID, API_KEY, SCOPES};
```

2. Using a `.env` file in the root directory `CSSGWebsite` with the following values:
```
CLIENT_ID = "xxxx"
CAL_ID = "xxxx"
API_KEY = "xxxx"
SCOPES = "xxxx"
```
Number 2 is recommended as for deployment we will have to use automatic deployment from now on.

These files contain the API keys that allow us to fetch information about new events from the CS+Social Good Google Calendar. Contact mattsun@stanford.edu if you have questions and sasankh@stanford.edu for the key values. 

### Manual Deploy
When you are done editing the website code run `npx webpack --config webpack.config.js` 
to package the website into `dist/`. To upload the changes to the actual website, only upload the `dist/` directory. The dist folder is the optimized version of the website that is created by webpack for production.

### Automatic Deploy (New)
Netfliy has removed(?) the ability to do manual deploys for custom sites, so we have setup integration with GitHub. Commits to `master` are deployed automatically. You will have to ensure your `src/index.js` is configued such that it imports the API key values from `process.env` (environment variables). These environment variables are set under `Deploy Settings -> Build & deploy -> Enivornment` on Netlify.   
