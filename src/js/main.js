'use strict';
console.log('start');

//$('.datepicker').datepicker({format:'yyyy-mm-dd'});
$('.nav-tabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});
