// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// AngularClass
import '@angularclass/hmr';


// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


// PatternFly JS Dependencies Entry

// jQuer
require('jquery/dist/jquery.min');

//Bootstrap JS
require('bootstrap/dist/js/bootstrap.min');

// Datatables, jQuery Grid Component
require('datatables/media/js/jquery.dataTables.min');
require('drmonty-datatables-colvis/js/dataTables.colVis');
require('datatables.net-colreorder/js/dataTables.colReorder');

// PatternFly Custom Componets -  Sidebar, Popovers and Datatables Customizations
// Note: jquery.dataTables.js must occur in the html source before patternfly*.js
require('patternfly/dist/js/patternfly.min.js');

// Moment
require('moment/min/moment.min.js');

// Bootstrap Combobox
//require('patternfly-bootstrap-combobox/js/bootstrap-combobox');

// Bootstrap Date Picker
require('bootstrap-datepicker/dist/js/bootstrap-datepicker.min');

// Bootstrap Date Time Picker - requires Moment
require('eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min');

// Bootstrap Select
require('bootstrap-select/dist/js/bootstrap-select.min');

// Bootstrap Touchspin
require('bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min');

// Bootstrap Tree View
require('patternfly-bootstrap-treeview/dist/bootstrap-treeview.min');

// Google Code Prettify - Syntax highlighting of code snippets
require('google-code-prettify/bin/prettify.min');

// MatchHeight - Used to make sure dashboard cards are the same height
require('jquery-match-height/jquery.matchHeight-min');

// Angular Application? You May Want to Consider Pulling Angular-PatternFly And Angular-UI Bootstrap instead of
// bootstrap.js
// See https://github.com/patternfly/angular-patternfly for more information

if ('production' === ENV) {
    // Production
    
    
} else {
    // Development
    
}
