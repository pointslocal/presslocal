/*
=======================
Single Winery - Tier I
======================= */

/* Carousel */

.indicators {
  left: 0;
  right: 0;
  width: auto;
  margin: 0 auto;
  position: absolute;
  z-index: 9;
  display: block;
  bottom: 0;
}

#indicator {
	position: relative;
	width: 80px;
	height: 20px;
	margin: 10px auto;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUBAMAAABohZD3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUGCDYztyDUJgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAGFBMVEUAAADNzc3Nzc3Nzc3Nzc3Nzc3Nzc3///8aWwwLAAAABnRSTlMAX5Ks3/nRD0HIAAAAAWJLR0QHFmGI6wAAAFtJREFUGFdjYGBgEHYNMWRAAJE0IHCEc5nSwEABxleD8JOgXMY0KBCA8FlgfAcIXwzGT4TwzWD8ZAjfDcZPgfDDYPxU7Hx09ejmoduH7h5096L7B8O/6OGBGl4APYg8TQ0XAScAAAAASUVORK5CYII=);
}

#dotty {
	position: absolute;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background: #777;
}

.slide {
  width: 100%;
  height: 550px;
  float: left;
}

.slide .item {
  width: 100%;
  height: 550px;
}

.slide img {
  width: 100%;
  height: auto;
}

/* Single Toolbar */

.single-toolbar .toolbar-container {
  border-bottom: 1px solid #C4C5B4;
  padding: 0 0 40px 0;
}

.single-toolbar .toolbar-button {
  text-align: right;
}

.single-toolbar .toolbar-options ul {
  float: right;
  margin-top: 10px;
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
  padding: 0 40px;
  text-align: left;
}

.single-content .single-body article {
  padding-bottom: 30px;
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

/* Single Sidebar */

.single-content .single-sidebar {
  padding-top: 25px;
  padding-bottom: 30px;
}

.single-content .single-sidebar ul li,
.single-content .single-sidebar p {
  list-style: none;
  font-size: 18px;
  line-height: 28px;
}

.single-content .single-sidebar .address p {
  font-size: 16px;
}

.single-content .single-sidebar .sidebar-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.single-content .single-sidebar article {
  padding-bottom: 25px;
  padding-top: 15px;
  border-bottom: 1px solid #C4C5B4;
}

.single-content .single-sidebar .location {
  padding-bottom: 15px;
}

.single-content .single-sidebar .winery-logo {
  border: 1px solid #ccc;
  background-color: #fff;
}

.single-content .single-sidebar .winery-logo img {
  width: 100%;
  height: auto;
}

.single-content .single-sidebar .location-label {
  text-transform: uppercase;
  font-size: 14px;
}
.single-content .single-sidebar .hours .status {
  margin-top: 20px;
}

.single-content .single-sidebar .hours .status span {
  margin-right: 15px;
  text-transform: uppercase;
}

.single-content .single-sidebar .cost,
.single-content .single-sidebar .format,
.single-content .single-sidebar .location,
.single-content .single-sidebar .deals {
  border-bottom: none;
  padding-bottom: 0;
}

/* Related Stories */

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

/* Trips */

.single-content .two-column.two-column-divider .block-padding {
  margin: 0;
  min-height: 200px;
}

.single-content .two-column.two-column-divider .block-container:first-child {
  border-right: none;
}

.single-content .two-column.two-column-divider .block-text {
  padding: 0 20px;
  margin-top: 15px;
}

.single-content .two-column.two-column-divider .block-text h3 {
  margin-top: 0;
  font-size: 20px;
}

.two-column.two-column-divider .block-padding:after {
  background-color: rgba(255, 148, 78, 0.60);
}

@media (max-width: 992px) {
  .item, .slide {
    height: 450px !important;
    overflow-y: hidden;
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
  .single-content .single-sidebar article {
    max-height: 50px;
    overflow: hidden;
    padding: 15px 15px 10px 15px;
    position: relative;
  }
  .single-content .single-sidebar article.expand {
    max-height: 100%;
  }
  .single-content .single-sidebar article:after {
    content: '\f107';
    font-family: FontAwesome;
    font-size: 30px;
    top: 5px;
    right: 15px;
    color: #544741;
    position: absolute;
    display: block;
  }
  .single-content .single-sidebar article.expand:after {
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }
  .single-content .single-sidebar .location {
    border-bottom: 1px solid #C4C5B4;
  }
  .single-content .single-sidebar .location h4 {
    margin-bottom: 15px;
  }
  .single-content .single-sidebar article h4 {
    margin-top: 0;
  }
  .single-content .single-sidebar ul li {
    font-size: 16px;
  }
  .single-content .single-sidebar .cost,
  .single-content .single-sidebar .format {
    border-bottom: 1px solid #C4C5B4;
    padding-bottom: 10px;
  }
  .single-content .related-stories .story-container {
    min-height: 50px;
  }
  .single-content .related-stories .story-content {
    text-align: center;
  }
  .single-content .single-sidebar .address p {
    line-height: normal;
  }
  .single-content .single-sidebar .directory-buttons ul {
    display: table;
    margin: 0 auto;
    width: 100%;
    max-width: 350px;
    padding: 5px 0;
  }
  .directory .directory-list .directory-item:last-child {
    border-bottom: 1px solid #C4C5B4 !important;
  }
  .directory .directory-list .directory-item {
    padding-left: 45px !important;
  }
  .single-content .single-sidebar .directory-buttons ul li {
    display: table-cell;
    text-align: center;
  }
  .single-content .single-sidebar .directory-buttons ul li a {
    font-size: 14px;
  }
}