var piwikconfig = {
	base_url: 'http://piwik.gentics.com/index.php',
	token_auth: '8ecb42acd48a7651e6a4b89b76470f6d',
	
	allSegments: 	[{id:1,name:'test'},{id:2,name:'hugo'}],
    piwikPages: 	[{id:2,name:'Gentics.com'},{id:1,name:'Portal Demo'},{id:3,name:'Snowball'}],
    
    // defines which period is as default selected
    // possible values: range, day, week, month
    defaultPeriod: 	'range',

    // defines the difference from start and end date
    // just in use, if defaultPeriod is 'range'
    defaultDateDifference: '30',

    // set true, if a backlink to the page should be displayed
    // in case you open the page as popup you won't need a backlink
    showBackLink: true,

    // set to true, if you want to use segments
    useSegments: false,

    // Config your own tabs and containing widgets. To get parameter information visit the widgets-site of your piwik installation.
    // Click on your username on the right top. Click on Widgets. Select a report and copy/paste the "direct link" and search for the two parameter:
    //  	actionToWidgetize, moduleToWidgetize
    // You can add additional parameters for the widget if you want.
    // Enter an iframe-height: NUMBER or 'fullheight' or 'halfheight'
    tabs: [
    	{
    		tabnamei18n: 'PAGETAB',
    		detailinfo: 'PAGETAB_INFO',
    		widgets: 	[{
    						requiredParameter: ['pageUrl'],
    						iframeHeight: 600,
    						parameter: {'actionToWidgetize': 'index',
			    						'moduleToWidgetize': 'VisitsSummary',
			    						'columns[]': 'nb_visits'}
    					}]
    	},{
    		tabnamei18n: 'GLOBALTAB',
    		detailinfo: 'GLOBALTAB_INFO',
    		widgets: 	[{
    						name: 'Besucher-Overview',
    						requiredParameter: [],
    						iframeHeight: 280,
    						parameter: {'actionToWidgetize': 'getSparklines',
			    						'moduleToWidgetize': 'VisitsSummary'}
    					},{
    						name: 'Aufruf-Zeiten per Tag',
    						requiredParameter: [],
    						iframeHeight: 340,
    						parameter: {'actionToWidgetize': 'getEvolutionGraph',
			    						'moduleToWidgetize': 'VisitsSummary'}
    					},{
    						name: 'Aufruf-Zeiten per Tag',
    						requiredParameter: [],
    						iframeHeight: 340,
    						parameter: {'actionToWidgetize': 'getVisitInformationPerLocalTime',
			    						'moduleToWidgetize': 'VisitTime'}
    					},{
    						name: 'Suche',
    						requiredParameter: [],
    						iframeHeight: 300,
    						parameter: {'actionToWidgetize': 'getPageTitlesFollowingSiteSearch',
			    						'moduleToWidgetize': 'Actions'}
    					},{
    						name: 'Downloads',
    						requiredParameter: [],
    						iframeHeight: 300,
    						parameter: {'actionToWidgetize': 'getDownloads',
			    						'moduleToWidgetize': 'Actions'}
    					}]
    	},{
    		tabnamei18n: 'ALLPAGESTAB',
    		detailinfo: 'ALLPAGESTAB_INFO',
    		widgets: 	[{
    						name: 'Besucher-Overview',
    						requiredParameter: [],
    						iframeHeight: 2500,
    						parameter: {'actionToWidgetize': 'menuGetPageUrls',
			    						'moduleToWidgetize': 'Actions'}
    					}]
    	},{
    		tabnamei18n: 'TECHNICALTAB',
     		detailinfo: 'TECHNICALTAB_INFO',
	   		widgets: 	[{
    						name: 'Gerätetyp',
    						requiredParameter: [],
    						iframeHeight: 250,
    						parameter: {'actionToWidgetize': 'getType',
			    						'moduleToWidgetize': 'DevicesDetection'}
    					},{
    						name: 'Betriebssystem',
    						requiredParameter: [],
    						iframeHeight: 300,
    						parameter: {'actionToWidgetize': 'getOsFamilies',
			    						'moduleToWidgetize': 'DevicesDetection'}
    					},{
    						name: 'Browser',
    						requiredParameter: [],
    						iframeHeight: 300,
    						parameter: {'actionToWidgetize': 'getBrowserFamilies',
			    						'moduleToWidgetize': 'DevicesDetection'}
    					}]
    	}
    ]
};
/*
http://piwik.office/index.php?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=VisitTime&actionToWidgetize=getVisitInformationPerLocalTime&idSite=2&period=day&date=yesterday&disableLink=1&widget=1


http://piwik.office/index.php?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=VisitsSummary&actionToWidgetize=index&idSite=2&period=day&date=yesterday&disableLink=1&widget=1

Suche:
http://piwik.office/index.php?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=Actions&actionToWidgetize=getPageTitlesFollowingSiteSearch&idSite=2&period=day&date=2015-01-29&disableLink=1&widget=1

Downloads:
http://piwik.office/index.php?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=Actions&actionToWidgetize=getDownloads&idSite=2&period=day&date=yesterday&disableLink=1&widget=1

*/

