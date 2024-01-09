sap.ui.define([
    "./Base.Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("sap.demo.appview.appviewcatalog.controller.Main", {
            onInit: function () {

            },
            onPressTile: function(oEvent){
            let viewRoute = oEvent.getSource().getBindingContext("mTile").getObject().view;
            
            this.onNavTo(viewRoute, null)
            },

        });
    });
