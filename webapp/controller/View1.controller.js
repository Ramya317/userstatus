sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/SegmentedButtonItem",
    "sap/m/Menu",
    "sap/m/MenuItem",
    "sap/ui/core/ResizeHandler",
    "sap/ui/model/json/JSONModel"
], function (Controller, SegmentedButtonItem, Menu, MenuItem, ResizeHandler, JSONModel) {
    "use strict";

    var TABS = [
        { key: "overview",    text: "Overview" },
        { key: "monitoring",  text: "Control Monitoring" },
        { key: "risk",        text: "Risk Assessment" },
        { key: "security",    text: "SAP Security & SoD" },
        { key: "audit",       text: "Audit Management" },
        { key: "compliance",  text: "Compliance" },
        { key: "licenses",    text: "SAP Licenses" },
        { key: "remediation", text: "Remediation" },
        { key: "inbox",       text: "My Inbox" },
        { key: "reports",     text: "Reports" }
    ];

    var TAB_PADDING = 48;
    var MORE_WIDTH  = 90;

    function row(no, domain, app, pass, fail, nt, un, comp, target, status) {
        return {
            no: no, domain: domain, applicable: app, passed: pass, failed: fail,
            notTested: nt, unavailable: un, compliance: comp, target: target, status: status
        };
    }

    return Controller.extend("project1.controller.View1", {

        onInit: function () {

            // DATE RANGE
            var oRange = this.byId("dateRange");
            oRange.setDateValue(new Date(2026, 5, 1));
            oRange.setSecondDateValue(new Date(2026, 10, 30));

            this.byId("monitoringContent").setVisible(false);
            this.byId("riskAssessmentContent").setVisible(false);

            // CONTROL DOMAIN SCORECARD
            this.getView().setModel(new JSONModel({
                items: [
                    row("1",  "SAP Security & Access",          48, 40, 8, 0, 0, "83%", "≥ 95%", "Below Target"),
                    row("2",  "Change Management",             36, 30, 6, 0, 0, "83%", "≥ 90%", "Below Target"),
                    row("3",  "IT General Controls (ITGC)",    40, 34, 6, 0, 0, "85%", "≥ 90%", "Below Target"),
                    row("4",  "Application Controls",          52, 46, 6, 0, 0, "88%", "≥ 90%", "Below Target"),
                    row("5",  "Data & Interface Controls",     28, 26, 2, 0, 0, "93%", "≥ 90%", "On Track"),
                    row("6",  "Access Certification",          24, 20, 1, 2, 1, "83%", "≥ 90%", "Below Target"),
                    row("7",  "Operations & Monitoring",       20, 17, 1, 1, 1, "85%", "≥ 90%", "Below Target"),
                    row("8",  "Configuration & Master Data",   18, 15, 0, 2, 1, "83%", "≥ 90%", "Below Target"),
                    row("9",  "Financial Process Controls",    22, 18, 0, 3, 1, "82%", "≥ 90%", "Below Target"),
                    row("10", "Procurement & Vendor Controls", 16, 12, 0, 5, 1, "75%", "≥ 90%", "Below Target"),
                    row("11", "Compliance & Regulatory",       12, 11, 0, 1, 0, "92%", "≥ 90%", "On Track"),
                    row("",   "Total",                        316, 259, 30, 18, 9, "82%", "≥ 90%", "")
                ]
            }), "scorecardModel");

            // MODULE COMPLIANCE
            this.getView().setModel(new JSONModel({
                items: [
                    { module: "FI/CO",          compliance: "84%", target: "≥ 95%", status: "Below Target" },
                    { module: "MM",             compliance: "78%", target: "≥ 90%", status: "Below Target" },
                    { module: "SD",             compliance: "86%", target: "≥ 90%", status: "Below Target" },
                    { module: "PP",             compliance: "81%", target: "≥ 90%", status: "Below Target" },
                    { module: "HCM",            compliance: "76%", target: "≥ 90%", status: "Below Target" },
                    { module: "Basis/Security", compliance: "88%", target: "≥ 95%", status: "Below Target" }
                ]
            }), "moduleModel");

            // MONITORING & DATA HEALTH
            this.getView().setModel(new JSONModel({
                items: [
                    { component: "Security Audit Logs",     status: "Warning",  state: "Warning", affectedControls: "6 Controls", lastRun: "15 Nov, 08:10", recommendation: "Stabilize log ingestion →" },
                    { component: "SoD Rule Sync",           status: "Healthy",  state: "Success", affectedControls: "–",          lastRun: "15 Nov, 09:00", recommendation: "No action required" },
                    { component: "Background Control Jobs", status: "Delayed",  state: "Warning", affectedControls: "8 Controls", lastRun: "15 Nov, 06:30", recommendation: "Restart & fix schedule →" },
                    { component: "Identity Connector",      status: "Optional", state: "None",    affectedControls: "–",          lastRun: "–",             recommendation: "Not configured (VI scope)" },
                    { component: "Evidence Collector",      status: "Healthy",  state: "Success", affectedControls: "–",          lastRun: "15 Nov, 09:20", recommendation: "Running normally" }
                ]
            }), "healthModel");

            // CONTROL EFFECTIVENESS TREND
            this.getView().setModel(new JSONModel({
                items: [
                    { month: "Jun", actual: 75, target: 90 },
                    { month: "Jul", actual: 76, target: 90 },
                    { month: "Aug", actual: 77, target: 90 },
                    { month: "Sep", actual: 77, target: 90 },
                    { month: "Oct", actual: 78, target: 90 },
                    { month: "Nov", actual: 78, target: 90 }
                ]
            }), "trendModel");

            // ASSURANCE CONFIDENCE OVERVIEW
            this.getView().setModel(new JSONModel({
                items: [
                    { status: "Validated",       count: 259 },
                    { status: "Pending Review",  count: 18 },
                    { status: "Stale (Overdue)", count: 12 },
                    { status: "Unavailable",     count: 9 },
                    { status: "Not Applicable",  count: 18 }
                ]
            }), "assuranceModel");

            // TOP CONTROL EXCEPTIONS
            this.getView().setModel(new JSONModel({
                items: [
                    { no: "1", id: "CR-001",  control: "Revoke SAP_ALL from non-emergency users",                 module: "Security", owner: "SAP Security", due: "27 Oct 2026", priority: "Critical", state: "Error" },
                    { no: "2", id: "CR-003",  control: "Disable terminated user and clean up dormant users",      module: "Security", owner: "HR / SAP Sec", due: "27 Oct 2026", priority: "Critical", state: "Error" },
                    { no: "3", id: "FND-001", control: "Close unapproved production changes and attach evidence", module: "Change",   owner: "Change Mgmt",  due: "28 Oct 2026", priority: "High",     state: "Warning" }
                ]
            }), "excModel");

            // AI RECOMMENDATIONS
            this.getView().setModel(new JSONModel({
                items: [
                    { no: "1", text: "Fix module compliance gaps (FI/CO, SD, PP, Basis)",                  owner: "IT / Module Leads", due: "30 Nov 2026", impact: "High",   state: "Error" },
                    { no: "2", text: "Close 30 failed controls (8 Security, 6 Change, 6 ITGC, 10 Others)", owner: "GRC Team",          due: "15 Dec 2026", impact: "High",   state: "Error" },
                    { no: "3", text: "Resolve monitoring gaps – Security Logs & 8 jobs",                   owner: "IT Operations",     due: "22 Nov 2026", impact: "Medium", state: "Warning" },
                    { no: "4", text: "Configure Identity Connector (or mark Not Applicable – VI)",         owner: "IT / GRC",          due: "15 Dec 2026", impact: "Medium", state: "Warning" },
                    { no: "5", text: "Improve control effectiveness from 78% to ≥ 90% (+12 pp)",           owner: "QRC & IT",          due: "Q1 2027",     impact: "Medium", state: "Warning" }
                ]
            }), "aiModel");

            this._setupCharts();

            // TAB SETTINGS
            this._sSelected  = "overview";
            this._iCount     = TABS.length;
            this._sSignature = "";

            this.getView().addEventDelegate({
                onAfterRendering: this._onViewRendered.bind(this)
            });
        },

        onExit: function () {
            if (this._sResizeId) {
                ResizeHandler.deregister(this._sResizeId);
                this._sResizeId = null;
            }
            if (this._oMenu) {
                this._oMenu.destroy();
                this._oMenu = null;
            }
        },

        onFilterSearch: function () {
            // future filter logic
        },

        // ---------- CHARTS ----------
        _setupCharts: function () {

            // Trend : Actual (blue) vs Target (green), Y axis 70 - 100
            this.byId("trendChart").setVizProperties({
                title: { visible: false },
                legend: { visible: true },
                legendGroup: { layout: { position: "bottom" } },
                plotArea: {
                    colorPalette: ["#0a6ed1", "#2e7d32"],
                    dataLabel: { visible: true, formatString: "#,##0" }
                },
                valueAxis: {
                    title: { visible: false },
                    scale: { fixedRange: true, minValue: 70, maxValue: 100 }
                },
                categoryAxis: { title: { visible: false } }
            });

            // Assurance donut : colours follow data order (legend names stay correct)
            this.byId("assuranceChart").setVizProperties({
                title: { visible: false },
                legend: { visible: true },
                legendGroup: { layout: { position: "right" } },
                plotArea: {
                    colorPalette: ["#2e7d32", "#ef6c00", "#f9a825", "#8e24aa", "#9aa5b1"],
                    dataLabel: { visible: true, type: "value" }
                }
            });
        },

        // ---------- TABS ----------
        _onViewRendered: function () {
            if (this._sResizeId) { return; }
            var oHost = this.byId("_IDGenVBox");
            this._sResizeId = ResizeHandler.register(oHost, function () {
                this._sSignature = "";
                this._layoutTabs();
            }.bind(this));
            this._layoutTabs();
        },

        _getTab: function (sKey) {
            return TABS.filter(function (t) { return t.key === sKey; })[0];
        },

        _measure: function (sText) {
            if (!this._oCtx) {
                this._oCtx = document.createElement("canvas").getContext("2d");
            }
            this._oCtx.font = "bold 14px '72', Arial, sans-serif";
            return Math.ceil(this._oCtx.measureText(sText).width) + TAB_PADDING;
        },

        _getVisibleKeys: function () {
            var aKeys  = TABS.map(function (t) { return t.key; });
            var iCount = this._iCount;
            var iSel   = aKeys.indexOf(this._sSelected);

            if (iCount >= aKeys.length || iSel < iCount) {
                return aKeys.slice(0, iCount);
            }
            return aKeys.slice(0, iCount - 1).concat(this._sSelected);
        },

        _layoutTabs: function () {
            var oHost = this.byId("_IDGenVBox").getDomRef();
            if (!oHost) { return; }

            var iAvail  = oHost.clientWidth;
            var aWidths = TABS.map(function (t) { return this._measure(t.text); }.bind(this));
            var iTotal  = aWidths.reduce(function (a, b) { return a + b; }, 0);
            var iCount  = TABS.length;

            if (iTotal > iAvail) {
                iCount = 0;
                var iSum = 0;
                for (var i = 0; i < aWidths.length; i++) {
                    if (iSum + aWidths[i] > iAvail - MORE_WIDTH) { break; }
                    iSum += aWidths[i];
                    iCount++;
                }
                iCount = Math.max(iCount, 2);
            }

            this._iCount = iCount;
            this._iAvail = iAvail;
            this._buildTabs();
        },

        _buildTabs: function () {
            var aVisible   = this._getVisibleKeys();
            var bMore      = aVisible.length < TABS.length;
            var sSignature = aVisible.join("|") + "#" + this._sSelected + "#" + this._iAvail;

            if (sSignature === this._sSignature) { return; }
            this._sSignature = sSignature;

            var iAvailForTabs = this._iAvail - (bMore ? MORE_WIDTH : 0);
            var aNatural = aVisible.map(function (k) {
                return this._measure(this._getTab(k).text);
            }.bind(this));
            var iNaturalSum = aNatural.reduce(function (a, b) { return a + b; }, 0);
            var fScale = iNaturalSum > 0 ? iAvailForTabs / iNaturalSum : 1;

            var oSeg = this.byId("mainNavigation");
            oSeg.destroyItems();

            aVisible.forEach(function (sKey, i) {
                var oTab = this._getTab(sKey);
                oSeg.addItem(new SegmentedButtonItem({
                    key: oTab.key,
                    text: oTab.text,
                    tooltip: oTab.text,
                    width: Math.floor(aNatural[i] * fScale) + "px"
                }));
            }.bind(this));

            oSeg.setSelectedKey(this._sSelected);
            this.byId("moreButton").setVisible(bMore);
        },

        onTabChange: function (oEvent) {
            this._selectTab(oEvent.getParameter("item").getKey());
        },
_selectTab: function (sKey) {

    this._sSelected = sKey;

    this.byId("monitoringContent").setVisible(
        sKey === "monitoring"
    );

    this.byId("riskAssessmentContent").setVisible(
        sKey === "risk"
    );
},

        onMorePress: function (oEvent) {
            var oButton  = oEvent.getSource();
            var aVisible = this._getVisibleKeys();

            if (this._oMenu) { this._oMenu.destroy(); }
            this._oMenu = new Menu();

            TABS.filter(function (t) { return aVisible.indexOf(t.key) < 0; })
                .forEach(function (oTab) {
                    this._oMenu.addItem(new MenuItem({
                        text: oTab.text,
                        press: this._onMoreItem.bind(this, oTab.key)
                    }));
                }.bind(this));

            this._oMenu.openBy(oButton);
        },

        _onMoreItem: function (sKey) {
            this._selectTab(sKey);
            this._sSignature = "";
            this._layoutTabs();
        }
    });
});
