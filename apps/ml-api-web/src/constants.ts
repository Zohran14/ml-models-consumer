export const release = import.meta.env.REACT_APP_SENTRY_RELEASE;
export const productionBuild = import.meta.env.APP_ENV === 'production';
export const isStaging = import.meta.env.APP_ENV === 'staging';
export const isProduction = productionBuild;
export const extensionID = 'ojejnchgcdlckdopkfcchhdgijeoicjj';
export const extensionURL = 'https://safekids-chrome-extension.s3.ap-south-1.amazonaws.com/prod-v2/SafeKidsForSchools.xml';
console.log('Production: ', isProduction, ' Staging: ', isStaging, 'Development: ', !productionBuild);
export const hasStorage = (function () {
    try {
        localStorage.setItem('t1', '123');
        localStorage.removeItem('t1');
        return true;
    } catch (exception) {
        return false;
    }
})();
