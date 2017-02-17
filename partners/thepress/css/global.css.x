/*
====================
General Tools
==================== */

.my-trip-inactive {
  display:none !important;
}
.fixed-tools .dropdown.login a {
      padding: 10px 20px;
}
.editable {
  border-bottom: 1px dotted #544741;
}
.gradient-background {
  width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0,0,0,.1);
}
#modal-background {
  position: fixed;
  width: 100%;
  background-color: rgba(255,255,255,.8);
  height: 100%;
  z-index: 99; 
}

#toast {
    position: fixed;
    bottom: 0px;
    width: 100%;
    left: 0px;
    background-color: rgba(147,165,65,.75);
    z-index: 9999999;
    text-align: center;
    padding: 5px;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
}

#modal {
    position: fixed;
    left: 5%;
    top: 25%;
    width: 90%;
    height: 50%;
    z-index: 100;
    background-color: rgba(255,255,255,.9);
}

#trip-bar {
  position: fixed;
  bottom: 0px;
  background-color: rgba(0,0,0,.8);
  color: #fff;
  width: 100%;
  padding: 4px;
  z-index: 999999;
}
.trip-details {
  float: right;
  padding-right: 4px;
}
#trip-bar-name {
  border-bottom: 1px dotted #eee;
  padding-left: 4px;
}
.map-filters-dialog {
     position: absolute;
    right: 10px;
    border-radius: 4px;
    width: 40%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    padding-right: 20px;
    padding-left: 20px;
    color: #fff; 

}
.dismissable {
  display: none;
}
.tooltip-container {
  position: relative;
}
.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.tooltip-text {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: calc( 100% + 10px );
  top: 0px;
  border-radius: 4px;
  font-size: 13px;
  background-color: rgba(0,0,0,.8);
  width: 150px;
  padding: 4px;
  padding-left: 8px;
  padding-right: 8px;
  transition: all 250ms ease-in-out 500ms;
}
.tooltip-text span {
  width: 0;
  height: 0;
  position: absolute;
  top: 10px;
  right: 100%;
  border-top: 5px solid transparent;
  border-right: 10px solid rgba(0,0,0,.8);
  border-bottom: 5px solid transparent;
}

.tooltip-container.tooltip-left .tooltip-text {
  right: calc(100% + 10px); 
  left: auto;
}
.tooltip-container.tooltip-left .tooltip-text span {
  width: 0;
  height: 0;
  position: absolute;
  top: 10px;
  left: 100%;
  border-right: none;
  border-top: 5px solid transparent;
  border-left: 10px solid rgba(0,0,0,.8);
  border-bottom: 5px solid transparent;
}

.tooltip-container.tooltip-top .tooltip-text {
  bottom: calc(100% + 10px); 
  left: -25%;
  top: auto;
}
.tooltip-container.tooltip-top .tooltip-text span {
  width: 0;
  height: 0;
  position: absolute;
  top: 100%;
  left: calc(50% - 10px);

  border-right: 5px solid transparent;
  border-top: 10px solid rgba(0,0,0,.8);
  border-left: 5px solid transparent;
}

.dropdown-menu li {
  cursor: pointer;
}

/*
====================
Colors
==================== */

.cta h1, .cta .date, .cta p, .block-content h1, .block-content h2, .block-content h3 {
  text-shadow: 0px 0px 7px rgba(0,0,0,.25);
}

