# Enhanced Selection (Forked)

The Enhanced Selection Bundle allows you to select features in enhanced ways. There are these five special types of selection:
- Area Selection
- Freehand Polygon
- Travel Time
- Distance
- Existing Graphic

### Sample App ###
http://www.mapapps.de/mapapps/resources/apps/downloads_enhancedselection/index.html

### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`

Installation Guide
------------------
####Configurable Components:

#####DistanceCircleController:
```
"DistanceCircleController": {
  "widgetEnabled": true,
  "distance": {
    "minimum": 0,
    "maximum": 1000,
    "defaultStart": 0,
    "defaultEnd": 500,
    "interval": 50,
    "unit": "KILOMETERS"
  }
}
```
#####DriveTimeController
```
"DriveTimeController": {
  "widgetEnabled": true,
  "geoprocessorUrl": "http://logistics.arcgis.com/arcgis/rest/services/World/ServiceAreas/GPServer/GenerateServiceAreas",
  "drivetime": {
    "minimum": 0,
    "maximum": 30,
    "interval": 1
  }
}
```
#####SelectFeatureFromLayerController:
Define selectable stores
```
"SelectFeatureFromLayerController": {
  "widgetEnabled": true,
  "scale": 500000,
  "storeIds": [
    "%STORE_ID1%",
    "%STORE_ID2%",
    ...
  ]
}
```
#####FreehandPolygonController
```
"FreehandPolygonController": {
  "widgetEnabled": true
}
```
#####ExistingGraphicController
```
"ExistingGraphicController": {
  "widgetEnabled": true
},
```
#####SrWidgetFactory:
Define selectable stores
```
"SrWidgetFactory": {
  "storeIds": [
    "%STORE_ID1%",
    "%STORE_ID2%",
    ...
  ]
}
```
#####BaseWidgetController:
Basic Settings
```
"BaseWidgetController": {
  "clearGraphics": true
}
```
#####BaseWidget:
Basic Settings
```
"BaseWidget": {
  "enableContains": true
}
```

You can activate or deactivate all widgets by setting "widgetEnabled" to true or false.

To change the order of selection types you can change the Service-Ranking:

```
"SelectFeatureFromLayerWidget": {
  "Service-Ranking": -1
},
"FreehandPolygonWidget": {
  "Service-Ranking": -2
},
"ExistingGraphicWidget": {
  "Service-Ranking": -3
},
"DistanceCircleWidget": {
  "Service-Ranking": -4
},
"DriveTimeWidget": {
  "Service-Ranking": -5
}
```
