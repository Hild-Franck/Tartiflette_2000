/**
 * Created by Hild Franck on 12/06/2015.
 */


/**
 * Objet qui contient les méthode de debug
 * @constructor
 */
function Debug(){
    this.ul = document.getElementById("debug");
    this.monitoring = [];
    this.occ = [];
    this.ind = 0;
    this.tests = null;
    if(this.ul == null) {
        this.ul = document.createElement("ul");
        document.body.appendChild(this.ul);
        this.ul.id = "debug";
    }

    /**
     * Permet d'afficher le résultat des test et du monitoring
     */
    this.show = function(){
        if(this.monitoring.length != 0) {
            var moniUl = this.ul.appendChild(document.createElement("li"));
            moniUl.className ="monitoring";
            moniUl.appendChild(document.createTextNode("Monitoring"));
            var moniLi = moniUl.appendChild(document.createElement("ul"));
            for (var i = 0; i < this.monitoring.length; i++) {
                moniLi.appendChild(this.monitoring[i]);
            }
        }
    };

    /**
     * Permet de surveiller la valeur d'une variable
     * @param desc La description de la variable
     * @param variable La variable à surveiller
     */
    this.monitor = function(desc, variable){
        var nwLi = document.createElement("li");
        nwLi.appendChild(document.createTextNode(desc + variable));
        this.monitoring.push(nwLi);

    };

    /**
     * Permet de supprimer les childNodes de la liste pour pouvoir les générer plus tard
     */
    this.clear = function(){
        for(var i = 0; i < this.ul.childNodes.length; i++){
            this.ul.childNodes[i].remove();
        }
        this.monitoring = [];
        this.ind = 0;
    };

    /**
     * Permet d'ajouter une assertion à la liste des valeurs/tests à afficher
     * @param value L'expression booléenne à tester
     * @param desc La description du test
     */
    this.addAssert = function(value, desc){
        this.li.push(this.assert(value, desc));
    };

    /**
     * Permet d'ajouter des tests liée à la liste des valeurs/tests à afficher
     * @param desc La description du groupe de tests à effecuer
     * @param fn Les tests à effectuer sous le même groupe
     */
    this.addTest = function(desc, fn){
        this.tests = document.createElement("ul");
        var nwLi = document.createElement("li");
        nwLi.appendChild(document.createTextNode(desc));
        nwLi.className = "pass";
        nwLi.appendChild(this.tests);
        fn();
        this.li.push(nwLi);
    };


    /**
     * Permet de créer une assertion
     * @param value L'expression booléenne à tester
     * @param desc La description du test
     * @returns {HTMLElement} Retourne l'assertion crée
     */
    this.assert = function(value, desc) {
        var nwLi = document.createElement("li");
        nwLi.className = value ? "pass" : "fail";
        nwLi.appendChild(document.createTextNode(desc));
        return nwLi;
    };

    /**
     * Permet de créer un test faisant parti d'un groupe
     * @param value L'expression booléenne à tester
     * @param desc La description du test
     */
    this.test = function(value, desc){
        var nwLi = this.assert(value, desc);
        this.tests.appendChild(nwLi);
        if(!value)
            this.tests.parentNode.className = "fail";

    };
    this.occurrence = function(value, desc){
        if(this.occ[this.ind] === undefined && value){
            this.occ[this.ind] = 1;
        }
        else if(value) {
            this.occ[this.ind] += 1;
        }
        var nwLi = document.createElement("li");
        nwLi.appendChild(document.createTextNode(desc + this.occ[this.ind]));
        this.li.push(nwLi);
        this.ind += 1;
    }
}