---
title: Excel
---


```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta author="MiduDev" />
        <meta url="midudev" />
        <meta author="ShunTrDev" />
        <title>Excel.js</title>
        <style>
            body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                    'Open Sans', 'Helvetica Neue', sans-serif;
            }

            *,
            *::before,
            *::after {
                box-sizing: border-box;
            }

            img {
                max-width: 20px;
                height: auto;
            }

            table {
                border-collapse: collapse;
            }

            thead,
            tr td:first-child {
                background: #eee;
            }

            th,
            td {
                border: 1px solid #ccc;
                font-weight: normal;
                font-size: 12px;
                text-align: center;
                width: 64px;
                height: 20px;
                vertical-align: middle;
                position: relative;
            }

            /* td:active {
            border-radius: 2px;
            outline: 2px solid #09f;
            } */

            span,
            input {
                position: absolute;
                inset: 0;
                vertical-align: middle;
                display: inline-flex;
                justify-content: center;
                align-items: center;
            }

            input {
                border: 0;
                opacity: 0;
                pointer-events: none;
                width: 100%;
                border-radius: 2px;

                &:focus {
                    opacity: 1;
                    outline: 2px solid #09f;
                }
            }

            .selected {
                background: rgb(174, 223, 255);
            }

            th.selected {
                background: rgb(146, 211, 255);
            }
        </style>
        <script type="module">
            const $ = (el) => document.querySelector(el)
            const $$ = (el) => document.querySelectorAll(el)

            const $table = $('table')
            const $head = $('thead')
            const $body = $('tbody')

            const ROWS = 10
            const COLUMNS = 5
            const FIRST_CHAR_CODE = 65

            const times = (length) => Array.from({ length }, (_, i) => i)
            const getColumn = (i) => String.fromCharCode(FIRST_CHAR_CODE + i)

            let selectedColumn = null

            let STATE = times(COLUMNS).map((i) => times(ROWS).map((j) => ({ computedValue: 0, value: 0 })))

            console.log(STATE)

            function updateCell({ x, y, value }) {
                const newState = structuredClone(STATE)
                const constants = generateCellsConstants(newState)

                const cell = newState[x][y]

                cell.computedValue = computeValue(value, constants) // -> span
                cell.value = value // -> input

                newState[x][y] = cell

                computeAllCells(newState, generateCellsConstants(newState))

                STATE = newState

                renderSpreadSheet()
            }

            function generateCellsConstants(cells) {
                return cells
                    .map((rows, x) => {
                        return rows
                            .map((cell, y) => {
                                const letter = getColumn(x) // -> A
                                const cellId = `${letter}${y + 1}` // -> A1
                                return `const ${cellId} = ${cell.computedValue};`
                            })
                            .join('\n')
                    })
                    .join('\n')
            }

            function computeAllCells(cells, constants) {
                console.log('computeAllCells')
                cells.forEach((rows, x) => {
                    rows.forEach((cell, y) => {
                        const computedValue = computeValue(cell.value, constants)
                        cell.computedValue = computedValue
                    })
                })
            }

            function computeValue(value, constants) {
                if (typeof value === 'number') return value
                if (!value.startsWith('=')) return value

                const formula = value.slice(1)

                let computedValue
                try {
                    computedValue = eval(`(() => {
        ${constants}
            return ${formula};
        })()`)
                } catch (e) {
                    computedValue = `!ERROR: ${e.message}`
                }

                console.log({ value, computedValue })

                return computedValue
            }

            const renderSpreadSheet = () => {
                const headerHTML = `<tr>
                    <th></th>
                    ${times(COLUMNS)
                        .map((i) => `<th>${getColumn(i)}</th>`)
                        .join('')}
                </tr>`

                $head.innerHTML = headerHTML

                const bodyHTML = times(ROWS)
                    .map((row) => {
                        return `<tr>
                            <td>${row + 1}</td>
                            ${times(COLUMNS)
                                .map(
                                    (column) => `
                            <td data-x="${column}" data-y="${row}">
                                <span>${STATE[column][row].computedValue}</span>
                                <input type="text" value="${STATE[column][row].value}" />
                            </td>
                            `
                                )
                                .join('')}
                        </tr>`
                    })
                    .join('')

                $body.innerHTML = bodyHTML
            }

            $body.addEventListener('click', (event) => {
                const td = event.target.closest('td')
                if (!td) return

                const { x, y } = td.dataset
                const input = td.querySelector('input')
                const span = td.querySelector('span')

                const end = input.value.length
                input.setSelectionRange(end, end)
                input.focus()

                $$('.selected').forEach((el) => el.classList.remove('selected'))
                selectedColumn = null

                input.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') input.blur()
                })

                input.addEventListener(
                    'blur',
                    () => {
                        console.log({ value: input.value, state: STATE[x][y].value })

                        if (input.value === STATE[x][y].value) return

                        updateCell({ x, y, value: input.value })
                    },
                    { once: true }
                )
            })

            $head.addEventListener('click', (event) => {
                const th = event.target.closest('th')
                if (!th) return

                const x = [...th.parentNode.children].indexOf(th)
                if (x <= 0) return

                selectedColumn = x - 1

                $$('.selected').forEach((el) => el.classList.remove('selected'))
                th.classList.add('selected')
                $$(`tr td:nth-child(${x + 1})`).forEach((el) => el.classList.add('selected'))
            })

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace' && selectedColumn !== null) {
                    times(ROWS).forEach((row) => {
                        updateCell({ x: selectedColumn, y: row, value: '' })
                    })
                    renderSpreadSheet()
                }
            })

            document.addEventListener('copy', (event) => {
                if (selectedColumn !== null) {
                    const columnValues = times(ROWS).map((row) => {
                        return STATE[selectedColumn][row].computedValue
                    })

                    event.clipboardData.setData('text/plain', columnValues.join('\n'))
                    event.preventDefault()
                }
            })

            document.addEventListener('click', (event) => {
                const { target } = event

                const isThClicked = target.closest('th')
                const isTdClicked = target.closest('td')

                if (!isThClicked && !isTdClicked) {
                    $$('.selected').forEach((el) => el.classList.remove('selected'))
                    selectedColumn = null
                }
            })

            renderSpreadSheet()
        </script>
    </head>

    <body>
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Microsoft_Excel_2013-2019_logo.svg/1200px-Microsoft_Excel_2013-2019_logo.svg.png" />

        <table>
            <thead></thead>
            <tbody></tbody>
        </table>
    </body>
</html>

<!--
- Añadir la funconalidad de filas
- Haz la suma por rangos=A1:A20
- Seleccionar por celdas
-->

```
