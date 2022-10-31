// Sprint 1 Makaia - Desarrollado por Víctor Manuel Morales Hoyos

//------------------------ Global Scope
var dineroTotal = 100000.0; // Variable global
var vectorUsuario = []; // Vector Global
var vectorDinero = [
  // Vector de Objetos Global
  { cant: 0, nom: 5 },
  { cant: 0, nom: 10 },
  { cant: 0, nom: 20 },
  { cant: 0, nom: 50 },
  { cant: 1, nom: 100 },
];
//------------------------ Objects
class Usuarios {
  // Clase Usuarios
  nomUsuario; // Propiedades/ Atributos Clase, los tratamos todos como Strings en este caso
  idUsuario;
  passUsuario;
  tipoUsuario;

  constructor(_nomUsuario, _idUsuario, _passUsuario, _tipoUsuario) {
    // Contrusctor
    this.nomUsuario = _nomUsuario;
    this.idUsuario = _idUsuario;
    this.passUsuario = _passUsuario;
    this.tipoUsuario = _tipoUsuario;
  }
}
obj0 = new Usuarios("Juan Camilo", "1061", "1234", "1"); // Instanciando obj de Clase Usuario
obj1 = new Usuarios("Laura Vanesa", "1051", "admin", "2"); // Instanciando obj de Clase Usuario
vectorUsuario = [obj0, obj1]; // Añadiendo obj al vector de Usuarios

//------------------------ Functions
function hackBank() {
  // Lista los usuarios y sus datos( Esto es PESIMA practica en entono real)
  console.clear();
  console.log("\n ❕ Opcion elegida: 1. Hackear Banco(Listar usuarios) ");
  console.table(vectorUsuario);
  menu();
}

function login() {
  console.clear();
  console.log("\n ❕ Opcion elegida: 2. Iniciar Sesion");

  let loginId = prompt("➡ Ingresa la identificacion..."); // Capturo ID
  const SEARCH_FLAG = vectorUsuario.find((user) => user.idUsuario === loginId); // Busco por id, si encuentra me devuelve el objeto en la constante, sino undefined

  if (SEARCH_FLAG == undefined) {
    // Si es undefined, es decir no econtro el user, entonces...
    console.log("❌ Usuario NO econtrado");
  } else {
    // Si lo ecuentra, solicito la contraseña
    let loginPass = prompt("➡ Ingrese la contraseña..."); // Capturo PASS
    if (SEARCH_FLAG.passUsuario === loginPass) {
      console.log("✅ Sesion iniciada correctamente"); // -------- SESION EXITOSA!!
      if (SEARCH_FLAG.tipoUsuario === "1") {
        // Si es cliente a retirar
        retirarDinero();
      } else if (SEARCH_FLAG.tipoUsuario === "2") {
        // Si es admin a ingresar
        ingresarDinero();
      } else {
        console.log("❌ Error en tipo de Usuario");
      }
    } else {
      console.log("❌ Contraseña invalida, vuelva a ingresar"); // Contraseña invalida
    }
  }
  menu();
}

function addUser() {
  console.clear();
  console.log("\n ❕ Opcion elegida: 3. Registar nuevo usuario");
  objFlag = new Usuarios( // Obj bandera de Usuario
    prompt("Ingrese el nombre"),
    prompt("Ingrese el id"),
    prompt("Ingrese la contraseña"),
    prompt("Ingrese el tipo de Usuario(solo el numero): 1. Cliente o 2. Admin:")
      .trim()
      .toLowerCase()
  );
  vectorUsuario.push(objFlag); // Lo añadimos al Vector de Usuarios
  console.log("\n ✅ Usuario añadido exitosamente");
  menu();
}

function ingresarDinero() {
  console.log("\n Ingresando DINERO...");
  let flag5 = parseInt(prompt("➡ Ingrese cantidad de billetes de 5mil COP..."));
  console.log("-Ingresando billetes de 5mil");
  flag5 = validarPositivo(flag5);// Validacion
  flag5 = validarPositivo(flag5);
  vectorDinero[0].cant += flag5;
  let flag10 = parseInt(prompt("➡ Ingrese cantidad de billetes de 10mil COP..."));
  console.log("-Ingresando billetes de 10mil");
  flag10 = validarPositivo(flag10);// Validacion
  vectorDinero[1].cant += flag10;
  let flag20 = parseInt( prompt("➡ Ingrese cantidad de billetes de 20mil COP..."));
  console.log("-Ingresando billetes de 20mil");
  flag20 = validarPositivo(flag20);// Validacion
  vectorDinero[2].cant += flag20;
  let flag50 = parseInt(prompt("➡ Ingrese cantidad de billetes de 50mil COP..."));
  console.log("-Ingresando billetes de 50mil");
  flag50 = validarPositivo(flag50);// Validacion
  vectorDinero[3].cant += flag50;
  let flag100 = parseInt(prompt("➡ Ingrese cantidad de billetes de 100mil COP..."));
  console.log("-Ingresando billetes de 100mil");
  flag100 = validarPositivo(flag100);// Validacion
  vectorDinero[4].cant += flag100;
  calcularDinero();
  menu();
}

function validarPositivo(_number) {
  if (_number >= 0) {
    return _number;
  } else {
    do {
      alert("Solo numeros positivos");
      _number = parseInt(prompt("Ingrese nuevamente: "));
    } while (_number < 0);
    return _number;
  }
}

