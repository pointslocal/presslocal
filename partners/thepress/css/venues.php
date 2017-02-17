<?php

$sortField = 'ev.event_venue_name';
$sortDir = 'ASC';

$pushFields = [];
$pushJoins = '';

$where = new DBWhere();
$where->push('search',"event_venue_name LIKE '%{%s}%'");
if(param('search_all') && (bool) param('search_all') === true) {
  $where->push('search',"event_venue_name LIKE '%{%s}%' OR event_venue_address LIKE '%{%s}%' OR event_venue_description LIKE '%{%s}%'");
}

if (isset($_CND->id) && $_CND->id) {
  $_CND->id = (int) $_CND->id;
  $where->push('id',"event_venue_id={$_CND->id}");
}
$guid = $DB->escape(param('guid'));
if ($guid) {
  $where->push('guid',"event_venue_rewrite='{%s}'");
}
if (param('approved')) {
  $app = (bool) param('approved');
  $where->push("ap","ev.event_venue_approved=1");
}

if (param('category')) {
  $ecid = (int) param('category');
  $where->push("c","ev.event_venue_category_id=$ecid OR event_venue_id IN (SELECT event_venue_id FROM event_venues_categories_venues WHERE event_venue_category_id=$ecid)");
}

if (param('near')) {
  $near = explode(',',param('near'));
  $thisLatitude = $DB->escape($near[0]);
  $thisLongitude = $DB->escape($near[1]);
    $pushFields[] = "((ACOS(SIN($thisLatitude * PI() / 180) * SIN(event_venue_latitude * PI() / 180) + COS($thisLatitude * PI() / 180) * COS(event_venue_latitude * PI() / 180) * COS(($thisLongitude - event_venue_longitude) * PI() / 180)) * 180 / PI()) * 60 * 1.1515) AS distance";
  $sortField = "distance";
  $sortDir = "ASC";
}

if (param('references') == 1) {
  $pushFields[] = "st.story_title";
  $pushFields[] = "st.story_text";
  $pushFields[] = "st.story_id";
  $pushFields[] = "st.story_rewrite as 'story_guid'";
  $pushJoins = "LEFT JOIN stories_connections stc ON stc.connection_id=ev.event_venue_id LEFT JOIN stories st ON st.story_id=stc.story_id";
}

if (param('latitude') && param('longitude') && param('radius')) {
  $lat = $DB->escape(param('latitude'));
  $lon = $DB->escape(param('longitude'));
  $rad = $DB->escape(param('radius'));

  $bounds = Geo::MBR($lat,$lon,$rad);

  $box = "GeomFromText( 'POLYGON(({$bounds->latitude->ceil} {$bounds->longitude->ceil}, {$bounds->latitude->ceil} {$bounds->longitude->floor}, {$bounds->latitude->floor} {$bounds->longitude->floor}, {$bounds->latitude->floor} {$bounds->longitude->ceil}, {$bounds->latitude->ceil} {$bounds->longitude->ceil}) )' )";
  $point = "POINT(ev.event_venue_latitude,ev.event_venue_longitude)";
  $where->push('loc',"ST_CONTAINS($box,$point)");

}


if (param('ids')) {
  $ids = explode(',',sanitize('ids'));
  $allIDs = [];
  foreach ($ids as $idd) {
    if ($idd) {
      $allIDs[] = $idd;
    }
  }

  $ids = implode(',',$allIDs);
  $where->push('vids',"event_venue_id IN ($ids)");
}

if (param('filters')) {
  $filters = param('filters');
  $filters = json_decode($filters);
  $fvals = [];
  foreach ($filters as $f) {
    foreach ($f as $fv) {
      $fvals[] = "(event_venues_custom_value LIKE '%".$DB->escape($fv)."%')";
    }
  }
  $filterTest = implode(' OR ',$fvals);
  if (count($fvals) > 0) {
    $filterTest = " WHERE " . $filterTest;
  }
  $where->push('filter', "event_venue_id IN (SELECT event_venue_id FROM event_venues_custom_values $filterTest)");
}


if (param('theater') && param('theater') == 1) {
  $where->push('th','ev.event_venue_theater=1');
}
$where->compile();

$pushFields = (count($pushFields) > 0 ? implode(',',$pushFields) . ', ' : '');
mysql_set_charset('utf8');
$venues = $DB->queryRaw("SELECT SQL_CALC_FOUND_ROWS {$pushFields} (select event_venue_image_id from event_venue_images WHERE event_venue_id=ev.event_venue_id LIMIT 1) as 'image_id', ev.event_venue_id as 'id', ev.event_venue_rewrite as 'guid', ev.event_venue_name as 'name', ev.event_venue_description as 'description', ev.event_venue_address as 'address', ev.event_venue_phone as 'phone', ev.event_venue_url as 'url', ev.event_venue_price as 'price', ev.event_venue_longitude as 'longitude', ev.event_venue_latitude as 'latitude', ev.event_venue_approved as 'approved' FROM event_venues ev LEFT JOIN event_venue_categories evc ON evc.event_venue_category_id = ev.event_venue_category_id {$pushJoins} {$where->sql} ORDER BY {$sortField} {$sortDir} LIMIT {$_REST->limit} OFFSET {$_REST->offset}"); 

if(param('debug') == 1) {
  echo "SELECT SQL_CALC_FOUND_ROWS {$pushFields} (select event_venue_image_id from event_venue_images WHERE event_venue_id=ev.event_venue_id LIMIT 1) as 'image_id', ev.event_venue_id as 'id', ev.event_venue_rewrite as 'guid', ev.event_venue_name as 'name', ev.event_venue_description as 'description', ev.event_venue_address as 'address', ev.event_venue_phone as 'phone', ev.event_venue_url as 'url', ev.event_venue_price as 'price', ev.event_venue_longitude as 'longitude', ev.event_venue_latitude as 'latitude', ev.event_venue_approved as 'approved' FROM event_venues ev LEFT JOIN event_venue_categories evc ON evc.event_venue_category_id = ev.event_venue_category_id {$pushJoins} {$where->sql} ORDER BY {$sortField} {$sortDir} LIMIT {$_REST->limit} OFFSET {$_REST->offset}"; exit;
}
// $venues = array_map('htmlentities',$venues);
$results = $_REST->getResults->__invoke();
for($i=0;$i<count($venues);$i++) {
    $venues[$i]['approved'] = ( $venues[$i]['approved'] == 1 ? true : false);
    $venues[$i]['title'] = $venues[$i]['name'];
}

$_DATA = array('items'=>(count($venues) > 0 ? $venues : array()), 'pages'=>ceil($results/$_REST->limit)  );