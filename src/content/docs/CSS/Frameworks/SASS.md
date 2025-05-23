---
title: SASS
---


Instalación

```
npm install -g sass

//Compilación - whatch: cada vez que haces un cambio te lo compila a css
sass --watch estilos.scss styles.css
```

Creamos un archivo.scss - En el HTML importamos el styles.css

```
$font: sans-serif, Helvetica, Arial;
$color-fondo: #ccc;
$color-secundario: red;

body {
    background-color: $color-fondo;

    h1 {
        color: $color-secundario;
    }
}

```

Puedes importar el archivo \_base.css con

```
@use 'base';
```

mixin: conjunto de instrucciones que se van a ejecutar

```
@mixin crearBordes($color, $size, $shadow) {
    border: 5px solid $color;
    border-radius: $size;
    box-shadow: 0px, 0px, $size, $shadow;
}

.caja {
    @include crearBordes(red, 10px, black);
}
```

Herencia

```
<div class="alert"></div>

%alert-normal {
    border: 1px solid gray;
}

.alert {
    @extends %alert-normal;
}

.alert-danger{
    color: red;
}
```

Operadores

```
h1 {
    font-size: 20px + 5px;
}

.caja {
    width: 500px / 1920px * 100%;
}
```

Condicionales

```
@if $color-fondo == #ccc {
    color: black;
} @else {
    color: red;
}
```

Bucles (existen también el while, each pero víctor robles es un cancer de instructor y los mandó a la mierda)

```
$contador: 1;
@for $contador from 1 through 8 {
    . listado ul li:nth-child(#{$contador}){
        color: orange;
    }
}
```