function retirarDinero() {
  let cont5 = 0;
  let cont10 = 0;
  let cont20 = 0;
  let cont50 = 0;
  let cont100 = 0;
  let montoRetirar = 0.0;
  let boolFlag = true;

  console.log("\n Retirando DINERO...");
  if (dineroTotal == 0) {
    console.log("❌ Cajero en mantenimiento, vuelva pronto");
  } else {
    montoRetirar = parseFloat(prompt(" ¿Qué cantidad desea retirar? "));
    montoRetirar = validarPositivo(montoRetirar);// Validacion
    console.log("\n -> Cantidad a retirar solicitada: " + montoRetirar);
    let montoRetirable = montoRetirar;
    //----------------- LOGICA------------------
    do {
      // Do global
      boolFlag = false;
      if (montoRetirar >= 100000 && vectorDinero[4].cant > 0) {
        // Si pasa signfica que se puede descontar un billete de 100
        montoRetirar -= 100000; // -100mil el monto a retirar
        vectorDinero[4].cant -= 1; // -1 nuestro stock de billetes de 100
        cont100 += 1; // Contador para mostrar despues en el retiro
        boolFlag = true;
      } else if (montoRetirar >= 50000 && vectorDinero[3].cant > 0) {
        montoRetirar -= 50000;
        vectorDinero[3].cant -= 1;
        cont50 += 1;
        boolFlag = true;
      } else if (montoRetirar >= 20000 && vectorDinero[2].cant > 0) {
        montoRetirar -= 20000;
        vectorDinero[2].cant -= 1;
        cont20 += 1;
        boolFlag = true;
      } else if (montoRetirar >= 10000 && vectorDinero[1].cant > 0) {
        montoRetirar -= 10000;
        vectorDinero[1].cant -= 1;
        cont10 += 1;
        boolFlag = true;
      } else if (montoRetirar >= 5000 && vectorDinero[0].cant > 0) {
        montoRetirar -= 5000;
        vectorDinero[0].cant -= 1;
        cont5 += 1;
        boolFlag = true;
      } else if (
        // Si esto se cumple signfica que no se pudo retirar nada
        cont100 == 0 &&
        cont50 == 0 &&
        cont20 == 0 &&
        cont10 == 0 &&
        cont5 == 0
      ) {
        boolFlag = false;
        console.log(" ❌ Dinero en cajero no suficiente");
      }
    } while (boolFlag == true); // Do global del principio
    montoRetirable -= montoRetirar; // Para mostrar cuanto se pudo retirar
    dineroTotal -= montoRetirable; // Descontamos de nuestra variable global el retiro

    //------------------------------------------
    console.log("-------------"); //Impresion resultados
    console.log(
      "SE ENTREGA: \n  # Billetes de 100: " +
        cont100 +
        "\n  # Billetes de 50:  " +
        cont50 +
        "\n  # Billetes de 20:  " +
        cont20 +
        "\n  # Billetes de 10:  " +
        cont10 +
        "\n  # Billetes de 5:   " +
        cont5
    );
    console.log("--> CANTIDAD RETIRADA: " + Math.floor(montoRetirable));
    console.log(
      " Cantidad no retirada por falta de sencillo: " + Math.floor(montoRetirar)
    );
    console.log("-------------");
    calcularDinero();
  }
  menu();
}

function calcularDinero() {
  // Funcion que calcula dinero ACTUAL disponible
  dineroTotal = 0;
  console.log("-------------");
  console.log(" DINERO ACTUAL EN CAJERO");
  for (let i = 0; i < vectorDinero.length; i++) {
    let partialTotal = vectorDinero[i].cant * vectorDinero[i].nom * 1000;
    console.log(
      " # Billetes de " +
        vectorDinero[i].nom +
        ": " +
        vectorDinero[i].cant +
        " - Total: " +
        partialTotal +
        " COP"
    );
    dineroTotal += partialTotal;
    partialTotal = 0;
  }
  console.log("--- >TOTAL GENERAL: " + dineroTotal);
  console.log("-------------");
}

function menu() {
  // Menu
  console.log(" \n\n\n           ⚡ ATM MakaiaBank ⚡");
  console.log("   ___________________________________________");
  console.log("  |                 - MENU -                  |");
  console.log("  |                                           |");
  console.log("  | 1. Hackear Banco(Listar usuarios)         |");
  console.log("  | 2. Iniciar Sesion                         |");
  console.log("  | 3. Registar nuevo usuario                 |");
  console.log("   ___________________________________________");
  console.log(
    " ➡ Ingresa el idice de la opcion deseada en la ventana emergente..."
  );

  let option = prompt("➡ Ingresa una opcion...");
  option = validarPositivo(option);// Validacion

  let alternativeSwitch = {
    1: () => hackBank(),
    2: () => login(),
    3: () => addUser(),
    default: () => console.log("\n❌ Opcion no valida, recarga"),
  };
  let handler = alternativeSwitch[option] ?? alternativeSwitch["default"];
  handler();
}
// ------------------------ Main Scope
alert(
  "⚡ Bienvenido al cajero de MakaiaBank ⚡ \n - Abre la consola\n - Para salir del loop, pulsa cancelar en el menu principal \n - Dinero por defecto: 1 Billete de 100"
);
menu();
