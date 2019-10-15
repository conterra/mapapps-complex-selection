/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    "dojo/_base/declare",
    "dojo/i18n!./nls/bundle",
    "ct/_Connect",
    "ct/async"
], function (declare, i18n, _Connect, ct_async) {
    return declare([_Connect], {
        geometryType: "FreehandPolygon",
        componentName: "FreehandPolygonWidget",
        activate: function (componentContext) {
            var properties = this._properties;
            if (!properties.widgetEnabled) {
                var componentName = this.componentName;
                ct_async(function () {
                    componentContext.disableComponent(componentName);
                }, 0);
                return;
            }
            this._initWidget();
        },
        deactivate: function () {
            this.disconnect();
            this._inputGeometry = null;
        },
        modified: function (componentContext) {
            var properties = this._properties;
            var componentName = this.componentName;
            if (properties.widgetEnabled) {
                componentContext.enableComponent(componentName);
                this._initWidget();
            } else {
                componentContext.disableComponent(componentName);
            }
        },
        _initWidget: function () {
            var freehandPolygonWidget = this.freehandPolygonWidget;
            this.disconnect();
            this.connect(freehandPolygonWidget, "onShow", this.onSelected);
            this.connect(freehandPolygonWidget, "reenable", this.draw);
            this.connect(freehandPolygonWidget, "search", this.search);
        },
        geometryDrawn: function (evt) {
            var geom = evt.getProperty("geometry");
            if (geom === this._inputGeometry){
                return;
            }
            this._inputGeometry = evt.getProperty("geometry");
            var freehandPolygonWidget = this.freehandPolygonWidget;
            try {
                if (!freehandPolygonWidget.getParent().get("selected")) {
                    return;
                }
                this._mapState.setExtent(this._inputGeometry.getExtent());
                this._eventService.postEvent("ct/dn_enhancedselection/SEARCH");
            } catch (e) {
                // do nothing
            }
        },
        draw: function (geometryType) {
            this.drawGeometryHandler.allowUserToDrawGeometry(geometryType || this.geometryType);
        },
        setFreehandPolygonWidget: function (widget) {
            this.freehandPolygonWidget = widget;
            this._initWidget();
        },
        unsetFreehandPolygonWidget: function () {
            this.disconnect();
        },
        onSelected: function () {
            this._inputGeometry = null;
            this.drawGeometryHandler.clearGraphics();
            var geometryType = this.geometryType;
            this.draw(geometryType);
        },
        search: function (store, spatialRel) {
            var geometry = this._inputGeometry;
            if (!geometry) {
                return;
            }
            this.queryController.queryStore(geometry, store, spatialRel);
        }
    });
});