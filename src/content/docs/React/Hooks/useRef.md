---
title: useRef
---


# useRef

El hook `useRef` en React es una herramienta poderosa y versátil para manejar referencias a elementos del DOM y otros valores persistentes que no causan re-renderizados cuando cambian. A continuación, se explica en profundidad su uso con ejemplos.

### Introducción a `useRef`

1. **Importación**: Primero, necesitas importar el hook desde React.

    ```jsx
    import React, { useRef } from 'react'
    ```

2. **Sintaxis básica**:

    ```jsx
    const refContainer = useRef(initialValue)
    ```

    - **`initialValue`**: Valor inicial del objeto `ref`. Puede ser `null` para elementos del DOM o cualquier otro valor para referencias no DOM.

3. **Acceso a la referencia**:
    ```jsx
    refContainer.current
    ```
    - `refContainer.current` es mutable y se puede actualizar sin causar re-renderizados.

### Ejemplo Básico

Imaginemos que queremos enfocarnos en un campo de entrada (input) cuando el componente se monta.

```jsx
import React, { useRef, useEffect } from 'react'

function FocusInput() {
    const inputRef = useRef(null)

    useEffect(() => {
        // Enfocar el input cuando el componente se monta
        inputRef.current.focus()
    }, [])

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Focus me on mount" />
        </div>
    )
}

export default FocusInput
```

### Desglose del Ejemplo

-   **Referencia al Elemento**:

    ```jsx
    const inputRef = useRef(null)
    ```

    Se utiliza `useRef` para crear una referencia al elemento `input`.

-   **Efecto de `useEffect`**:
    ```jsx
    useEffect(() => {
        inputRef.current.focus()
    }, [])
    ```
    El `useEffect` enfoca el campo de entrada cuando el componente se monta. La dependencia vacía (`[]`) asegura que esto solo ocurra una vez.

### Referencias Persistentes

`useRef` no solo se usa para elementos del DOM. También es útil para almacenar cualquier valor mutable que necesita persistir a través de renderizados sin causar un nuevo renderizado cuando cambia.

#### Ejemplo de Referencia Persistente

Imaginemos que queremos medir cuántas veces se ha renderizado un componente.

```jsx
import React, { useRef, useState, useEffect } from 'react'

function RenderCounter() {
    const renderCount = useRef(1)
    const [value, setValue] = useState(0)

    useEffect(() => {
        renderCount.current += 1
    })

    return (
        <div>
            <p>Render count: {renderCount.current}</p>
            <button onClick={() => setValue(value + 1)}>Re-render</button>
        </div>
    )
}

export default RenderCounter
```

### Desglose del Ejemplo de Referencia Persistente

-   **Referencia al Contador de Renderizados**:

    ```jsx
    const renderCount = useRef(1)
    ```

    `renderCount` se inicializa en 1 y no causa un re-renderizado cuando cambia.

-   **Incremento del Contador de Renderizados**:
    ```jsx
    useEffect(() => {
        renderCount.current += 1
    })
    ```
    El `useEffect` incrementa el contador cada vez que el componente se renderiza.

### Uso de `useRef` con Componentes Controlados

`useRef` también es útil en componentes controlados donde necesitas acceder directamente al DOM o gestionar el estado sin causar renderizados adicionales.

#### Ejemplo con un Temporizador

Imaginemos que queremos implementar un temporizador que se puede iniciar, pausar y reiniciar.

```jsx
import React, { useRef, useState } from 'react'

function Timer() {
    const [time, setTime] = useState(0)
    const intervalRef = useRef(null)

    const startTimer = () => {
        if (intervalRef.current !== null) return
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1)
        }, 1000)
    }

    const stopTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }

    const resetTimer = () => {
        stopTimer()
        setTime(0)
    }

    return (
        <div>
            <p>Time: {time} seconds</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    )
}

export default Timer
```

### Desglose del Ejemplo del Temporizador

-   **Referencia al Intervalo**:

    ```jsx
    const intervalRef = useRef(null)
    ```

    `intervalRef` mantiene una referencia al identificador del intervalo y permite controlar el temporizador sin causar re-renderizados.

-   **Gestión del Temporizador**:

    ```jsx
    const startTimer = () => {
        if (intervalRef.current !== null) return
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1)
        }, 1000)
    }

    const stopTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }

    const resetTimer = () => {
        stopTimer()
        setTime(0)
    }
    ```

    Las funciones `startTimer`, `stopTimer` y `resetTimer` gestionan el estado del temporizador utilizando `intervalRef`.
