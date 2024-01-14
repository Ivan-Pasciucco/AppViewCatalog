sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
], function(
    Controller,
	UIComponent,
	History
) {
    'use strict';

    return Controller.extend("sap.demo.appview.appviewcatalog.controller.Base.Controller", {

        getRouter: function(){
            return UIComponent.getRouterFor(this);
        },
        onNavTo: function(viewRoute, param = null){
            this.getRouter().navTo(viewRoute, param)
        },
        onNavBack: function(){
            let  oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if(sPreviousHash !== undefined){
                window.history.go(-1);
            }else {
                this.getRouter().navTo("RouteMain");
            }

        },
        getById:function(sId){
            return this.getView().byId(sId);
        }
    });

});