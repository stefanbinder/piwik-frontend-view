'use strict';

angular.module('piwik-fe-app', ['pascalprecht.translate'])
  .config(function($translateProvider) {
    $translateProvider.translations('de_DE', {
      CHOOSE_DATE: 'Zeit auswählen',
      START_DATE: 'Start Datum'
    });
    
    $translateProvider.preferredLanguage('de');

  })