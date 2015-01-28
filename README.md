piwik-frontend-view
===================

To include the Piwik frontend peview link to your aloha-sidebar, you can use following code to adding it:

<script type="text/javascript">

(function (Aloha) {
        'use strict';
if (typeof Aloha != "undefined") { 
Aloha.Sidebar.right.addPanel({
                        expanded: true,
                        title: 'Piwik',
                        content: '<a class="buttonaloha" href="fepiwik/#pageurl=' + window.location.href + '">Open piwik statistics</a>'
                });
}
}(window.Aloha));

</script>
