/*
=======================
Single Story
======================= */
.single-content .single-body p a {
    color: #FF5B50;
    font-weight: 700;
}
.single-content .single-body h2 {
    font-size: 28px;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin: 0 0 25px 0;

    font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
    font-style: normal;
    font-weight: 400;
}

.single-content .single-body h3 {
    font-family: 'europa', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 700;
}
.single-content .single-body blockquote p  {
  border: none;
  text-align: center;
  line-height: 55px;
  font-size: 56px;

font-family: 'Gza', Georgia, 'Times New Roman', Times, serif;
    font-style: normal;
    font-weight: 400;
}
.single-content .single-body ul {
    list-style: none;
    padding-left: 20px;
    padding: 30px;
    background-color: #F4F5EC;
}
.single-content .single-body ul li {
    counter-increment: step-counter;
    line-height: 35px;
    font-size: 18px;
}
.single-content .single-body ul li:before {
    content: counter(step-counter);
    margin-right: 10px;
    color: #FF5B50;
    font-weight: 700;
}
/* Nav Hovers */

nav.solid .nav-container ul.main-nav li a:hover,
nav.solid .nav-container ul.main-nav li a.active {
  color: #FF5B50 !important;
}

nav.affix .nav-container ul.main-nav li a:hover,
nav.affix .nav-container ul.main-nav li a.active,
nav.nav-sm .nav-container ul.main-nav li a:hover,
nav.nav-sm .nav-container ul.main-nav li a.active,
nav.solid.affix .nav-container ul.main-nav li a:hover,
nav.solid.affix .nav-container ul.main-nav li a.active {
  color: #FF5B50 !important;
}

nav.affix .fixed-tools ul li a:hover,
nav.nav-sm .fixed-tools ul li a:hover {
  color: #FF5B50 !important;
}

nav.solid .logo-container .tools ul li.search a:hover i {
  color: #FF5B50 !important;
}

/* Header Single */

.header-single .date {
  font-size: 18px;
}

/* Single Toolbar */

.single-toolbar .toolbar-sponsor .sponsor-label {
  vertical-align: middle;
}

.single-toolbar .toolbar-author .author-label {
  text-align: center;
  font-size: 20px;
}

.single-toolbar .toolbar-container {
  border-bottom: 1px solid #C4C5B4;
  padding: 0 0 40px 0;
}

.single-toolbar .toolbar-button {
  text-align: right;
}

.single-toolbar .toolbar-options ul {
  float: right;
}

.single-toolbar .toolbar-options ul li {
  list-style: none;
  float: left;
  margin-left: 15px;
}

.single-toolbar .toolbar-options ul li a {
  text-transform: uppercase;
  font-size: 14px;
}

.single-toolbar .toolbar-options ul li.social-label {
  font-size: 14px;
}

.single-toolbar .toolbar-options ul li.social i {
  font-size: 25px;
}

/* Single Content */

.single-content .single-body {
  padding: 0;
  text-align: left;
}

.single-content .single-body article {
  padding-bottom: 30px;
}

.single-content .single-body article:first-child {
  padding-top: 70px;
}

.single-content .single-body h2 {
  font-size: 28px;
  text-transform: uppercase;
  letter-spacing: 5px;
  margin: 35px 0 25px 0;
}

.single-content .single-body p {
  line-height: 28px;
}

.single-content .single-body blockquote {
  border: none;
  text-align: center;
  line-height: 55px;
  font-size: 56px;
  padding: 10px 80px;
}

.single-content .single-body img {
  padding: 40px 0;
  width: 100%;
  height: auto;
}

.single-content .single-body article img {
  width: auto;
}

.quad-column .quad-block:after {
  background-color: rgba(255, 91, 80, 0.60);
}

.directory .directory-list .directory-item .directory-pic img {
  margin: 0 !important;
}

.directory .directory-list .directory-item:last-child {
  padding-bottom: 40px !important;
}

/* Single Sidebar */

.single-content .single-sidebar {
  padding-top: 70px;
  padding-bottom: 30px;
}

.single-content .single-sidebar .other-space {
  width: 300px;
  height: 250px;
  background-color: #ccc;
  float: right;
}

/* Related Stories */

.single-content .related-stories {
  margin-bottom: 40px;
}

.single-content .related-stories .story-container {
  min-height: 100px;
  border-right: 1px solid #C4C5B4;
}

.single-content .related-stories .story-container:last-child {
  border-right: none;
}

.single-content .related-stories .story-container a {
  width: 100%;
  height: auto;
}

.single-content .related-stories .story-content {
  width: 100%;
  height: auto;
  padding: 0 20px;
}

@media (max-width: 992px) {
  .item, .slide {
    height: 450px !important;
    overflow-y: hidden;
  }
  .single-content .single-sidebar .other-space {
    width: 100%;
    height: 250px;
  }
  .single-toolbar .toolbar-options ul {
    width: 100%;
    max-width: 350px;
    float: none;
    display: table;
    margin: 0 auto;
  }
  .single-toolbar .toolbar-options ul li {
    display: table-cell;
    float: none;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .single-content .single-body {
    padding: 0 15px;
  }
  .single-content .single-body blockquote {
    font-size: 38px;
    padding: 10px 30px;
    line-height: 40px;
  }
  main {
    padding-top: 15px;
  }
  .item, .slide {
    height: 375px !important;
    overflow-y: hidden;
  }
  .single-toolbar .toolbar-container {
    padding-bottom: 15px;
  }
  .single-toolbar .toolbar-options ul {
    max-width: 110px;
    margin-top: 10px;
  }
  .single-content .related-stories .story-container {
    min-height: 50px;
  }
  .single-content .related-stories .story-content {
    text-align: center;
  }
  .single-content .related-stories .divider {
    margin-left: -15px;
    width: 107%;
  }
}