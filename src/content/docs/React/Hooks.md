---
title: Hooks
---


# Hooks

Un hook es una función especial que permite a los desarrolladores "engancharse" a las características de React (como el estado y el ciclo de vida de los componentes) desde componentes funcionales. Antes de los hooks, las características como el estado y el ciclo de vida solo estaban disponibles en componentes de clase. Con la introducción de los hooks en React 16.8, estas características ahora también están disponibles en componentes funcionales, lo que permite una forma más simple y concisa de escribir componentes React.

### Características de los Hooks

1. **Funciones**: Los hooks son simplemente funciones de JavaScript.
2. **No se usan en clases**: Los hooks solo funcionan en componentes funcionales, no en clases.
3. **Empiezan con "use"**: Todos los hooks tienen el prefijo "use" (ej. `useState`, `useEffect`) para seguir las convenciones de React y facilitar su búsqueda en el código.
4. **Llamados en la raíz del componente**: Deben ser llamados en el nivel superior de un componente funcional, no dentro de bucles, condiciones o funciones anidadas, para asegurar que el orden de los hooks sea el mismo en cada renderizado.

### ¿Por qué usar Hooks?

-   **Reutilización de lógica de estado**: Los hooks permiten reutilizar la lógica de estado entre diferentes componentes de una manera más limpia y compatible sin necesidad de usar componentes de orden superior (HOC) o render props.
-   **Simplificación de componentes**: Los hooks hacen que los componentes sean más fáciles de entender y mantener al reducir la necesidad de clases.
-   **Mejor manejo del ciclo de vida**: Permiten manejar los efectos secundarios y el ciclo de vida de los componentes de una manera más granular y controlada.

### Clasificación

Aquí tienes las breves descripciones para cada hook en tu lista:

#### Manejo del estado

-   [useState](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useState.md): Permite añadir el estado local a componentes funcionales React.
-   [useReducer](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useReducer.md): Alternativa a `useState` para gestionar el estado de componentes con lógica más compleja.
-   [useSyncExternalStore](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useSyncExternalStore.md): Sincroniza el estado local con un almacenamiento externo, como Local Storage.

#### Referencias

-   [useRef](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useRef.md): Retorna un objeto mutable ref que persiste a través de renders y no dispara una re-renderización.
-   [useImperativeHandle](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useImperativeHandle.md): Permite a componentes hijos acceder a funciones del componente padre a través de una referencia.

#### Efectos

-   [useEffect](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useEffect.md): Ejecuta efectos secundarios después de que el componente se monta y cada vez que se actualiza.
-   [useLayoutEffect](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useLayoutEffect.md): Similar a `useEffect`, pero se ejecuta sincrónicamente después de todos los cambios en el DOM.
-   [useInsertionEffect](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useInsertionEffect.md): Se ejecuta cuando un elemento se inserta en el DOM.

#### Contexto

-   [useContext](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useContext.md): Proporciona acceso al contexto de React.

#### Transición

-   [useTransition](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useTransition.md): Controla animaciones y transiciones de componentes.
-   [useDeferredValue](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useDeferredValue.md): Retrasa la actualización de un valor para mejorar el rendimiento.

#### Rendimiento

-   [useMemo](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useMemo.md): Memoriza el valor calculado de forma que solo se recalcula cuando las dependencias cambian.
-   [useCallback](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useCallback.md): Memoriza callbacks para evitar renders innecesarios en componentes hijos.

#### Utilidad

-   [useDebugValue](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useDebugValue.md): Permite mostrar etiquetas personalizadas en las herramientas de desarrollo para hooks personalizados.
-   [useId](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useId.md): Genera un identificador único para propósitos de accesibilidad.

#### React 19

-   [useFormStatus](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useFormStatus.md): Gestiona el estado de validación y otros estados relacionados con formularios.
-   [useFormState](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useFormState.md): Gestiona el estado interno de un formulario.
-   [useOptimistic](https://github.com/ShunTr-dev/Docs/tree/main/React/Hooks/useOptimistic.md): Mejora la experiencia del usuario al predecir y optimizar actualizaciones de estado.

# Referencias

-   [ALL React Hooks Explained in 12 Minutes](https://www.youtube.com/watch?v=LOH1l-MP_9k)
