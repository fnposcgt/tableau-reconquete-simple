var STRUCTS = [ /* copiez TOUT le tableau STRUCTS depuis votre app.html */ ];
var RS = { /* copiez l'objet RS */ };
var GS = { /* copiez l'objet GS */ };
var UD_DATA = [ /* ... */ ];
var UD_MAP = { /* ... */ };
var CP_UL_MAP = { /* ... */ };
var UL_INDEX = { /* ... */ };
var REGION_UD_MAP = { /* ... */ };
var ADHERENTS = { /* ... */ };
var REF_MAP = { /* ... */ };
var CONTACTS_BY_REGION = { /* ... */ };
var RESPONSABLES_ANCIENNES_REGIONS = { /* ... */ };
var DEPT_TO_OLD_REGION = { /* ... */ };
var UK = ["cgt","cfdt","fo","cftc","cgc","solidaires"];
var ULN = { cgt:"CGT", cfdt:"CFDT", fo:"FO", cftc:"CFTC", cgc:"CFE-CGC", solidaires:"Solidaires" };
var UC = { cgt:"#E24B4A", cfdt:"#378ADD", fo:"#EF9F27", cftc:"#1D9E75", cgc:"#7F77DD", solidaires:"#639922" };

// GeoJSON des régions (exemple, à compléter avec les données réelles)
var regionsGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "nom": "AUVERGNE RHONE ALPES" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[2.0,45.0],[3.0,45.0],[3.0,46.0],[2.0,46.0],[2.0,45.0]]] // à remplacer par les vraies coordonnées
      }
    }
    // ... toutes les autres régions
  ]
};

var deptsGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "code": "01", "nom": "Ain" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[4.5,45.5],[5.0,45.5],[5.0,46.0],[4.5,46.0],[4.5,45.5]]] // à remplacer
      }
    }
    // ... tous les départements
  ]
};

// Fonction getDeptDk
function getDeptDk(code) {
  var deptList = [];
  var cp2 = code.length === 1 ? '0' + code : code;
  for (var i = 0; i < STRUCTS.length; i++) {
    var cp = String(STRUCTS[i].cp || '');
    if (cp.substring(0, 2) === cp2 || cp.substring(0, 2) === code) deptList.push(STRUCTS[i]);
  }
  if (!deptList.length) return null;
  var dk = { count: deptList.length, insc: 0, votants: 0, part: 0 };
  var tp = 0;
  for (var j = 0; j < deptList.length; j++) {
    var s = deptList[j];
    dk.insc += s.in || 0;
    dk.votants += s.vo || 0;
    tp += s.pa || 0;
  }
  dk.part = deptList.length > 0 ? Math.round(tp / deptList.length) : 0;
  var gan = '';
  var max = 0;
  for (var k = 0; k < UK.length; k++) {
    var key = UK[k].substring(0, 2) === 'so' ? 'so' : UK[k].substring(0, 2);
    var votes = 0;
    for (var l = 0; l < deptList.length; l++) votes += deptList[l][key] || 0;
    if (votes > max) { max = votes; gan = UK[k]; }
  }
  dk.gagnant = gan;
  dk.structs = deptList;
  return dk;
}
