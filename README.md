# NO A LA BORRAJA

# Arquitectura de la Solución: Recetas4V-v2

Este documento describe la arquitectura de la aplicación Recetas4V-v2, la cual está basada en los principios de **Diseño Atómico (Atomic Design)**. Esta metodología nos permite construir interfaces de usuario de manera sistemática, modular y escalable.

La estructura del proyecto se organiza en diferentes niveles de abstracción, desde los elementos más básicos hasta las páginas completas.

## Estructura de Componentes

La carpeta `src/app` contiene los siguientes directorios que reflejan la arquitectura de la solución:

### 1. Modelos (`models`)

En este directorio se definen las interfaces y clases que modelan los datos de la aplicación. Son la base sobre la que operan los servicios y componentes.

- **`recipe.ts`**: Define la estructura de un objeto de tipo receta.
- **`rating.ts`**: Define la estructura para las valoraciones de las recetas.

### 2. Átomos (`atoms`)

Los átomos son los bloques de construcción más pequeños de la interfaz. Son componentes indivisibles y reutilizables en toda la aplicación.

- **`star`**: Un componente que representa una única estrella, utilizado para mostrar o introducir valoraciones.

### 3. Moléculas (`molecules`)

Las moléculas son agrupaciones de átomos que funcionan juntos como una unidad. Representan componentes un poco más complejos.

- **`labeled-field`**: Combina una etiqueta (`label`) con un campo de entrada (`input`), formando un campo de formulario completo.
- **`rating-stars`**: Agrupa varias estrellas (`star`) para formar un sistema de valoración interactivo.

### 4. Organismos (`organisms`)

Los organismos son secciones más complejas de la interfaz, compuestas por moléculas y/o átomos. Forman partes distintas y autónomas de una página.

- **`new-recipe-form`**: El formulario completo para añadir una nueva receta.
- **`recipe-view`**: Muestra los detalles de una receta específica.
- **`recipes-list`**: Presenta una lista de todas las recetas.
- **`new-rating-form`**: Formulario para que los usuarios añadan una nueva valoración.
- **`rating-view`**: Muestra una valoración individual.
- **`ratings-list`**: Presenta la lista de valoraciones para una receta.

### 5. Páginas (`pages`)

Las páginas son el nivel más alto de la jerarquía. Componen organismos, moléculas y átomos para construir las vistas que el usuario final ve en la aplicación.

- **`main`**: La página principal de la aplicación, que probablemente contiene la lista de recetas y el formulario para añadir nuevas.
- **`ratings-page`**: Una página dedicada a mostrar y gestionar las valoraciones.

### 6. Servicios (`services`)

Los servicios encapsulan la lógica de negocio y la comunicación con fuentes de datos externas (como una API o una base de datos local). No son componentes visuales, pero son cruciales para el funcionamiento de la aplicación.

- **`recipes-service.ts`**: Gestiona las operaciones relacionadas con las recetas (obtener, crear, actualizar, eliminar).
- **`ratings-service.ts`**: Gestiona la lógica de las valoraciones.

## Conclusión

Esta arquitectura basada en Diseño Atómico promueve la reutilización de componentes, facilita el mantenimiento y permite un desarrollo más rápido y consistente. Al tener una clara separación de responsabilidades, es más sencillo para los desarrolladores entender, modificar y ampliar la funcionalidad de la aplicación.
