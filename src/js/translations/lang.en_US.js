'use strict';

angular.module('piwik-fe-app', ['pascalprecht.translate'])
  .config(function($translateProvider) {
    $translateProvider.translations('en_US', {
      CHOOSE_DATE: 'Choose Date Range',
      START_DATE: 'Start Date'
    });
  })