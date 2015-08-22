/**
 * Created by Hild Franck on 8/16/2015.
 */

var debug ={
    ul: document.getElementById("debug"),
    monitoring: [],
    index: 0,
    data: {},
    panels: {
        "default": ["Panel", "panel-head-default", "panel-title-default", "panel-content-default"],
        "monitor": ["Monitoring", "panel-head-monitor", "panel-title-monitor", "panel-content-monitor"]
    },

    init: function(){
        if(this.ul == null) {
            this.ul = document.createElement("ul");
            document.body.appendChild(this.ul);
            this.ul.id = "debug";
        }
    },

    show: function(){
        if(this.monitoring.length != 0) {
            var monPan = this.createPanel("monitor");
            var moniLi = monPan.appendChild(document.createElement("ul"));
            for (var i = 0; i < this.monitoring.length; i++) {
                moniLi.appendChild(this.monitoring[i]);
            }
        }
    },

    clear: function(){
        for(var i = 0; i < this.ul.childNodes.length; i++){
            this.ul.childNodes[i].remove();
        }
        this.monitoring = [];
        this.ind = 0;
    },

    monitor: function(desc, variable) {
        var nwLi = document.createElement("li");
        nwLi.appendChild(document.createTextNode(desc + variable));
        this.monitoring.push(nwLi);
    },

    createPanel: function(type){
        var check = false;
        /*for(var key in this.panels)
        {
            if(this.panels[key]== type)
                check = true;
        }
        if(type === undefined || !check)
            type = "default";*/
        var panel = document.createElement("div");
        panel.className = "panel";
        this.ul.appendChild(panel);
        var panelHead = document.createElement("div");
        panelHead.className = "panel-head " + this.panels[type][1];
        panel.appendChild(panelHead);
        var panelHeadTitle = document.createElement("h3");
        panelHeadTitle.className = "panel-title " + this.panels[type][2];
        panelHeadTitle.appendChild(document.createTextNode(this.panels[type][0]));
        panelHead.appendChild(panelHeadTitle);
        var panelContent = document.createElement("div");
        panelContent.className = "panel-content " + this.panels[type][3];
        panel.appendChild(panelContent);
        return panelContent;
    }
};

debug.init();