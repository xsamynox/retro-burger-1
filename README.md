# Retro Burger

## Índice

- [Retro Burger](#retro-burger)

  - [1. Resumen del proyecto](#1-resumen-del-proyecto)
  - [2. Producto final](#2-producto-final)
  - [3. Planteamiento del Problema](#3-planteamiento-del-problema)
    - [3.1 Investigación](#31-Investigación)
    - [3.2 Creación de Prototipo de baja fidelidad](#22-creación-de-prototipo-de-baja-fidelidad)
    - [3.3 Diagrama de flujo](#33-diagrama-de-flujo)
    - [3.4 Creación de Prototipo de alta fidelidad](#34-creación-de-prototipo-de-alta-fidelidad)
  - [4. Resolución del problema](#4-resolución-del-problema)
    - [4.1 Aportes](#41-aportes)
  - [5. Desiciones de diseño](#5-desiciones-de-diseño)
    - [5.1 Inspiración](#51-inspiración)
    - [5.2 Colores](#52-colores)
    - [5.3 Tipografía](#52-tipografía)
    - [5.4 Aspecto visual](#53-aspecto-visual)
  - [6. Acerca de la aplicación](#6-acerca-de-la-aplicación)
  - [7. Autores](#7-autores)

---

## 1. Resumen del proyecto

![Retro Burger](/src/imagesReadme/retro-burger.jpg)

Retro Burger es un pequeño restaurant 24 horas, ambientado en los años 50's, que ofrece 2 tipos de menú, siendo estos:

> Menú del desayuno:
>
> | Ítem               | Precio \$ |
> | ------------------ | --------- |
> | Pancakes           | 2000      |
> | Tostadas con palta | 1990      |
> | Huevos fritos      | 1500      |
> | Ensalada de frutas | 1500      |
> | **Para tomar**     | **\$**    |
> | Agua gasificada    | 700       |
> | Agua sin gas       | 500       |
> | Café americano     | 1000      |
> | Capuccino          | 1500      |

Y otro menú para el resto del día:

> | Ítem                | Precio |
> | ------------------- | ------ |
> | **Hamburguesas**    | **\$** |
> | Hamburguesa simple  | 5990   |
> | Hamburguesa doble   | 7990   |
> | **Acompañamientos** | **\$** |
> | Papas fritas        | 990    |
> | Aros de cebolla     | 1990   |
> | **Para tomar**      | **\$** |
> | Agua gasificada     | 700    |
> | Agua sin gas        | 500    |
> | Milkshake Chocolate | 2200   |
> | Milkshake Fresa     | 2200   |

<br>

## 2. Producto final.

Puedes ver aca nuestra webapp implentada : https://retro-burger-2.firebaseapp.com/

## 3. Planteamiento del problema

Debido al crecimiento que ha tenido Retro Burger en los últimos meses, se planteo la necesidad de una interfaz que les permitiera tomar los pedidos de sus clientes de manera sencilla, y que a su vez, pudiese enviar dicha información a la cocina. De esta manera atender a la clientela en menor tiempo y con mayor facilidad y organización.

### 3.1 Investigación

Antes de comenzar con la implementación de la interfaz, fue necesario hacer una investigación que nos permitiera conocer como es el funcionamiento de estos sistemas en restaurantes similares, así mismo pudimos encontrar varios puntos importantes a tener en cuenta para mejorar la usabilidad de la interfaz, como lo son los siguientes:

- Interfaz limpia, sin distractivos.
- Separación de categorias identificadas con colores.
- Fácil ingreso y navegación.
- Limitar los campos de textos.
- Todo lo necesario debe estar visible.
- Separación de menús de acuerdo al horario.

### 3.2 Creación de Prototipo de baja fidelidad

Teniendo en cuenta la investigación realizada decidimos comenzar a implementar lo que sería nuestro prototipo de baja fidelidad.

Puedes ver aqui nuestro Prototipo de baja fidelidad:
[Invision.](https://macarenacuevas784453.invisionapp.com/freehand/burger-queen-gu1kbSaAc)

Con este prototipo de baja quisimos plasmar la idea principal, de una interfaz limpia, simple y bastante amigable en usabilidad, destacando el hecho de que todo se encuentra al alcance de un click.

### 3.3 Diagrama de flujo

[Creately](https://app.creately.com/diagram/qbTlWwO5YLO/edit)

### 3.4 Creación de Prototipo de alta fidelidad

Siguiendo la misma línea del prototipo de baja, y ya teniendo más claros los objetivos del proyecto, diseñamos el prototipo de alta, implementando colores y otros detalles que nos serian de gran utilidad al momento de programar.

Puedes ver aqui nuestro Prototipo de alta fidelidad:
[Figma.](https://www.figma.com/file/P6IojYtoZ7XBmj9Gu3LWhY/RetroBurgers?node-id=0%3A1)

## 4. Resolución del problema

Esta interfaz viene a suplir una necesidad que es la de tomar y recibir pedidos de manera **rápida**, **simple**, y **ordenada**. Por ende nuestro objetivo principal fue desarrollar una plataforma que no requiera una navegación compleja, y que permitiese tanto al mesero como al cocinero, tener todo al alcance de un click. En palabras más simples, la plataforma cuenta solo con clicks, que proporcionan una navegación más sencilla e intuitiva.

Sin embargo, nos dimos cuenta que en los restaurantes muchas veces se tienen requerimientos especiales, y es por ello que decidimos tener un campo de texto que pudiese enviar esta información al cocinero, siendo este el unico momento que el mesero tendría que hacer algo que no fuese un click.

De parte del cocinero, la plataforma es muchísimo más amigable, pensando en el hecho de lo atareados que estarían, nuestro objetivo principal es que los pedidos se vayan actualizando automáticamente en la vista del cocinero y disponer de un solo botón en cada uno de los pedidos, que le permitiera clickear una vez que lo haya terminado de preparar y este listo para enviar a las mesas. Cabe destacar que aunque se mantienen en constante comunicación la vista del cocinero con el mesero, no es posible acceder a la cocina estando en la vista del mesero y viceversa, esto para contribuir en el order y en la navegación fluida.

Una vez que el pedido es enviado a cocina y así mismo es clickeado como Listo, el flujo consiste en enviar una notificación al cocinero que le indique cual de estos pedidos esta listo y a que mesa corresponde.

### 4.1 Aportes

- Interfaz limpia, simple y ordenada.
- Navegación fluida a través de clicks.
- Menús especificos para cada hora del día
- Colores para categorizar las comidas, los acompañamientos y las bebidas.
- Respectivos precios en cada producto.
- Opción de eliminar o disminuir la cantidad seleccionada.
- Posibilidad de ver cuanto sería el total de la orden.
- Notificación cada vez que se envía un pedido a la cocina.

## 5. Desiciones de diseño

## 5.1 Inspiración

![Inspiración](/src/imagesReadme/fotodinner.jpg)

## 5.2 Colores

A pesar de que nuestros principales objetivos al desarrollar esta plataforma, fueron los de una interfaz simple, quisimos rescatar la temática del restaurante y utilizar colores pasteles que hicieran alución al ambiente de las cafeterias de los años 50's

![Paleta de colores](/src/imagesReadme/colors.png)

### 5.3 Tipografía

La fuente que utilizamos en toda la interfaz fue: **Unna**, que aporta sentido a la temática sin perder legibilidad, ni llegar a ser demasiado formal.

![Fuente](/src/imagesReadme/fontUnna.png)

### 5.4 Aspecto visual

Al ser una interfaz de uso interno para los trabajadores de **Retro Burger** nos parecio conveniente omitir fotos o elementos distractores, es por ello que el menú solo contiene el nombre y el precio de cada producto y los colores para identificar o ubicar fácilmente el producto requerido.

## 6. Acerca de la aplicación

- Interfaz implementada en React.
- Iconos con Font awensome.
- Uso de la base de datos de Firebase.

## 7. Autores

- Macarena Cuevas.
- Geraldine Villacura.
- Samantha Moreno.
