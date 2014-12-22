'use strict';

var angular             = require('angular'),
    angularTranslate    = require('angular-translate');

var LangCtrl  = require('./ctrl/LangCtrl');
var SettingsCtrl = require('./ctrl/SettingsCtrl');

var app       = angular.module('piwik-fe-app', ['pascalprecht.translate']);

app.controller('LangCtrl', ['$scope', '$translate', LangCtrl]);
app.controller('SettingsCtrl', ['$scope', SettingsCtrl]);


app.config(function($translateProvider) {
  $translateProvider.translations('de_DE', {
    CHOOSE_DATE:    'Wähle Datum',
    START_DATE:     'Start Datum'
  });

  $translateProvider.translations('en_US', {
    CHOOSE_DATE:    'Choose date',
    START_DATE:     'Start date'
  });

});

/*

debugger;
  angularTranslate.translations('en', {
    CHOOSE_DATE:    'Choose date',
    START_DATE:     'Start date'
  });



  */