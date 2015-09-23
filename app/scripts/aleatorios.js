function generarNumerosAleatorios(opciones){
    var result = {};
    result.opciones = opciones;
    result.fecha = new Date();
    result.numerosAleatorios = [];
    if(opciones && opciones.metodo){
        var mapNumerosAleatorios = {};
        var cantidad = opciones.cantidad;
        for(var i=0;i<cantidad;i++){
            var raiz = i!=0?result.numerosAleatorios[i-1].xi:opciones.raiz;
            var aleatorio = opciones.metodo == 'Congruencial' ? generarNACongruencial(raiz,opciones):generarNACuadradoMedio(raiz,opciones);
            if(Object.keys(aleatorio).length>0){
                aleatorio.idx = i;
                aleatorio.raiz = raiz;
                verificarRepeticion(aleatorio, mapNumerosAleatorios);
                result.numerosAleatorios.push(aleatorio);
            }
        }
        result.analisis = analizarNumerosAleatorios(result.numerosAleatorios);
    }
    return result;
}

function generarNACongruencial(raiz,opciones){
    var aleatorio = {};
    if(opciones.a && opciones.c && opciones.m && opciones.d){
        var a = parseInt(opciones.a);
        var c = parseInt(opciones.c);
        var m = parseInt(opciones.m);
        var d = parseInt(opciones.d);
        aleatorio.peq=(a*raiz)+c;
        aleatorio.xi=aleatorio.peq%m;
        aleatorio.ri=(Math.round((aleatorio.xi/m)*Math.pow(10,d))/Math.pow(10,d)).toFixed(d);
    }
    return aleatorio;
}

function generarNACuadradoMedio(raiz,opciones){
    var aleatorio = {};
    if(opciones.d && opciones.ie) {
        var d = parseInt(opciones.d);
        var ie = parseInt(opciones.ie);
        aleatorio.peq = Math.pow(raiz, 2);
        var tmp = aleatorio.peq.toString();
        while (tmp.length > d) {
            tmp = ie > 0 ? tmp.slice(0, -1) : tmp.slice(1);
            ie *= -1;
        }
        aleatorio.xi = parseInt(tmp);
        aleatorio.ri = (aleatorio.xi / Math.pow(10, d)).toFixed(d);
    }
    return aleatorio;
}

function verificarRepeticion(aleatorio, mapNumerosAleatorios){
    if (!mapNumerosAleatorios[aleatorio.ri]) {
        mapNumerosAleatorios[aleatorio.ri] = [];
        aleatorio.rep = false;
    } else {
        aleatorio.rep = true;
    }
    mapNumerosAleatorios[aleatorio.ri].push(aleatorio);
}

function analizarNumerosAleatorios(numerosAleatorios){
    var analisis = {};
    analisis.media= calcularMedia(numerosAleatorios);
    analisis.varianza= calcularVarianza(numerosAleatorios,analisis.media);
    analisis.desvEst= Math.sqrt(analisis.varianza);
    analisis.max= maximo(numerosAleatorios),
    analisis.min= minimo(numerosAleatorios),
    analisis.recorrido= analisis.max - analisis.min;
    return analisis;
}

function calcularVarianza(numerosAleatorios,media){
    var sum = 0;
    var len = numerosAleatorios.length;
    if(len>0){
        numerosAleatorios.forEach(function(val){
            sum += Math.pow(val.ri/media,2);
        });
        return sum/len;
    }
    return 0;
}

function calcularMedia(numerosAleatorios){
    var sum = 0;
    var len = numerosAleatorios.length;
    if(len>0){
        numerosAleatorios.forEach(function(val){
            sum += parseFloat(val.ri);
        });
        return sum/len;
    }
    return 0;
}

function maximo(numerosAleatorios){
    var max = 0;
    numerosAleatorios.forEach(function(val){
        if(val.ri>max) max = val.ri;
    });
    return max;
}

function minimo(numerosAleatorios){
    var min = 1;
    numerosAleatorios.forEach(function(val){
        if(val.ri<min)min = val.ri;
    });
    return min;
}