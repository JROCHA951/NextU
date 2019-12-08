var calculadora_master = {

  pantalla: document.getElementById("display"),
  operacion: "",
  valorpantalla: "0",
  primerValor: 0,
  segundoValor:0,
  ultimoValor:0,
  resultado:0,
  TeclaIgual: false,

  init: (function(){
    this.addEventFormatButton(".tecla");
    this.AddEventFunction();
  }),

//ASIGNAMOS LOS EVENTOS DE addEventFormatButton
addEventFormatButton: function(selector){
  var x=document.querySelectorAll(selector);
  for(var i=0; i<x.length;i++){
    x[i].onmouseover = this.EventMinBoton;
    x[i].onmouseleave = this.EventPlusBoton;
  };
},

EventMinBoton: function(event){
  calculadora_master.MinBoton(event.target);
},

EventPlusBoton: function(event){
  calculadora_master.PlusBoton(event.target);
},

//FORMAT addEventFormatButton
MinBoton: function(elemento){
  var x=elemento.id;
  if(x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto"){
    elemento.style.width ="28%";
    elemento.style.height = "62px";
  } else if(x=="mas"){
    elemento.style.width = "88%";
    elemento.style.height = "98%";
  } else {
    elemento.style.width = "21%";
    elemento.style.height = "62px";
  }
},

PlusBoton: function(elemento){
  var x=elemento.id;
  if(x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto"){
    elemento.style.width ="29%";
    elemento.style.height = "62.91px";
  } else if(x=="mas"){
    elemento.style.width = "90%";
    elemento.style.height = "100%";
  } else {
    elemento.style.width = "22%";
    elemento.style.height = "62.91px";
  }
},

AddEventFunction: function(){
  document.getElementById("0").addEventListener("click", function() {calculadora_master.ingresoNumero("0");});
  document.getElementById("1").addEventListener("click", function() {calculadora_master.ingresoNumero("1");});
  document.getElementById("2").addEventListener("click", function() {calculadora_master.ingresoNumero("2");});
  document.getElementById("3").addEventListener("click", function() {calculadora_master.ingresoNumero("3");});
  document.getElementById("4").addEventListener("click", function() {calculadora_master.ingresoNumero("4");});
  document.getElementById("5").addEventListener("click", function() {calculadora_master.ingresoNumero("5");});
  document.getElementById("6").addEventListener("click", function() {calculadora_master.ingresoNumero("6");});
  document.getElementById("7").addEventListener("click", function() {calculadora_master.ingresoNumero("7");});
  document.getElementById("8").addEventListener("click", function() {calculadora_master.ingresoNumero("8");});
  document.getElementById("9").addEventListener("click", function() {calculadora_master.ingresoNumero("9");});
  document.getElementById("on").addEventListener("click", function(){calculadora_master.borrarpantalla();});
  document.getElementById("sign").addEventListener("click", function(){calculadora_master.changesign();});
  document.getElementById("punto").addEventListener("click", function(){calculadora_master.Adddecimal();});
  document.getElementById("igual").addEventListener("click", function(){calculadora_master.SeeResult();});
  document.getElementById("raiz").addEventListener("click", function(){calculadora_master.AddOperacion("raiz");});
  document.getElementById("dividido").addEventListener("click", function(){calculadora_master.AddOperacion("/");});
  document.getElementById("por").addEventListener("click", function(){calculadora_master.AddOperacion("*");});
  document.getElementById("menos").addEventListener("click", function(){calculadora_master.AddOperacion("-");});
  document.getElementById("mas").addEventListener("click", function(){calculadora_master.AddOperacion("+");});
},

borrarpantalla: function(){
  this.valorpantalla="0";
  this.operacion="";
  this.primerValor=0;
  this.segundoValor=0;
  this.resultado=0;
  this.operacion="";
  this.TeclaIgual=false;
  this.ultimoValor=0;
  this.updateVisor();
},

changesign:function(){
  if(this.valorpantalla !="0"){
    var aux;
    if(this.valorpantalla.charAt(0)=="-"){
      aux = this.valorpantalla.slice(1);
    }else{
      aux= "-" + this.valorpantalla;
    }
    this.valorpantalla="";
    this.valorpantalla=aux;
    this.updateVisor();
  }
},

Adddecimal: function(){
  if (this.valorpantalla.indexOf(".")== -1) {
    if(this.valorpantalla == ""){
      this.valorpantalla = this.valorpantalla + "0.";
    } else {
      this.valorpantalla = this.valorpantalla + ".";
    }
    this.updateVisor();
  }
},

ingresoNumero: function(valor){
  if (this.valorpantalla.length < 8) {

    if (this.valorpantalla=="0") {
      this.valorpantalla="";
      this.valorpantalla=this.valorpantalla + valor;
    }else {
      this.valorpantalla=this.valorpantalla + valor;
    }
    this.updateVisor();
  }
},

AddOperacion:function(opera){
  this.primerValor=parseFloat(this.valorpantalla);
  this.valorpantalla="";
  this.operacion = opera;
  this.TeclaIgual=false;
  this.updateVisor();
},

SeeResult: function(){
  if(!this.TeclaIgual){
    this.segundoValor=parseFloat(this.valorpantalla);
    this.ultimoValor=this.segundoValor;
    this.ResultOpera(this.primerValor, this.segundoValor, this.operacion);
  }else {
    this.ResultOpera(this.primerValor, this.ultimoValor, this.operacion);
  }
  this.primerValor=this.resultado;
  this.valorpantalla="";

  if(this.resultado.toString().length< 9){
    this.valorpantalla=this.resultado.toString();
  }else {
    this.valorpantalla=this.resultado.toString().slice(0,8) + "...";
  }

  this.TeclaIgual=true;
  this.updateVisor();
},

ResultOpera:function(primerValor, segundoValor, operacion){
  switch(operacion){
    case "+":
      this.resultado = eval(primerValor + segundoValor);
    break;
    case "-":
      this.resultado = eval(primerValor - segundoValor);
    break;
    case "*":
      this.resultado = eval(primerValor * segundoValor);
    break;
    case "/":
      this.resultado = eval(primerValor / segundoValor);
    break;
    case "raiz":
      this.resultado = eval(Math.sqrt(primerValor));

  }
},

updateVisor:function(){
  this.pantalla.innerHTML = this.valorpantalla;
}


};
calculadora_master.init();
