define(['handlebars'], function (Handlebars) {
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sellItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    return " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "<link rel=\"stylesheet\" href=\"assets/styles/sellItem.css\">\n<div class=\"container\">\n  <div class=\"sellitem-form\">\n    <div class=\"row\">\n      <div class=\"col-md-1 col-xs-1\"></div>\n      <div class=\"center-box col-md-10 col-sm-10\">\n        <div class=\"panel panel-info upload-image-panel\">\n          <div class=\"panel-heading\">\n            <div class=\"panel-title\"> Sell item </div>\n          </div>\n          <div class=\"panel-body\">\n            <!-- <upload images> -->\n            <div class=\"panel panel-info\">\n              <div class=\"panel-heading\">\n                <span class=\"panel-title\"> Upload item image(s) </span>\n              </div>\n              <div class=\"panel-body\">\n                <form class=\"item-image-form form-horizontal\" role=\"form\">\n                  <div class=\"controls\">\n                    <input type=\"file\" id=\"itemimages\" name=\"itemimages[]\" class=\"file file-loading\" multiple>\n                    <div id=\"errorBlock\" class=\"help-block\"></div>\n                  </div>        \n                </form>\n              </div>\n            </div>\n            <!-- </upload images> -->\n            <form class=\"form-horizontal\" role=\"form\">\n              <div class=\"panel panel-info item-name-detail-panel\">\n                <div class=\"panel-heading\">\n                  <div class=\"panel-title\">Item name and description</div>\n                </div>\n                <div class=\"panel-body\">\n                  <!-- item name -->\n                  <div class=\"form-group\">\n                    <label for=\"itemName\" class=\"col-md-2 control-label\"> Item Name: </label>\n                    <div class=\"col-md-6\">\n                      <input type=\"text\" class=\"form-control\" name=\"itemName\" placeholder=\"Item Name\">\n                    </div>\n                    <div class=\"col-md-4\"></div>\n                  </div>\n                  <!-- item description -->\n                  <div class=\"form-group\">\n                    <label for=\"description\" class=\"col-md-2 control-label\"> Description: </label>\n                    <div class=\"col-md-6\">\n                      <textarea class=\"form-control\" name=\"description\" noresize placeholder=\"Write description of item\"></textarea>\n                    </div>\n                    <div class=\"col-md-4\"></div>\n                  </div>\n                </div>\n              </div> <!-- </item name and description panel> -->\n              <div class=\"panel panel-info category-panel\">\n                <div class=\"panel-heading\">\n                  <div class=\"panel-title\">Item information</div>\n                </div>\n                <div class=\"panel-body\">\n                  <div class=\"form-group\">\n                    <label for=\"itemCategory\" class=\"col-md-2 control-label\"> Category: </label>\n                    <div class=\"col-md-6\">\n                      <div class=\"input-group\">\n                        <input type=\"text\" class=\"form-control\" name=\"itemCategory\" placeholder=\"Type to search Category\">\n                        <div class=\"input-group-btn\">\n                          <button type=\"button\" id=\"searchCategory\" data-target=\".searched-category-dropdown\" data-toggle=\"dropdown\" aria-haspopup=\"true\" value=\"\" class=\"btn btn-success dropdown-toggle\">\n                            <i class=\"glyphicon glyphicon-search\"></i>\n                          </button>\n                        </div>\n                        <div class=\"searched-category-dropdown\">\n                          <!-- Items will be added dynamically -->\n                          <ul  class=\"dropdown-menu\">\n                          </ul>\n                        </div>\n                      </div>\n                    </div>\n                  </div> <!-- /category -->\n                  <div class=\"form-group\">\n                    <label for=\"itemStatus\" class=\"col-md-2 control-label\">Item status:</label>\n                    <div class=\"col-md-6\">\n                      <select name=\"itemStatus\" id=\"itemStatus\" class=\"form-control\">\n                        <option value=\"new\">New (unused)</option>\n                        <option value=\"almostunused\">Close to unused</option>\n                        <option value=\"noscratch\">No noticeable scracth or dirt</option>\n                        <option value=\"slightscratch\">Slightly scratched and dirty</option>\n                        <option value=\"scratches\">Scractches and dirty</option>\n                        <option value=\"bad\">Overall conidtion is bad</option>\n                      </select>\n                    </div>\n                  </div> <!-- /item status -->\n                </div> <!-- /panel body -->\n              </div> <!-- category-panel -->\n              <div class=\"panel panel-info delivery-info-panel\">\n                <div class=\"panel-heading\">\n                  <div class=\"panel-title\">\n                    Delivery information\n                  </div>\n                </div>\n                <div class=\"panel-body\">\n                  <div class=\"form-group\">\n                    <label for=\"feeBurden\" class=\"col-md-2 control-label\">Burden of shipping amount:</label>\n                    <div class=\"col-md-6\">\n                      <select name=\"feeBurden\" id=\"feeBurden\" class=\"form-control\">\n                        <option value=\"paidbysender\">Postage fee paid by you</option>\n                        <option value=\"cashondelivery\">Cash on delivery (Purchaser burden)</option>\n                        <option value=\"personaldelivery\">Personal delivery (no fee burden)</option>\n                      </select>\n                    </div>\n                  </div>\n                  <div class=\"form-group\">\n                    <label for=\"sourceState\" class=\"col-md-2 control-label\"> Shipment source state: </label>\n                    <div class=\"col-md-6\">\n                      <select name=\"sourceState\" id=\"sourceState\" class=\"form-control\">\n                        <option value=\"Gujarat\">Gujarat</option>\n                      </select>\n                    </div>\n                  </div>\n                  <div class=\"form-group\">\n                    <label for=\"shipDuration\" class=\"col-md-2 control-label\">Shipment duration: </label>\n                    <div class=\"col-md-6\">\n                      <select name=\"shipDuration\" id=\"shipDuration\" class=\"form-control\">\n                        <option value=\"2\">1~2 Days</option>\n                        <option value=\"3\">2~3 Days</option>\n                        <option value=\"7\">4~7 Days</option>\n                      </select>\n                    </div>\n                  </div>\n                </div> <!-- /panel-body -->\n              </div> <!-- /delivery-info-panel -->\n              <div class=\"panel panel-info pricing-info-panel\">\n                <div class=\"panel-heading\">\n                  <div class=\"panel-title\">Pricing information</div>\n                </div>\n                <div class=\"panel-body\">\n                  <div class=\"form-group\">\n                    <label for=\"sellingPrice\" class=\"col-md-2 control-label\"> Set selling price: </label>\n                    <div class=\"col-md-6\">\n                      <input type=\"number\" name=\"sellingPrice\" id=\"sellingPrice\" class=\"form-control\" placeholder=\"500 ~ 1000\">\n                      <div id=\"sellingPriceMask\"></div>\n                    </div>\n                  </div>\n                  <div class=\"form-group\">\n                    <label class=\"col-md-2 control-label\"> Sales commission: </label>\n                    <div class=\"col-md-6\">\n                      <label id=\"salesCommission\" class=\"form-control\"> "
    + alias3(((helper = (helper = helpers.salesCommission || (depth0 != null ? depth0.salesCommission : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"salesCommission","hash":{},"data":data}) : helper)))
    + " </label>\n                    </div>\n                  </div>\n                  <div class=\"form-group\">\n                    <label class=\"col-md-2 control-label\"> Sales profit: </label>\n                    <div class=\"col-md-6\">\n                      <label id=\"salesProfit\" class=\"form-control\"> "
    + alias3(((helper = (helper = helpers.salesProfit || (depth0 != null ? depth0.salesProfit : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"salesProfit","hash":{},"data":data}) : helper)))
    + " </label>\n                    </div>\n                  </div>\n                </div> <!-- /panel-body -->\n              </div>\n              <div class=\"col-md-12 controls\">\n                <button class=\"btn btn-primary\" id=\"addItem\" type=\"button\" value=\"\">\n                  <i class=\"fi-burst-sale\"></i>\n                  Sell this item!\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-1 col-xs-1\"></div>\n    </div>\n  </div>\n</div>\n"
    + ((stack1 = (helpers.loadModule || (depth0 && depth0.loadModule) || alias1).call(depth0,"sellItem",{"name":"loadModule","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
return templates;
});