.white { color: #fff; }
.bg-white { background-color: #fff; }
.beige { color: #F9F9F2; }
.bg-beige { background-color: #F9F9F2; }
.lightBeige { color: #C4C5B4; }
.bg-lightBeige { background-color: #C4C5B4; }
.olive { color: #93A558; }
.bg-olive { background-color: #93A558; }
.bg-olive-alpha { background-color: rgba(147, 165, 88, 0.75); }
.darkOlive { color: #505310; }
.bg-darkOlive { background-color: #505310; }
.lightOlive { color: #F0F4DC; }
.bg-lightOlive { background-color: #F0F4DC; }
.brown { color: #544741; }
.bg-brown { background-color: #544741; }
.bg-brown-alpha { background-color: rgba(84, 71, 65, 0.8); }
.medBrown { color: #675952; }
.bg-medBrown { background-color: #675952; }
.lightBrown { color: #A49C7E; }
.bg-lightBrown { background-color: #A49C7E; }
.orange { color: #FF944E; }
.bg-orange { background-color: #FF944E; }
.bg-orange-alpha { background-color: rgba(255, 148, 78, 0.60); }
.lightOrange { color: #FEB17E; }
.bg-lightOrange { background-color: #FEB17E; }
.superLightOrange { color: #F9F4E4; }
.bg-superLightOrange { background-color: #F9F4E4; }
.bg-darkGray { color: #323228; }
.darkGray { background-color: #323228; }
.bg-darkGray-alpha { background-color: rgba(50, 50, 40, 0.75); }
.lightGray { color: #F4F5EC; }
.bg-lightGray { background-color: #F4F5EC; }
.red { color: #FF5B50; }
.bg-red { background-color: #FF5B50; }
.bg-red-alpha { background-color: rgba(255, 91, 80, 0.80); }

/* Button Background Color Hover States */
.button.bg-olive:hover {
  background-color: #82924e;
}
.button.bg-olive-alpha:hover {
  background-color: rgba(147, 165, 88, 1);
}
.button.bg-orange:hover, .button.bg-lightOrange:hover {
  background-color: #e78748;
}
.button.bg-red:hover {
  background-color: #d95047;
}
.button.bg-brown:hover {
  background-color: #493e39;
}
.button.bg-brown-alpha:hover {
  background-color: rgba(84, 71, 65, 1);
}
.button.bg-darkGray-alpha:hover {
  background-color: rgba(50, 50, 40, 1);
}
.button.bg-orange-alpha:hover {
  background-color: rgba(255, 148, 78, 1);
}
.button.bg-red-alpha:hover {
  background-color: rgba(255, 91, 80, 1);
}

/*
====================
Typography
==================== */

@font-face {
  font-family: 'Gza';
  src: url('../fonts/gza.eot');
  src: url('../fonts/gza.eot?#iefix') format('embedded-opentype'),
       url('../fonts/gza.woff2') format('woff2'),
       url('../fonts/gza.woff') format('woff'),
       url('../fonts/gza.ttf') format('truetype'),
       url('../fonts/gza.svg#gza') format('svg');
}

.serif {
  font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
  font-style: normal;
  font-weight: 400;
}

.sans {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
}

.sans-bold {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
}

.divider {
  font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  width: auto;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-bottom: 25px;
}

.divider:before {
  content: '';
  width: 50%;
  height: 1px;
  background-color: #C4C5B4;
  display: block;
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 0;
}

.divider:after {
  content: '';
  width: 50%;
  height: 1px;
  background-color: #C4C5B4;
  display: block;
  position: absolute;
  z-index: 0;
  top: 50%;
  right: 0;
}

.num-divider {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  width: auto;
  height: 39px;
  color: #fff;
  position: relative;
  font-size: 22px;
  margin-bottom: 25px;
  text-transform: uppercase;
  text-indent: 0.1px;
}

.num-divider span {
  width: 31px;
  height: 39px;
  background: url('../img/markers/marker-blank.png') center center no-repeat;
  background-size: 31px 39px;
  display: block;
  z-index: 1;
  position: relative;
  margin: 0 auto;
}

.num-divider:before {
  content: '';
  width: 50%;
  height: 1px;
  background-color: #C4C5B4;
  display: block;
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 0;
}

.num-divider:after {
  content: '';
  width: 50%;
  height: 1px;
  background-color: #C4C5B4;
  display: block;
  position: absolute;
  z-index: 0;
  top: 50%;
  right: 0;
}

.divider span {
  background-color: #F9F9F2;
  padding: 0 20px;
  display: inline-block;
  position: relative;
  z-index: 1;
}

.divider.divider-lg {
  font-size: 28px;
}

.divider.divider-sm {
  font-size: 22px;
}

.divider.divider-xs {
  font-size: 18px !important;
}

@media (max-width: 768px) {
  .divider.divider-lg,
  .divider.divider-sm,
  .divider.divider-xs {
    font-size: 18px !important;
    margin-bottom: 20px !important;
  }
}

/*
====================
Buttons/Links
==================== */

.button {
  cursor: pointer;
  width: auto;
  color: #fff !important;
  border-radius: 25px;
}

.button:hover {
  color: #fff !important;
}

.button.clear {
  border: 1px solid #fff;
  background: transparent;
}

.button.clear:hover {
  background-color: #fff;
  color: #544741 !important;
}

.button.button-sm {
  padding: 10px 20px;
}

.button.button-lg {
  padding: 15px 40px;
  display: inline-block;
}

.button.button-cta {
  font-size: 22px;
  padding: 17px 60px;
  border-radius: 35px;
  font-weight: 300px;
  font-style: normal;
  margin: 35px 0;
  display: inline-block;
}

.button.button-xs {
  padding: 10px 20px;
  border-radius: 10px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700px;
  display: inline-block;
}

.button.button-tag {
  padding: 3px 5px;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700px;
  display: inline-block;
}

a {
  color: inherit;
}

a:hover, a:active, a:focus {
  color: inherit !important;
  text-decoration: none !important;
}

@media (max-width: 820px) {
  .button.button-lg {
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .button.button-cta {
    width: auto;
    font-size: 18px;
    padding: 15px 50px;
  }
}

/* Badges */

.partner-badge {
  width: 100%;
  height: 23px;
  text-align: center;
  display: inline-block;
  background: url('../img/partner-badge.png') center center no-repeat;
  background-size: 23px 23px;
  opacity: 0.5;
}

.partner-badge:before {
  content: 'Partner';
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  display: inline-block;
  margin-right: 25px;
  font-size: 12px;
  position: relative;
}

.partner-badge:after {
  content: 'Winery';
  display: inline-block;
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  position: relative;
  margin-right: 5px;
}

.featured-badge {
  width: 100%;
  height: 23px;
  text-align: center;
  display: inline-block;
  background: url('../img/featured-badge.png') center center no-repeat;
  background-size: 23px 23px;
  opacity: 1;
}

/* <hr> */
hr {
  border-color: #C4C5B4;
  margin-top: 40px;
  margin-bottom: 25px;
}

/*
====================
Animations
==================== */

@keyframes slideIn {
  from {
    top: -65px;
  }
  to {
    top: 0;
  }
}

@keyframes slideOut {
  from {
    top: 25px;
  }
  to {
    top: 0;
  }
}

/*
====================
Layout
==================== */

html {
  height: 100%;
}

body {
  background-color: #F9F9F2 !important;
  font-family: 'europa', Helvetica, Arial, sans-serif !important;
  font-style: normal;
  font-weight: 400;
  color: #544741 !important;
  font-size: 16px !important;
  -webkit-font-smoothing: antialiased;
}

main {
  padding: 40px 0;
  overflow-x: hidden;
}

.no-padding {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.vert-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
}

ul {
  margin: 0;
  padding: 0;
}

/*
====================
Navs
==================== */

nav {
  width: 100%;
  height: auto;
  position: relative;
}

nav.clear {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}

nav.solid {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #F9F9F2;
  padding-bottom: 10px;
}

nav .logo-container {
  width: auto;
  height: 90px;
  line-height: 90px;
  text-align: center;
  border-bottom: 1px solid #fff;
}

nav.solid .logo-container {
  border-bottom-color: #A49C7E !important;
}

nav .logo-container img.logo {
  max-width: 175px;
  height: auto;
  display: inline-block;
  vertical-align: middle;
}

nav .logo-container img.logo-fixed {
  width: 30px;
  height: 30px;
  display: none;
}

nav .logo-container img.logo-stamp {
  width: 49px;
  height: 49px;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -24.5px;
}

nav.affix .logo-container img.logo-stamp {
  display: none;
}

/* Fixed Nav on scroll */

nav.affix {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  animation-name: slideIn;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  transform: translate3d(0, 0, 0);
  background-color: #fff;
  padding: 10px 0;
}

.nav-wrapper {
  max-width: 1100px;
}

nav.nav-sm .nav-wrapper,
nav.affix .nav-wrapper {
  max-width: 850px;
}

nav.affix-top {
/*
  animation-name: slideOut;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
*/
  transform: translate3d(0, 0, 0);
}

nav.affix .logo-container {
  float: left;
  height: auto;
  border: none;
}

nav.affix .nav-container {
  float: left;
}

nav.affix .logo-container img.logo {
  display: none;
}

nav.affix .logo-container img.logo-fixed {
  display: block;
}

nav.affix .nav-container ul.main-nav {
  padding-left: 30px;
}

nav.affix .nav-container ul.main-nav li {
  border: none;
}

nav.affix .nav-container ul.main-nav li a {
  color: #544741 !important;
  padding: 5px 15px;
  letter-spacing: 4px !important;
}

/* Nav Hovers */
nav.affix .nav-container ul.main-nav li a:hover,
nav.affix .nav-container ul.main-nav li a.active,
nav.nav-sm .nav-container ul.main-nav li a:hover,
nav.nav-sm .nav-container ul.main-nav li a.active,
nav.solid.affix .nav-container ul.main-nav li a:hover,
nav.solid.affix .nav-container ul.main-nav li a.active {
  color: #93A558 !important;
}

nav.clear .nav-container ul.main-nav li a:hover {
  opacity: 0.7;
}

nav.solid .nav-container ul.main-nav li a:hover,
nav.solid .nav-container ul.main-nav li a.active {
  color: #93A558 !important;
}

/* Smaller/Compact Nav */

nav.nav-sm {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: #fff;
  padding: 10px 0 ;
}

nav.nav-sm.affix-top {
  position: fixed;
/*
  animation-name: slideOut;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
*/
  transform: translate3d(0, 0, 0);
}

nav.nav-sm.affix {
  position: fixed;
  animation-name: slideIn;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  transform: translate3d(0, 0, 0);
}

nav.nav-sm .logo-container {
  float: left;
  height: auto;
  border: none;
}

nav.nav-sm .logo-container img.logo {
  display: none;
}

nav.nav-sm .nav-container {
  float: left;
}

nav.nav-sm .logo-container img.logo-fixed {
  display: block;
}

nav.nav-sm .nav-container ul.main-nav {
  padding-left: 30px;
}

nav.nav-sm .nav-container ul.main-nav li {
  border: none;
}

nav.nav-sm .nav-container ul.main-nav li a {
  color: #544741 !important;
  padding: 5px 15px;
  letter-spacing: 4px;
}

@media (max-width: 992px) {
  nav.nav-sm .nav-container ul.main-nav li a {
    padding: 5px 10px;
  }
}

/* Nav Tools */

nav .fixed-tools,
nav.nav-sm .fixed-tools {
  display: none;
}

nav.affix .logo-container .tools {
  display: none;
}

nav .tools .login img,
nav .fixed-tools .login img {
  max-width: 50px;
  height: auto;
}

nav .tools .login ul li a,
nav .fixed-tools .login ul li a {
  color: #544741 !important;
  width: 100%;
  font-weight: 700;
}

nav.clear .tools ul li a:hover {
  opacity: 0.7;
}

nav .tools .login ul li,
nav .fixed-tools .login ul li {
  width: 100%;
  margin-left: 0 !important;
}

nav.affix .fixed-tools,
nav.nav-sm .fixed-tools {
  float: right;
  display: block;
  padding-top: 3px;
}

nav.affix .fixed-tools .login img,
nav.nav-sm .fixed-tools .login img {
  max-width: 30px;
  margin: 0 15px;
  height: auto;
}

nav.affix .fixed-tools ul li,
nav.nav-sm .fixed-tools ul li {
  float: left;
  list-style: none;
}

nav.affix .fixed-tools ul li a,
nav.nav-sm .fixed-tools ul li a {
  color: #544741 !important;
  text-transform: uppercase;
  font-size: 12px;
}

nav.affix .fixed-tools ul li a:hover,
nav.nav-sm .fixed-tools ul li a:hover {
  color: #93A558 !important;
}

nav.affix .fixed-tools ul li a i,
nav.nav-sm .fixed-tools ul li a i {
  font-size: 15px;
}

nav.affix .fixed-tools ul li.chronicle,
nav.nav-sm .fixed-tools ul li.chronicle {
  border-left: 1px solid #544741;
  padding-left: 15px;
}

nav.affix .fixed-tools ul li.chronicle img,
nav.nav-sm .fixed-tools ul li.chronicle img {
  width: 19px;
  height: 22px;
  filter: brightness(0%);
  -webkit-filter: brightness(0%);
}

nav .logo-container .tools {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
}

nav .logo-container .tools ul {
  margin-top: 20px;
}

nav .logo-container .tools ul li {
  float: left;
  line-height: 55px;
  list-style: none;
  margin-left: 25px;
}

nav .logo-container .tools ul li a {
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
}

nav.solid .logo-container .tools ul li a {
  color: #544741 !important;
  border-color: #544741 !important;
}

nav .logo-container .tools ul li.search i {
  font-size: 20px;
  color: #fff;
}

nav.solid .logo-container .tools ul li.search i {
  color: #544741;
}

nav.solid .logo-container .tools ul li.search a:hover i {
  color: #93A558 !important;
}

nav .logo-container .tools ul li.chronicle,
nav .logo-container .tools ul li.chronicle-small {
  border-left: 1px solid #fff;
}

nav.solid .logo-container .tools ul li.chronicle,
nav.solid .logo-container .tools ul li.chronicle-small {
  border-left-color: #A49C7E;
}

nav .logo-container .tools ul li.chronicle img {
  width: 147px;
  height: 15px;
  margin-left: 25px;
}

nav .logo-container .tools ul li.chronicle-small img {
  width: 25px;
  height: 29px;
  margin-left: 25px;
}

nav.solid .logo-container .tools ul li.chronicle img,
nav.solid .logo-container .tools ul li.chronicle-small img {
  filter: brightness(0%);
  -webkit-filter: brightness(0%);
}

/* Mobile Hamburger Menu Button */

nav a.toggle-nav {
  font-size: 30px;
  margin-right: 20px;
  color: #544741 !important;
  position: absolute;
  left: 0;
  top: 0;
  padding: 16px 20px 15px 25px;
  z-index: 9999;
  display: block;
}

nav a.map-button {
  font-size: 22px;
  margin-right: 0;
  color: #544741 !important;
  position: absolute;
  right: 0;
  top: 0;
  padding: 16px 25px 15px 20px;
  z-index: 9999;
  display: block;
}

nav a.map-button img.map-icon {
  width: 25px;
  height: 26px;
}

/* Filter Icon */
nav a.map-button img.filter-icon {
  width: 23px;
  height: 19px;
  margin-top: 5px;
}

nav a.map-button .fa-sliders {
  font-size: 30px;
}

/* Main Nav Buttons */

nav .nav-container ul.main-nav {
  width: 100%;
  max-width: 900px; /* 800px */
  display: table;
  margin: 0 auto;
}

nav .nav-container ul.main-nav li {
  display: table-cell;
  list-style: none;
  text-align: center;
  border-right: 1px solid #fff;
}

nav .nav-container ul.main-nav li:last-child {
  border-right: none;
}
nav .nav-container ul.main-nav li:not(.my-trip-inactive):last-child {
  border-right: none;
}

nav .nav-container ul.main-nav li a {
  text-transform: uppercase;
  letter-spacing: 7.56px;
  padding: 15px 25px;
  font-size: 16px;
  display: inline-block;
  color: #fff !important;
}

nav.solid .nav-container ul.main-nav li {
  border-right-color: #A49C7E !important;
}

nav.solid .nav-container ul.main-nav li a {
  color: #A49C7E !important;
}

nav.solid.affix .nav-container ul.main-nav li a {
  color: #544741 !important;
}

@media (max-width: 992px) {
  nav.affix .nav-container ul.main-nav li a {
    padding: 5px 10px;
    letter-spacing: 4px;
  }
  .nav-wrapper {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  nav.nav-sm {
    overflow: hidden;
    padding-top: 0;
  }
  nav.solid {
    overflow: hidden;
    padding-bottom: 0;
  }
  .nav-wrapper {
    padding-left: 0;
    padding-right: 0;
    overflow: hidden;
  }
  nav.affix {
    padding: 0;
  }
  nav .logo-container {
    height: 75px;
    line-height: 75px;
    border-bottom: none;
    background-color: #fff;
    border-bottom: 1px solid #999;
    overflow: hidden;
  }
  nav.affix .logo-container {
    height: 75px;
    width: 100%;
    margin-left: 0px;
    border-bottom: 1px solid #999;
  }
  nav.affix .logo-container img.logo-fixed,
  nav.nav-sm .logo-container img.logo-fixed {
    display: none !important;
  }
  nav .logo-container img.logo,
  nav .logo-container img.logo-mobile {
    filter: brightness(0%);
    -webkit-filter: brightness(0%);
    width: 134px !important;
    height: auto;
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    left: 0;
    margin-top: -5px;
  }
  nav.affix .nav-container ul.main-nav li a {
    padding: 10px;
  }
  nav.nav-sm {
    padding-bottom: 0;
  }
  nav.nav-sm .logo-container {
    width: 100%;
    margin-left: 0;
    border-bottom: 1px solid #999;
  }
}

/* Mobile Nav */

.mobile-dropdown {
  padding: 15px 0;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 75px;
  left: 0;
  z-index: 999999;
  background-color: rgba(84, 71, 65, 0.95);
  transition: all 0.3s;
  opacity: 0;
  visibility: hidden;
}

.mobile-dropdown.active {
  opacity: 1;
  visibility: visible;
}

.mobile-dropdown .search-bar {
  text-align: center;
  margin-top: 0;
}

.mobile-dropdown .search-bar input {
  width: 70%;
  border-radius: 25px;
  padding: 5px 5px 5px 10px;
  border: none;
}

.mobile-dropdown .search-bar button[type="submit"] {
  -webkit-appearance: none;
  appearance: none;
  color: #fff;
  border: none;
  background: none;
}

.mobile-dropdown .dropdown-nav ul {
  width: 100%;
  margin-top: 15px;
}

.mobile-dropdown .dropdown-nav ul li {
  text-align: center;
}

.mobile-dropdown .dropdown-nav ul li a {
  width: 100%;
  padding: 15px 0;
  font-size: 16px;
  color: #fff;
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  border-bottom: 1px solid #fff;
  text-transform: uppercase;
  letter-spacing: 7.56px;
}

.mobile-dropdown .dropdown-nav ul li a:hover {
  color: #fff !important;
}

.mobile-dropdown .dropdown-nav ul li:first-child a {
  border-top: 1px solid #fff;
}

.mobile-dropdown .dropdown-nav ul li:last-child a {
  border-bottom: none;
}

.mobile-dropdown .login-state {
  width: 100%;
  height: 85px;
  background-color: #93A558;
  position: absolute;
  bottom: 75px;
  left: 0;
  z-index: 9999;
}

.mobile-dropdown .login-state .login-state-container {
  text-align: center;
  padding: 33px 40px 40px 40px;
}

.mobile-dropdown .login-state .login-state-container .login-pic {
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
  z-index: 9999;
}

.mobile-dropdown .login-state .login-state-container .login-name {
  color: #fff;
  font-size: 18px;
}

.mobile-dropdown .login-state .login-state-container .login-status {
  font-size: 12px;
}

/*
====================
Headers
==================== */

header {
  width: 100%;
  height: auto;
  position: relative;
}

header.header-lg {
  height: 700px;
}

header.header-sm {
  height: 500px;
  margin-top: 152px;
}

@media (max-width: 768px) {
  header.header-lg {
    height: 550px;
  }
  header.header-sm {
    margin-top: 75px;
  }
}

/* Header Sub Nav */

header .subnav {
  padding: 10px 0;
  text-align: center;
}

header .subnav ul {
  max-width: 900px;
  margin: 0 auto;
  display: table;
}

header .subnav ul li {
  display: table-cell;
  padding: 0 15px;
}

header .subnav ul li a {
  color: #544741;
  text-transform: uppercase;
  letter-spacing: 4px;
}

header .subnav ul li a:hover {
  color: #fff !important;
}

/* Header Call to Action */

header .cta {
  width: 100%;
  text-align: center;
  color: #fff;
  max-width: 850px;
}

header .cta h1 {
  font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 48px;
  margin-top: 10px;
}

header .cta p {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  max-width: 700px;
  margin: 0 auto;
}

header .cta .date {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
}

@media (max-width: 768px) {
  header .cta {
    padding: 0 40px;
  }
  header .cta h1 {
    font-size: 38px;
  }
  header .cta p br {
    display: none;
  }
  header .cta p {
    font-size: 16px;
  }
}

/* Single Header */

.header-single {
  width: 100%;
  height: auto;
  margin-top: 52px;
  text-align: center;
  overflow: hidden;
}

.header-single .header-map {
  width: 100%;
  height: auto;
  max-height: 700px;
  overflow: hidden;
}

.header-single .header-title {
  margin: 30px 0;
}

.header-single .header-title p {
  font-size: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.header-single .header-title .date {
  margin-top: 25px;
}

.header-single .header-label {
  width: intrinsic;
  width: fit-content;
  width: -moz-fit-content;
  font-family: 'europa', Helvetica, Arial, sans-serif !important;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  position: relative;
  display: block;
  margin: 10px auto;
  text-transform: uppercase;
}

.header-single .header-label.no-accent:after {
  display: none;
}

.header-single .header-label:after {
  content: '';
  width: auto;
  height: 4px;
  background-color: #A49C7E;
  display: block;
}

.header-single h1 {
  font-size: 48px;
  text-transform: uppercase;
  margin-top: 0;
}

.header-single .carousel {
  width: 100%;
  max-height: 550px;
  margin: 0 auto;
}

.header-single .featured-image img {
  width: 100%;
  height: auto;
}

/* Single Header Two Column */

.header-single.header-two-column .featured-image img {
  width: 100%;
  height: auto;
}

.header-single.header-two-column .header-details {
  padding-left: 40px;
  text-align: left;
}

.header-single.header-two-column .header-details h1 {
  font-size: 30px;
}

.header-single.header-two-column .header-details article {
  margin-bottom: 15px;
}

.header-single.header-two-column .header-details .hours ul li {
  list-style: none;
}

.header-single.header-two-column .header-details .hours .status {
  margin-top: 10px;
}

.header-single.header-two-column .toolbar-options ul {
  margin: 15px 0;
}

.header-single.header-two-column .toolbar-options ul li {
  list-style: none;
  float: left;
  margin-right: 15px;
}

.header-single.header-two-column .toolbar-options ul li a {
  text-transform: uppercase;
  font-size: 14px;
}

.header-single.header-two-column .toolbar-options ul li.social-label {
  font-size: 14px;
}

.header-single.header-two-column .toolbar-options ul li.social i {
  font-size: 25px;
}

@media (max-width: 768px) {
  .header-single {
    margin-top: 75px;
  }
  .header-single .header-title {
    padding: 0 40px;
  }
  .header-single .header-title h1 {
    font-size: 38px;
  }
  .header-single.header-two-column .header-details {
    padding-left: 15px;
    text-align: center;
  }
  .header-single.header-two-column .toolbar-options ul {
    margin: 15px auto;
    display: table;
    text-align: center;
  }
}

/*
====================
Global Modules
==================== */

/* Callout Dividers */

.callout-divider .callout-content {
  padding: 0 0 50px 0;
  text-align: center;
}

.callout-divider img.stamp {
  width: 61px;
  height: 61px;
  margin: 0 auto;
  display: block;
  text-align: center;
}

.callout-divider .callout-content h1 {
  font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 48px;
}

.callout-divider .callout-content p {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
}

@media (max-width: 768px) {
  .callout-divider .callout-content {
    padding: 0 40px;
  }
  .callout-divider .callout-content h1 {
    font-size: 38px;
  }
  .callout-divider .callout-content p {
    font-size: 16px;
  }
}

/* One Column (Stories) */

.one-column {
  margin: 0 auto 35px auto;
  padding-bottom: 25px;
  border-bottom: 1px solid #C4C5B4;
}

.one-column:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.one-column .content h1 {
  text-transform: uppercase;
  font-size: 36px;
}

.one-column .content .date {
  font-size: 18px;
  margin: 10px auto 25px auto;
  display: inline-block;
}

.one-column .content .distance {
  font-size: 20px;
}

.one-column .content .distance span {
  font-weight: 400 !important;
  margin-left: 8px;
  font-size: 16px;
}

.one-column .content p {
  font-size: 18px;
  line-height: 28px;
}

.one-column .content img {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .one-column .content .distance {
    margin: 15px auto;
  }
}

/* Two-Column Blocks */

.two-column .sub-header {
  text-align: center;
  max-width: 750px;
  margin: 0 auto;
}

.two-column .sub-header .partner-badge,
.two-column .sub-header .affiliate-badge {
  background-size: 37px 35px;
  height: 35px;
  opacity: 1;
}

.two-column .block {
  width: 100%;
  height: auto;
  min-height: 350px;
  position: relative;
  color: #fff;
  display: block;
  margin: 0 auto;
  transition: all 0.3s;
}

.two-column .block:after {
  opacity: 0;
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(255, 148, 78, 0.60);
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}

.two-column .block:hover:after {
  opacity: 1;
}

.two-column .block .block-label {
  width: intrinsic;
  width: fit-content;
  width: -moz-fit-content;
  font-family: 'europa', Helvetica, Arial, sans-serif !important;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  position: relative;
  display: block;
  margin: 0 auto;
  padding-top: 25px;
  text-transform: uppercase;
  z-index: 9999;
}

.two-column .block .block-label:after {
  content: '';
  width: auto;
  height: 4px;
  background-color: #fff;
  display: block;
}

.two-column .block .block-label.no-accent {
  text-transform: none;
  font-size: 14px;
}

.two-column .block .block-label.no-accent:after {
  display: none;
}

.two-column .block .block-content {
  width: 80%;
  text-align: center;
  z-index: 9999;
}

.two-column .block-caption {
  text-align: center;
  max-width: 80%;
  margin: 20px auto 0 auto;
}

.two-column .block .block-content h3 {
  font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  text-transform: uppercase;
  position: relative;
  margin-top: 10px;
}

.two-column .block.sponsored .block-content h3 {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
}

.two-column .block .block-content .date {
  font-size: 20px;
}

@media (max-width: 998px) {
  .two-column .block .block-content h3 {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .two-column .block {
    margin-bottom: 25px;
  }
  .two-column .block .block-label {
    letter-spacing: 5px;
    margin-bottom: 0;
  }
  .two-column .block .block-label.no-accent {
    letter-spacing: normal;
  }
  .two-column .block-caption {
    margin-top: 0;
  }
  .two-column .block-container  h2 {
    margin-top: 0 !important;
  }
}

/* Two Column Divider */

.two-column.two-column-divider .divider {
  margin-bottom: 40px;
}

.two-column.two-column-divider .block-padding {
  min-height: 275px;
  margin: 20px 40px;
  display: block;
  position: relative;
}

.two-column.two-column-divider .block-padding:after {
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(147, 165, 88, 0.5);
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}

.two-column.two-column-divider .block-padding:hover:after {
  opacity: 1;
}

.two-column.two-column-divider .block-padding .block-content {
  width: 100%;
  padding: 0 40px;
  z-index: 9999;
}

.two-column.two-column-divider .block-padding .block-content .partner-badge,
.two-column.two-column-divider .block-padding .block-content .affiliate-badge {
  -webkit-filter: brightness(300%);
  filter: brightness(300%);
  opacity: 1;
}

.two-column.two-column-divider .block-padding .block-content .partner-badge:before,
.two-column.two-column-divider .block-padding .block-content .partner-badge:after {
  color: #fff;
  opacity: 1 !important;
}

.two-column.two-column-divider .block-container:first-child {
  border-right: 1px solid #C4C5B4;
}

.two-column.two-column-divider .block-padding img {
  max-width: 100%;
  height: auto;
}

.two-column.two-column-divider .block-text {
  text-align: center;
  padding: 0 60px;
}

.two-column.two-column-divider .block-text .block-label {
  width: intrinsic;
  width: fit-content;
  width: -moz-fit-content;
  font-family: 'europa', Helvetica, Arial, sans-serif !important;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  text-align: center;
  position: relative;
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.two-column.two-column-divider .block-text .block-label:after {
  content: '';
  width: auto;
  height: 2px;
  background-color: #A49C7E;
  display: block;
}

.two-column.two-column-divider .block-padding h3 {
  font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  text-transform: uppercase;
  text-align: center;
}

.two-column.two-column-divider .block-padding.sponsored h3 {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
}

@media(max-width: 768px) {
  .two-column.two-column-divider .block-padding {
    margin: 0 0 15px 0;
  }
  .two-column.two-column-divider .block-container:first-child {
    border-right: none;
  }
}

/* Two Up Divider Blocks */

.two-up-divider {
  margin: 0 auto 40px auto;
}

.two-up-divider .block-container {
  margin-bottom: 20px;
}

.two-up-divider .block {
  display: block;
  position: relative;
}

.two-up-divider .block:after {
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(255, 148, 78, 0.60);
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}

.two-up-divider .block:hover:after {
  opacity: 1;
}

.two-up-divider img.trans-icon {
  max-width: 48px;
  height: auto;
}

.two-up-divider .two-up-pic img {
  width: 100%;
  height: auto;
}

.two-up-divider .two-up-info h4 {
  font-size: 20px;
  margin-top: 0;
  float: left;
}

.two-up-divider .two-up-info p {
  font-size: 14px;
  clear: both;
}

.two-up-divider .two-up-info .affiliate-badge,
.two-up-divider .two-up-info .partner-badge {
  float: left;
  vertical-align: middle;
  display: inline-block;
  text-align: left;
  width: 23px;
  margin-left: 8px;
  margin-top: 3px;
}

.two-up-divider .two-up-info .partner-badge:before,
.two-up-divider .two-up-info .partner-badge:after {
  display: none;
}

@media (max-width: 768px) {
  .two-up-divider {
    margin: 20px auto 0 auto;
  }
  .two-up-divider .two-up-info {
    margin-top: 20px;
    padding: 0 25px;
  }
}

/* Two Panel (Side by Side) */

.two-panel {
  margin: 40px auto 80px auto;
  position: relative;
}

.two-panel .panel-pic {
  min-height: 551px;
}

.two-panel .panel-padding {
  min-height: 551px;
  position: relative;
}

.two-panel .panel-content {
  padding: 40px;
  width: 100%;
  text-align: center;
}

.two-panel .panel-content h1 {
  text-transform: uppercase;
  font-size: 48px;
}

.two-panel .panel-content p {
  font-size: 20px;
}

.two-panel .panel-content .date {
  margin-top: 25px;
  display: inline-block;
}

.two-panel .panel-label {
  width: intrinsic;
  width: fit-content;
  width: -moz-fit-content;
  font-family: 'europa', Helvetica, Arial, sans-serif !important;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  position: relative;
  display: block;
  margin: 0 auto;
  padding-top: 15px;
  text-transform: uppercase;
}

.two-panel .panel-label:after {
  content: '';
  width: auto;
  height: 4px;
  background-color: #A49C7E;
  display: block;
}

.two-panel .panel-block:after {
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 91, 80, 0.50);
  opacity: 0;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  pointer-events: none;
}

.two-panel .panel-block:hover:after {
  opacity: 1;
}

@media (max-width: 768px) {
  .two-panel {
    margin-bottom: 20px;
  }
  .two-panel .panel-padding {
    min-height: 0;
    height: auto;
  }
  .two-panel .panel-content {
    padding: 25px;
    position: relative;
    top: auto;
    left: auto;
    transform: translate(0, 0);
    -webkit-transform: translate(0, 0);
  }
  .two-panel .panel-content img {
    width: 100%;
    height: auto;
  }
  .two-panel .panel-content h1 {
    font-size: 35px;
  }
  .two-panel .panel-content p {
    font-size: 16px;
  }
  .two-panel .panel-content .date {
    margin-top: 0;
  }
}

/* Three-Column Blocks */

.three-column {
  margin: 40px auto;
}

.three-column .sub-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.three-column .sub-header .partner-badge,
.three-column .sub-header .affiliate-badge {
  background-size: 37px 35px;
  height: 35px;
  opacity: 1;
}

.three-column .sub-header .partner-badge:before,
.three-column .sub-header .partner-badge:after {
  display: none;
}

.three-column .block {
  width: 100%;
  height: auto;
  min-height: 200px;
  position: relative;
  color: #fff;
  display: block;
}

.three-column .block:after {
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 148, 78, 0.60);
  opacity: 0;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}

.three-column .block:hover:after {
  opacity: 1;
}

.three-column .block-padding:after {
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(147, 165, 88, 0.5);
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}

.three-column .block-padding:hover:after {
  opacity: 1;
}

.three-column .block-label {
  width: intrinsic;
  width: fit-content;
  width: -moz-fit-content;
  font-family: 'europa', Helvetica, Arial, sans-serif !important;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  text-align: center;
  position: relative;
  display: block;
  margin: 0 auto;
  padding-top: 15px;
  text-transform: uppercase;
}

.three-column .block-label:after {
  content: '';
  width: auto;
  height: 2px;
  background-color: #A49C7E;
  display: block;
}

.three-column .block-label.no-accent {
  font-size: 12px;
  text-transform: none;
}

.three-column .block-label.no-accent:after {
  display: none;
}

.three-column .block-content {
  max-width: 95%;
  margin: 0 auto;
  text-align: center;
  z-index: 9999;
}

.three-column .block-content h4 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 0;
}

.three-column .block-content .date {
  font-size: 14px;
  margin: 7px 0;
  display: inline-block;
}

@media (max-width: 768px) {
  .three-column {
    margin-top: 0;
    margin-bottom: 0;
  }
  .three-column .the-column {
    width: 300px;
    float: left;
  }
  .three-column .the-column .block {
    max-width: 400px;
    margin: 0 auto;
  }
}

/* Three Column Divider */

.three-column.three-column-divider .divider {
  margin-bottom: 25px;
}

.three-column.three-column-divider .block-wrapper {
  max-width: 1000px;
  text-align: center;
}

.three-column.three-column-divider .block-padding {
  min-height: 200px;
  margin: 20px 0;
  display: block;
  position: relative;
}

.three-column.three-column-divider .block-text {
  text-align: center;
  padding: 0 20px;
}

.three-column.three-column-divider .block-text p {
  font-size: 14px;
}

@media (min-width: 768px) {
  .three-column.three-column-divider .block-wrapper {
    margin: 0 auto;
  }
}

/* Featured Story */

.featured-story {
  height: auto;
  margin: 0 auto 40px auto;
  position: relative;
}

.featured-story .story-container {
  width: 100%;
  height: auto;
  min-height: 550px;
  display: block;
  overflow: hidden;
  position: relative;
}

.featured-story .story-container:after {
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(255, 91, 80, 0.50);
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}

.featured-story .story-container:hover:after {
  opacity: 1;
}

.featured-story .story-content .story-label {
  width: intrinsic;
  width: fit-content;
  width: -moz-fit-content;
  font-family: 'europa', Helvetica, Arial, sans-serif !important;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  position: relative;
  display: block;
  margin: 0 auto;
  padding-top: 25px;
  text-transform: uppercase;
}

.featured-story .story-content .story-label:after {
  content: '';
  width: auto;
  height: 4px;
  background-color: #fff;
  display: block;
}

.featured-story .story-content {
  z-index: 9999;
  text-align: center;
  width: 100%;
  max-width: 700px;
  margin-top: -40px;
  padding: 0 20px;
}

.featured-story .story-content h1 {
  font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 48px;
}

.featured-story .story-content.sponsored h1 {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
}

.featured-story .story-text {
  text-align: center;
  margin: 20px auto;
  position: relative;
  clear: both;
}

.featured-story .story-text p {
  font-size: 16px;
}

.featured-story .story-text .date {
  font-size: 14px;
}

@media (max-width: 998px) {
  .featured-story .story-content h1 {
    font-size: 38px;
  }
}

@media (max-width: 768px) {
  .featured-story .story-container {
    min-height: 450px;
  }
  .featured-story .story-content {
    padding: 0 40px;
    margin-top: 0;
  }
}

/* Featured Callout */

.featured-callout {
  width: auto;
  min-height: 550px;
  margin: 40px auto;
  text-align: center;
  position: relative;
}

.featured-callout .callout-content {
  width: 100%;
  max-width: 850px;
}

.featured-callout .callout-content img.stamp {
  width: 61px;
  height: 61px;
  margin: 0 auto;
  display: block;
  text-align: center;
}

.featured-callout .callout-content h1 {
  font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 48px;
}

.featured-callout .callout-content p {
  font-size: 20px;
}

.featured-callout .callout-content.sponsored h1 {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .featured-callout .callout-content {
    padding: 0 40px;
  }
  .featured-callout .callout-content h1 {
    font-size: 38px;
  }
  .featured-callout .callout-content p {
    font-size: 16px;
  }
}

/* Quad Columns */

.quad-column {
  position: relative;
  margin: 40px auto;
  border-top: 1px solid #C4C5B4;
  padding-top: 40px;
}

.quad-column .quad-block {
  min-height: 125px;
  margin: 0 20px 13px 20px;
  display: block;
  position: relative;
}

.quad-column .quad-block:after {
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(147, 165, 88, 0.50);
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}

.quad-column .quad-block:hover:after {
  opacity: 1;
}

.quad-column .quad-block .event-date {
  font-size: 34px;
  color: #fff;
  z-index: 9999;
  pointer-events: none;
  text-transform: uppercase;
  text-align: center;
  line-height: 27px;
}

.quad-column .block-text {
  text-align: center;
}

.quad-column .block-container {
  border-right: 1px solid #C4C5B4;
}

.quad-column .block-container:nth-child(4) {
  border-right: none;
}

.quad-column .block-text .block-label {
  width: intrinsic;
  width: fit-content;
  width: -moz-fit-content;
  font-family: 'europa', Helvetica, Arial, sans-serif !important;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  text-align: center;
  position: relative;
  display: block;
  margin: 10px auto;
  text-transform: uppercase;
}

.quad-column .block-text .block-label:after {
  content: '';
  width: auto;
  height: 2px;
  background-color: #A49C7E;
  display: block;
}

.quad-column .block-text .block-label.no-accent {
  font-size: 12px;
  text-transform: none;
}

.quad-column .block-text .block-label.no-accent:after {
  display: none;
}

.quad-column .block-text h4 {
  font-size: 20px;
}

.quad-column .block-text h4 {
  margin-top: 0;
  margin-bottom: 0;
}

.quad-column .block-text img {
  max-width: 25px;
  height: auto;
  margin-top: 5px;
}

.quad-column .block-text img.trans-icon {
  max-width: 48px;
  height: auto;
}

@media(max-width: 992px) {
  .quad-column .quad-block .event-date {
    font-size: 18px;
  }
}

@media(max-width: 768px) {
  .quad-column {
    margin-top: 0;
    margin-bottom: 0;
  }
  .quad-column .quad-block {
    max-width: 400px;
    min-height: 300px;
    margin: 0 auto 13px auto;
  }
  .quad-column .quad-block .event-date {
    font-size: 34px;
  }
}

/* Quad Columns Divider */

.quad-column.quad-column-divider {
  border-top: none;
  padding-top: 0;
}

.quad-column.quad-column-divider .divider {
  margin-bottom: 30px;
}

.quad-column .sub-header {
  text-align: center;
  max-width: 600px;
  margin: 5px auto 20px auto;
}

.quad-column .super-sub-header {
  text-align: center;
  margin: 10px auto;
}

.quad-column .super-sub-header .super-sub-title {
  text-transform: uppercase;
  letter-spacing: 3.21px;
  font-size: 18px;
  margin-top: 10px;
}

.quad-column .super-sub-header img {
  max-width: 24px;
  height: auto;
}

.quad-column .sub-header .partner-badge,
.quad-column .sub-header .affiliate-badge {
  background-size: 37px 35px;
  height: 35px;
  opacity: 1;
}

.quad-column .sub-header .partner-badge:before,
.quad-column .sub-header .partner-badge:after {
  display: none;
}

.quad-column.quad-column-divider .block-text {
  padding: 0 20px;
}

.quad-column.quad-column-divider.no-borders .block-container {
  border-right: none;
}

.quad-column.quad-column-divider.no-borders p {
  margin-bottom: 25px;
  font-size: 14px;
}

/* Directory Header */

.directory-header .sub-header {
  text-align: center;
  max-width: 600px;
  margin: 5px auto 20px auto;
}

.directory-header .divider {
  margin-bottom: 25px;
}

.directory-header .directory-container {
  padding: 30px 0;
}

.directory-header .directory-container h3 {
  float: left;
  font-size: 28px;
  margin: 0;
}

.directory-header .directory-container .num-label {
  display: inline-block;
  float: left;
  vertical-align: baseline;
  margin-left: 15px;
  margin-top: 5px;
}

.directory-header .directory-tools ul {
  float: right;
}

.directory-header .directory-filters ul {
  float: left;
}

.directory-header .directory-tools ul.tools-container > li,
.directory-header .directory-filters ul.tools-container > li {
  list-style: none;
  float: left;
}

.directory-header .directory-tools ul.tools-container > li a,
.directory-header .directory-filters ul.tools-container > li a {
  font-size: 20px;
  padding: 0 10px;
}

.directory-header .directory-tools a.toggle-filters {
  font-size: 25px;
  float: right;
  margin-top: -20px;
  display: block;
}

.directory-header .directory-tools img.filter-icon {
  margin-right: 5px;
  width: 22px;
  height: 18px;
}

.directory-header .directory-tools ul.tools-container > li a:hover img.filter-icon {
  filter: brightness(40%);
  -webkit-filter: brightness(40%);
}

@media (max-width: 992px) {
  .directory-header .directory-label .num-label {
    margin-left: 0;
    clear: both;
  }
}

@media (max-width: 768px) {
  .directory-header .directory-tools ul.tools-container {
    float: left;
  }
  .directory-header .directory-tools ul.tools-container > li {
    margin-left: 0;
    margin-right: 15px;
  }
  .directory-header .directory-tools ul.dropdown-menu {
    right: 0;
    left: auto;
  }
  .directory-header .directory-tools ul.dropdown-menu li a  {
    font-size: 18px;
  }
}

/* Directory (List Module) */

.directory {
  margin: 30px auto;
}

.directory img {
  width: 100%;
  height: auto;
}

.directory .directory-list .directory-item {
  border-bottom: 1px solid #C4C5B4;
  margin-bottom: 25px;
  padding-bottom: 25px;
  padding-top: 25px;
  position: relative;
}

.directory .directory-list .directory-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.directory .directory-list .directory-item .directory-info h3 {
  font-size: 30px;
  margin-top: 0;
  margin-bottom: 0;
  display: inline-block;
  float: left;
}

.directory .directory-list .directory-item .directory-pic a {
  position: relative;
  display: block;
}

.directory .directory-list .directory-item .directory-pic img {
  width: 100%;
  height: auto;
}

.directory .directory-list .directory-item .directory-pic a:after {
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(147, 165, 88, 0.50);
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}

.directory .directory-list .directory-item .directory-pic a:hover:after {
  opacity: 1;
}

.directory .directory-list .directory-item .directory-pic .event-date {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  color: #fff;
  text-transform: uppercase;
  z-index: 9999;
  pointer-events: none;
}

.directory .directory-list .directory-item .directory-info h4 {
  clear: both;
  display: block;
  font-size: 14px;
  text-transform: uppercase;
}

.directory .directory-list .directory-item .directory-info p {
  font-size: 14px;
}

.directory .directory-list .directory-item .directory-info .status {
  text-transform: uppercase;
  margin-left: 5px;
}

.directory .directory-list .directory-item .directory-info .partner-badge,
.directory .directory-list .directory-item .directory-info .affiliate-badge {
  float: left;
  vertical-align: middle;
  display: inline-block;
  text-align: left;
  width: 100px;
  margin-left: 8px;
  margin-top: 3px;
  position: absolute;
}

.directory .directory-list .directory-item .directory-info .featured-badge {
  float: left;
  vertical-align: middle;
  display: inline-block;
  text-align: left;
  width: 23px;
  margin-left: 8px;
  margin-top: 3px;
  position: absolute;
}

.directory .directory-list .directory-item .directory-info .partner-badge:after {
  display: none;
}

.directory .directory-list .directory-item .directory-button {
  text-align: right;
}

.directory .directory-list .directory-item .directory-button a {
  display: block;
  width: intrinsic;
  width: -moz-fit-content;
  width: fit-content;
  position: relative;
  margin-bottom: 5px;
  clear: both;
  float: right;
}

.directory .directory-list .directory-item .directory-buttons {
  width: 100%;
  display: inline-block;
  text-align: right;
  line-height: 28px;
  text-transform: uppercase;
  font-size: 14px;
}

.directory .directory-list .directory-item .directory-buttons ul li {
  list-style: none;
  float: left;
  margin-right: 15px;
}

.directory .directory-list .directory-item .directory-info .categories ul li {
  list-style: none;
  float: left;
  margin-right: 5px;
}

.directory .directory-list .directory-item .directory-info .categories ul li a {
  text-transform: uppercase;
  font-size: 14px;
}

@media (max-width: 992px) {
  .directory .directory-list .directory-item .directory-pic .event-date {
    font-size: 16px;
  }
  .directory .directory-list .directory-item .directory-info h3 {
    font-size: 25px;
  }
  .directory .directory-list .directory-item .directory-button {
    float: right;
  }
  .directory .directory-list .directory-item .directory-button a {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .directory {
    margin-top: 0;
  }
  .directory .directory-list .directory-item {
    padding-left: 15px;
    padding-top: 0;
  }
  .directory .directory-list .directory-item:first-child {
    padding-top: 25px;
  }
  .directory .directory-list .directory-item .directory-buttons {
    padding-left: 0;
    display: block;
  }
  .directory .directory-list .directory-item .directory-buttons .button {
    padding: 3px 13px;
    font-size: 12px;
  }
  .directory .directory-list .directory-item .directory-buttons li.sub-map-button {
    font-size: 18px;
    margin-top: 3px;
  }
  .directory .directory-list .directory-item .directory-pic {
    padding-left: 0;
  }
  .directory .directory-list .directory-item .directory-pic .event-date {
    position: absolute;
    left: 45%;
    transform: translate(-45%, -50%);
    -webkit-transform: translate(-45%, -50%);
    -moz-transform: translate(-45%, -50%);
  }
  .directory .directory-list .directory-item .directory-info {
    width: auto;
    margin-top: 0;
    padding: 0;
  }
  .directory .directory-list .directory-item .directory-info h3 {
    font-size: 22px;
  }
  .directory .directory-list .directory-item .directory-info h4 {
    font-size: 14px !important;
  }
  .directory .directory-list .directory-item .directory-info .address {
    margin: 5px 0 0 0 !important;
  }
  .directory .directory-list .directory-item .directory-info .address p {
    margin-bottom: 0;
  }
  .directory .directory-list .directory-item .directory-info .categories {
    margin-bottom: 5px;
    display: inline-block;
  }
  .directory .directory-list .directory-item .directory-info .categories ul li a {
    font-size: 12px;
  }
}

/* Directory Alternate (List/Map Module) */

.directory-alt {
  margin: 30px auto;
}

.directory-alt .directory-list .directory-item {
  margin-bottom: 25px;
  padding-bottom: 0;
  padding-top: 25px;
  position: relative;
}

.directory-alt .directory-list .directory-item .item-container {
  border-bottom: 1px solid #C4C5B4;
  padding-bottom: 30px;
}

.directory-alt .directory-list .directory-item .item-container:last-child {
  padding-bottom: 0;
}

.directory-alt .directory-list .directory-item .item-map {
  text-align: right;
}

.directory-alt .directory-list .directory-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}


.directory-alt .directory-list .directory-item .directory-pic a {
  position: relative;
  display: block;
}

.directory-alt .directory-list .directory-item .directory-pic a:after {
  content: '';
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(147, 165, 88, 0.50);
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
}

.directory-alt .directory-list .directory-item .directory-pic a:hover:after {
  opacity: 1;
}

.directory-alt .directory-list .directory-item .directory-pic img {
  width: 100%;
  height: auto;
}

.directory-alt .directory-list .directory-item .directory-pic .event-date {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  color: #fff;
  text-transform: uppercase;
  z-index: 9999;
  pointer-events: none;
}

.directory-alt .directory-list .directory-item .directory-info h3 {
  font-size: 30px;
  margin-top: 0;
  margin-bottom: 0;
  display: inline-block;
  float: left;
}

.directory-alt .directory-list .directory-item .directory-info h4 {
  clear: both;
  display: block;
  font-size: 14px;
  text-transform: uppercase;
}

.directory-alt .directory-list .directory-item .directory-info p {
  font-size: 14px;
}

.directory-alt .directory-list .directory-item .directory-info .status {
  text-transform: uppercase;
  margin-left: 5px;
}

.directory-alt .directory-list .directory-item .directory-info .partner-badge,
.directory-alt .directory-list .directory-item .directory-info .affiliate-badge {
  float: left;
  vertical-align: middle;
  display: inline-block;
  text-align: left;
  width: 23px;
  margin-left: 8px;
  margin-top: 3px;
}

.directory-alt .directory-list .directory-item .directory-button {
  text-align: right;
}

.directory-alt .directory-list .directory-item .directory-button a {
  display: block;
  width: intrinsic;
  width: fit-content;
  width: -moz-fit-content;
  position: relative;
  margin-bottom: 5px;
  clear: both;
  float: right;
}

.directory-alt .directory-list .directory-item .directory-buttons {
  width: 100%;
  display: inline-block;
  text-align: right;
  line-height: 28px;
  text-transform: uppercase;
  font-size: 14px;
}

.directory-alt .directory-list .directory-item .directory-buttons ul li {
  list-style: none;
  float: left;
  margin-right: 15px;
}

@media (max-width: 992px) {
  .directory-alt .directory-list .directory-item .directory-pic .event-date {
    font-size: 16px;
  }
  .directory-alt .directory-list .directory-item .directory-info h3 {
    font-size: 25px;
  }
  .directory-alt .directory-list .directory-item .directory-button a {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .directory-alt .directory-list .directory-item .item-map {
    text-align: center;
    margin-top: 20px;
  }
  .directory-alt .directory-list .directory-item .directory-info {
    margin-top: 15px;
  }
}

/* Contributors (Circle Avatars) */

.contributors {
  margin: 40px auto;
  position: relative;
}

.contributors .divider {
  margin-top: 35px;
}

.contributors .avatar-container {
  text-align: center;
  padding: 0 0 60px 0;
}

.contributors .avatar {
  width: 134px;
  height: 134px;
  display: block;
  border-radius: 50%;
  text-align: center;
  margin: 0 auto;
  position: relative;
}

.contributors .avatar-wrapper {
  max-width: 850px;
  margin: 0 auto;
}

.contributors .avatar-wrapper a {
  width: intrinsic;
  width: fit-content;
  width: -moz-fit-content;
  display: block;
  margin: 0 auto;
}

.contributors .avatar-container p {
  font-size: 20px;
}

/* Sponsored Ads */


/*
====================
Sign In Modal
==================== */

.modal {
  z-index: 9999989;
}

.modal-dialog {
  width: 100%;
  max-width: 700px;
  top: 50%;
  left: 50%;
  right: auto;
  transform: translate(-50%, -50%) !important;
  position: absolute;
  margin: 0;
}

.modal-dialog .modal-header {
  text-align: center;
}

.modal-dialog .modal-header .close {
  font-size: 50px;
  font-weight: 300 !important;
  margin-top: -15px;
  color: #544741 !important;
  opacity: 1;
}

.modal-dialog .modal-content {
  border-radius: 0;
  box-shadow: none;
  border: none;
  text-align: center;
}

.modal-dialog .modal-content .modal-body {
  width: 60%;
  text-align: center;
  margin: 0 auto;
}

.modal-dialog .modal-content .modal-body input {
  width: 100%;
  padding: 5px;
}

.modal-dialog .modal-content .modal-buttons {
  padding: 0 15px 15px 15px;
}

.modal-dialog .modal-content .modal-buttons button[type="submit"] {
  border: none;
}

.modal-dialog .modal-content .modal-buttons .forgot-pass {
  margin-top: 15px;
  display: inline-block;
}

.modal-dialog .modal-content .modal-buttons .forgot-pass:hover {
  text-decoration: underline !important;
}

@media (max-width: 768px) {
  .modal-dialog {
    top: 170px;
    margin-top: 75px;
  }
}

/*
====================
Search Modal
==================== */

.search-modal {
  width: 100%;
  height: 100px;
  background-color: #fff;
  padding: 25px;
  position: fixed;
  top: -100px;
  left: 0;
  z-index: 999999;
  transition: all 0.3s;
  visibility: hidden;
  transform: translate3d(0, 0, 0);
}

.search-modal.active {
  top: 0;
  visibility: visible;
}

.search-modal .close-button {
  top: 7px;
  right: 15px;
  position: absolute;
  z-index: 9999999;
  display: block;
  font-weight: 300 !important;
  color: #544741;
  font-size: 50px;
}

.search-modal input {
  width: 95%;
  height: 50px;
  padding: 10px;
}

.search-modal button[type="submit"] {
  -webkit-appearance: none;
  appearance: none;
  background: none;
  border: none;
}

@media (max-width: 768px) {
  .search-modal {
  }
}

/*
====================
Footer
==================== */

footer {
  background-color: #544741;
  text-align: center;
  padding: 40px 0;
}

footer .footer-logo img {
  max-width: 175px;
  height: auto;
}

footer .footer-links ul {
  width: 100%;
  max-width: 600px;
  height: auto;
  display: inline-block;
  margin: 40px 0;
  padding: 20px 0;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}

footer .footer-links ul li {
  list-style: none;
  margin-bottom: 15px;
}

footer .footer-links ul li:last-child {
  margin-bottom: 0;
}

footer .footer-links ul li a {
  font-family: 'europa', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 6.61px;
  font-size: 14px;
  color: #fff !important;
}

footer .footer-copyright img {
  max-width: 250px;
}

footer .footer-copyright p {
  font-size: 12px;
}