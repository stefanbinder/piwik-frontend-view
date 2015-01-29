
piwikapp.controller('PiwikCtrl', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
  $scope.period = piwikconfig.defaultPeriod;

  var defaultParameter = {
      'module': 'Widgetize',
      'action': 'iframe',
      'period': $scope.period,
      'idSite': null,
      'widget': '1',
      'token_auth': piwikconfig.token_auth
    };

  var URLParameter = {};

  init();
  loadURLParameter();
  initTabsAndWidgets();
  initBackLink();
  loadSegments();

  function init() {
    var today = new Date();
      $scope.allSegments    = piwikconfig.allSegments;

      $scope.enddate      = today;
      $scope.startdate    = new Date().setDate(today.getDate() - piwikconfig.defaultDateDifference);

      if(typeof $scope.parameter == 'undefined') {
        setParameter();
      }
      setPiwikPages();
      setDisableStatusOfStartdate();
  }

  function initBackLink() {
    $scope.backLink = '';
    if(piwikconfig.showBackLink === true) {
      $scope.backLink = URLParameter['pageUrl'];
    }
  }

  function loadURLParameter() {
    var hash = window.location.hash;
    hash = hash.replace('#','');
    var params = hash.split("&");
    for(var i = 0; i < params.length; i++) {
      var parts = params[i].split("=");
      URLParameter[parts[0]] = parts[1];
    }
  }

  function initTabsAndWidgets() {
    console.log("init tabs and widgets");
    $scope.tabs = piwikconfig.tabs;
    for(var i = 0; i < $scope.tabs.length; i++) {
      var tab = $scope.tabs[i];

      for(var w = 0; w < tab.widgets.length; w++) {
        var widget = tab.widgets[w];

        /* is some required parameter are neccessary, we add these params to the widget url */
        for(var r = 0; r < widget.requiredParameter.length; r++) {
          var required = widget.requiredParameter[r];
          if(URLParameter.hasOwnProperty(required)) {
            switch(required) {
              case 'pageUrl':
                widget.parameter['segment'] = required+'=@'+URLParameter[required];
                break;
              default:
                break;    
            }
            
          } else {
            widget.error = 1;
            widget.message = "Widget need parameter "+required;
          }
        }
        widget.src = null;
        widget.src = $sce.trustAsResourceUrl(buildUrl(widget.parameter));
      }
    }
  }

  function setParameter() {
    var url = window.location.hash,
      params = url.replace('#','').split('&');

    $scope.parameter = {};
    for(var i = 0; i < params.length; i++) {
      var parts = params[i].split('=');
      if(parts.length == 2) {
        $scope.parameter[parts[0]] = parts[1];  
      }
    }
  }

  /*
  * Build url with array
  * adds first the default params
  * adds date according to period selection
  */
  function buildUrl(params) {
    var url = piwikconfig.base_url+'?';

    for(var param in defaultParameter) {
      url += '&'+param+'='+defaultParameter[param];
    }
    for(var param in params) {
      url += '&'+param+'='+params[param];
    }

    var date = '';
    switch($scope.period) {
      case 'range':
        date = formatPiwikDate($scope.startdate)+','+formatPiwikDate($scope.enddate);
        break;
      case 'day':
      case 'week':
      case 'month':
        date = formatPiwikDate($scope.enddate);
        break;
    }
    url += '&date='+date;
    return url;
  }

  function formatPiwikDate(timestamp) {
    var date = new Date(timestamp);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  }

  $scope.reloadTabs = function() {
    console.log("reload");
    defaultParameter.period = $scope.period;
    console.log($scope.piwikid);
    defaultParameter.idSite = $scope.piwikid;

    initTabsAndWidgets();
    for(var i = 0; i < document.getElementsByTagName('iframe'); i++) {
      document.getElementsByTagName('iframe')[i].contentWindow.location.reload(true)
    }
    setDisableStatusOfStartdate();
  }

  $scope.open = function($event, name) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope['opened'+name] = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  function setPiwikPages() {
    if(piwikconfig.piwikPages.length > 1) {
        $scope.piwikPages = piwikconfig.piwikPages;
        $scope.piwikid    = piwikconfig.piwikPages[0].id;
        defaultParameter.idSite = $scope.piwikid;
      } else if(piwikconfig.piwikPages.length === 1) {
        $scope.piwikid    = piwikconfig.piwikPages[0].id;
        defaultParameter.idSite = $scope.piwikid;
      } else {
        // TODO: Error!
        console.log("No Piwik-Page-IDs found in config! Please set piwikconfig.piwikPages");
      }
  }

  function loadSegments() {
    //http://demo.piwik.org/?module=API&method=SegmentEditor.getAll&idSite=7&format=JSON&token_auth=anonymous
    if(piwikconfig.useSegments === true) {
      $http({method:'GET', url:'http://piwik.gentics.com/?module=API&method=SegmentEditor.getAll&idSite=2&format=JSON&token_auth='+piwikconfig.token_auth})
      .success(function(data, status) {
        console.log("success: "+status);
      })
      .error(function(data, status) {
        console.log("erro: "+status+" data: "+data);
      });
    }
  }

  function setDisableStatusOfStartdate() {
    if($scope.period === 'range') {
        $scope.disablestartdate = false;
      } else {
        $scope.disablestartdate = true;
      }
  }

}]);
