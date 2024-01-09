sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (
    Controller,
    UIComponent
) {
    "use strict";

    return Controller.extend("sap.demo.appview.appviewcatalog.controller.Detail", {

        onInit: function () {
            let oRouter = UIComponent.getRouterFor(this);
            //pasamos el nombre de la ruta y cuando la encuentra ejecuta la funcion, this es para pasarle el contexto del onInit
            oRouter.getRoute("ViewDetail").attachMatched(this._onRouteMatched, this)


        },

        _onRouteMatched: function (oEvent) {
            let oArgs, oView;

            oArgs = oEvent.getParameter("arguments");
            oView = this.getView();

            //enlaza un item a la vista
            oView.bindElement({
                path: `mProduct>/ProductCollection/${oArgs.productId}`,
                events: {
                    change: this._onBindingChange.bind(this)
                }
            })
        },
        _onBindingChange: function (oEvent) {
            let oRouter = UIComponent.getRouterFor(this);
            //obtenemos el contexto e informacion enlazada mediante el objeto que sera el item
            if(!oEvent.getSource().getBoundContext().getObject()){
                oRouter.getTargets().display("TargetNotFound")
            }

        }
    });
});