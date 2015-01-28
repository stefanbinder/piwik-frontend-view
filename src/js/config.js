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

    tabs: [
    	{
    		tabnamei18n: 'PAGETAB',
    		widgets: 	[{
    						name: 'Besucher-Overview',
    						requiredParameter: ['pageUrl'],
    						iframeHeight: 250,
    						parameter: {'actionToWidgetize': 'getEvolutionGraph',
			    						'moduleToWidgetize': 'VisitsSummary',
			    						'columns[]': 'nb_visits'}
    					},{
    						name: 'Besucher-Overview',
    						requiredParameter: ['pageUrl'],
    						iframeHeight: 500,
    						parameter: {'actionToWidgetize': 'getSparklines',
			    						'moduleToWidgetize': 'VisitsSummary'}
    					}]
    	},
    	{
    		tabnamei18n: 'GLOBALTAB',
    		widgets: 	[{
    						name: 'Besucher-Overview',
    						requiredParameter: [],
    						iframeHeight: 2500,
    						parameter: {'actionToWidgetize': 'menuGetPageUrls',
			    						'moduleToWidgetize': 'Actions'}
    					}]
    	}
    ]
};
