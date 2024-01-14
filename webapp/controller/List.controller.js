sap.ui.define([
    "./Base.Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, Filter, FilterOperator, MessageBox) {
        "use strict";

        return Controller.extend("sap.demo.appview.appviewcatalog.controller.List", {
            onInit: function () {
                console.log("Evento del List controller")
                // let oProductsModel = new  JSONModel(aItems);
                // this.getView().setModel(oProductsModel, "Products");

            },

            onPressProduct: function (oEvent) {
                //oEvent.getSource().getSelectedItem().oBindingContexts.mProduct.getObject()
                let oItem = oEvent.getSource().getSelectedItem().getBindingContext("mProduct").getObject();
                // MessageToast.show(oItem.Name)
                //obtenemos la data del oItem seleccionado
                let idxProduct = this.getView().getModel("mProduct").getData().ProductCollection.indexOf(oItem);

                this.onNavTo("ViewDetail", {
                    productId: idxProduct

                })
            },

            onSearch: function (oEvent) {

                let aFilters = [];
                let sQuery = oEvent.getSource().getValue();

                if (sQuery && sQuery.length > 0) {
                    // let oFilter = new Filter({
                    //     path: "Name",
                    //     operator: FilterOperator.Contains,
                    //     value1: sQuery
                    //   });
                    let oFilter = new Filter("Name", FilterOperator.Contains, sQuery)
                    aFilters.push(oFilter)
                }
                let oList = this.byId("listProducts");
                let oBinding = oList.getBinding("items")
                oBinding.filter(aFilters);

            },
            onOpenDialog: function () {
                this.fDialog ??= this.loadFragment({
                    name: "sap.demo.appview.appviewcatalog.view.fragments.DialogForm"
                });
                this.fDialog
                    .then((oDialog) => oDialog.open());
            },
            getValues: function () {
                let productId = this.getById("txtProductId").getValue();
                let mainCategory = this.getById("cboMainCategory").getValue();
                let category = this.getById("cboCategory").getValue();
                let name = this.getById("txtName").getValue();
                let description = this.getById("txtDescription").getValue();
                let supplier = this.getById("txtSupplier").getValue();
                let weightMeasure = this.getById("txtWeightMeasure").getValue();
                let weightUnit =
                    this.getById("rbgWeightUnit").getSelectedIndex() == 0 ? "KG" : "LB";
                let dateOfSale = this.getById("dtSale").getValue();
                let status = this.getById("swStatus").getState()
                    ? "Available"
                    : "Not Available";
                let quantity = this.getById("txtQuantity").getValue();
                let currencyCode =
                    this.getById("rbgCurrency").getSelectedIndex() == 0 ? "EUR" : "USD";
                let price = this.getById("txtPrice").getValue();

                let newProduct = {
                    ProductId: productId,
                    Category: category,
                    MainCategory: mainCategory,
                    TaxTarifCode: "1",
                    SupplierName: supplier,
                    WeightMeasure: weightMeasure,
                    WeightUnit: weightUnit,
                    Description: description,
                    Name: name,
                    DateOfSale: dateOfSale,
                    ProductPicUrl:
                        "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1254.jpg",
                    Status: status,
                    Quantity: quantity,
                    UoM: "PC",
                    CurrencyCode: currencyCode,
                    Price: price,
                    Width: 37,
                    Depth: 12,
                    Height: 36,
                    DimUnit: "cm",
                };
                return newProduct;
            },
            clearInputs: function () {
                this.getById("txtProductId").setValue("");
                this.getById("cboMainCategory").setValue("");
                this.getById("cboCategory").setValue("");
                this.getById("txtName").setValue("");
                this.getById("txtDescription").setValue("");
                this.getById("txtSupplier").setValue("");
                this.getById("txtWeightMeasure").setValue("");
                this.getById("rbgWeightUnit").setSelectedIndex(0);
                this.getById("dtSale").setValue();
                this.getById("swStatus").setState(true);
                this.getById("txtQuantity").setValue("");
                this.getById("rbgCurrency").setSelectedIndex(0);
                this.getById("txtPrice").setValue("");
            },
            clearNavBack: function () {
                this.clearInputs();
                this.onNavTo("RouteMain");
            },
            changeValueState: function (oEvent) {
                let oValue = oEvent.getSource().getValue();
                if (oValue) {
                    oEvent.getSource().setValueState("None");
                }
            },
            onSubmit: function () {
                const _this = this;

                //obtiene la cantidad de campos vacios, si hay detiene la ejecucion
                let nValidatedFields = this.validateFields();
                if (nValidatedFields) {
                    return;
                }
                let newProduct = this.getValues();

                let aProductCollection = this.getView()
                    .getModel("mProduct")
                    .getData().ProductCollection;
                aProductCollection.unshift(newProduct);

                this.getView().getModel("mProduct").refresh();

                MessageBox.success("Product Added", {
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function () {
                        _this.clearNavBack();
                    },
                });
            },

            validateFields: function () {
                var aForms = ["frmGeneral", "frmWeight", "frmDetails"];
                var aValidated = [];

                //recorre llos forms y obtiene sus elementos
                aForms.forEach((oForm) => {
                    let aFormElements = this.getView()
                        .byId(oForm)
                        .getFormContainers()[0]
                        .getFormElements();

                    //recorre los elementos y obtiene sus campos ingresados
                    aFormElements.forEach((aFElements) => {
                        let aFields = aFElements.getFields();

                        //recorre los campos y obtiene su id y su estado
                        aFields.forEach((aField) => {
                            if (aField.getValue) {
                                let oFieldId = aField.getId().split("List--")[1];
                                let validate = aField.getValue() !== "" ? true : false;
                                console.log("ID " + oFieldId + "- Estado " + validate);

                                //setea con error los campos vacios
                                if (!validate) {
                                    aValidated.push({ idField: oFieldId, state: validate });
                                    this.getById(oFieldId).setValueState("Error");
                                    //ese campo esta vacio
                                }
                            }
                        });
                    });
                });
                //longitud mayor a 0 es un campo vacio
                return aValidated.length;
            },
            onReject: function () {
                this.clearInputs();
                this.byId("frgDialogForm").close();
            },

        })
    });
