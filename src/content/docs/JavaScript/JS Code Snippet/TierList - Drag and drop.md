---
title: TierList - Drag and drop
---


```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tier Maker</title>
        <style>
            :root {
                --color-s: #ff7f80;
                --color-a: #ffc07f;
                --color-b: #ffdf80;
                --color-c: #fdff7f;
                --color-d: #bfff7f;
                --color-e: #7fff7f;
            }

            *, /* CSS Reset */
            *::before,
            *::after {
                box-sizing: border-box;
            }

            button {
                /* CSS Reset */
                background: transparent;
                border: 0;
                color: #fff;
                cursor: pointer;
            }

            body {
                background: #111;
                color: #fff;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
                    'Open Sans', 'Helvetica Neue', sans-serif;
                margin: 0 auto;
                max-width: 500px;
                padding-inline: 32px; /* Padding left and right */
                user-select: none; /* Disable text selection */
            }

            #top-header {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 32px 0 16px;

                & img {
                    max-width: 125px;
                    height: auto;
                }
            }

            .tier {
                border: 1px solid #444;
                display: flex;
                flex-direction: column;
                background: #1f1f1f;
            }

            .row {
                display: flex;
                flex-direction: row;
                border-bottom: 1px solid #111;
                transition: all 0.3s ease;

                &.drag-over {
                    background: #555;
                    scale: 1.01;
                }
            }

            .label {
                cursor: pointer;
                background: var(--level, #09f);
                color: #333;
                font-weight: bold;
                width: 50px;
                height: 50px;

                display: flex;
                align-items: center;
                justify-content: center;

                & span:focus {
                    outline: 1px solid #fff;
                }
            }

            #selector {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
                margin-top: 16px;
            }

            #selector-buttons {
                display: flex;
                gap: 8px;
                justify-content: center;

                & button,
                & label {
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: #222;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 24px;
                    height: 24px;
                    padding: 4px;

                    &:hover {
                        background: #444;
                        scale: 1.1;
                    }
                }

                & svg {
                    width: 100%;
                    height: 100%;
                }
            }

            #selector-items {
                border: 1px solid #666;
                width: 100%;
                height: 100px;
                margin-bottom: 100px;
                display: flex;
                flex-wrap: wrap;

                &.drag-files {
                    background: #555;
                    border-style: dashed;
                }
            }

            .item-image {
                width: 50px;
                height: 50px;
                object-fit: cover;
                background: #fff;
                cursor: grab;

                &.drag-preview {
                    opacity: 0.5;
                    pointer-events: none;
                }
            }
        </style>

        <script type="module">
            const $ = (el) => document.querySelector(el) // Helper function to select elements
            const $$ = (el) => document.querySelectorAll(el) // Helper function to select multiple elements

            const imageInput = $('#image-input')
            const itemsSection = $('#selector-items')
            const resetButton = $('#reset-tier-button')
            const saveButton = $('#save-tier-button')

            function createItem(src) {
                const imgElement = document.createElement('img')
                imgElement.draggable = true
                imgElement.src = src
                imgElement.className = 'item-image'

                imgElement.addEventListener('dragstart', handleDragStart)
                imgElement.addEventListener('dragend', handleDragEnd)

                itemsSection.appendChild(imgElement)
                return imgElement
            }

            function useFilesToCreateItems(files) {
                if (files && files.length > 0) {
                    Array.from(files).forEach((file) => {
                        const reader = new FileReader()

                        reader.onload = (eventReader) => {
                            createItem(eventReader.target.result)
                        }

                        reader.readAsDataURL(file)
                    })
                }
            }

            imageInput.addEventListener('change', (event) => {
                const { files } = event.target
                useFilesToCreateItems(files)
            })

            let draggedElement = null
            let sourceContainer = null

            const rows = $$('.tier .row')

            rows.forEach((row) => {
                row.addEventListener('dragover', handleDragOver)
                row.addEventListener('drop', handleDrop)
                row.addEventListener('dragleave', handleDragLeave)
            })

            itemsSection.addEventListener('dragover', handleDragOver)
            itemsSection.addEventListener('drop', handleDrop)
            itemsSection.addEventListener('dragleave', handleDragLeave)

            itemsSection.addEventListener('drop', handleDropFromDesktop)
            itemsSection.addEventListener('dragover', handleDragOverFromDesktop)

            function handleDragOverFromDesktop(event) {
                event.preventDefault()

                const { currentTarget, dataTransfer } = event

                if (dataTransfer.types.includes('Files')) {
                    currentTarget.classList.add('drag-files')
                }
            }

            function handleDropFromDesktop(event) {
                event.preventDefault()
                const { currentTarget, dataTransfer } = event

                if (dataTransfer.types.includes('Files')) {
                    currentTarget.classList.remove('drag-files')
                    const { files } = dataTransfer
                    useFilesToCreateItems(files)
                }
            }

            function handleDrop(event) {
                event.preventDefault()

                const { currentTarget, dataTransfer } = event

                if (sourceContainer && draggedElement) {
                    sourceContainer.removeChild(draggedElement)
                }

                if (draggedElement) {
                    const src = dataTransfer.getData('text/plain')
                    const imgElement = createItem(src)
                    currentTarget.appendChild(imgElement)
                }

                currentTarget.classList.remove('drag-over')
                currentTarget.querySelector('.drag-preview')?.remove()
            }

            function handleDragOver(event) {
                event.preventDefault()

                const { currentTarget, dataTransfer } = event
                if (sourceContainer === currentTarget) return

                currentTarget.classList.add('drag-over')

                const dragPreview = document.querySelector('.drag-preview')

                if (draggedElement && !dragPreview) {
                    const previewElement = draggedElement.cloneNode(true)
                    previewElement.classList.add('drag-preview')
                    currentTarget.appendChild(previewElement)
                }
            }

            function handleDragLeave(event) {
                event.preventDefault()

                const { currentTarget } = event
                currentTarget.classList.remove('drag-over')
                currentTarget.querySelector('.drag-preview')?.remove()
            }

            function handleDragStart(event) {
                draggedElement = event.target
                sourceContainer = draggedElement.parentNode
                event.dataTransfer.setData('text/plain', draggedElement.src)
            }

            function handleDragEnd(event) {
                draggedElement = null
                sourceContainer = null
            }

            resetButton.addEventListener('click', () => {
                const items = $$('.tier .item-image')
                items.forEach((item) => {
                    item.remove()
                    itemsSection.appendChild(item)
                })
            })

            saveButton.addEventListener('click', () => {
                const tierContainer = $('.tier')
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')

                import('https://cdn.jsdelivr.net/npm/html2canvas-pro@1.5.8/+esm').then(({ default: html2canvas }) => {
                    html2canvas(tierContainer).then((canvas) => {
                        ctx.drawImage(canvas, 0, 0)
                        const imgURL = canvas.toDataURL('image/png')

                        const downloadLink = document.createElement('a')
                        downloadLink.download = 'tier.png'
                        downloadLink.href = imgURL
                        downloadLink.click()
                    })
                })
            })
        </script>
    </head>

    <body>
        <header id="top-header">
            <img src="https://tiermaker.com/images/tiermaker-logo.png" />
        </header>

        <section class="tier">
            <div class="row">
                <aside class="label" style="--level: var(--color-s)">
                    <span contenteditable="true">S</span>
                </aside>
            </div>

            <div class="row">
                <aside class="label" style="--level: var(--color-a)">
                    <span contenteditable="true">A</span>
                </aside>
            </div>

            <div class="row">
                <aside class="label" style="--level: var(--color-b)">
                    <span contenteditable="true">B</span>
                </aside>
            </div>

            <div class="row">
                <aside class="label" style="--level: var(--color-c)">
                    <span contenteditable="true">C</span>
                </aside>
            </div>

            <div class="row">
                <aside class="label" style="--level: var(--color-d)">
                    <span contenteditable="true">D</span>
                </aside>
            </div>

            <div class="row">
                <aside class="label" style="--level: var(--color-e)">
                    <span contenteditable="true">E</span>
                </aside>
            </div>
        </section>

        <footer id="selector">
            <section id="selector-buttons">
                <label>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M9 12h6" />
                        <path d="M12 9v6" />
                    </svg>
                    <input multiple accept="image/*" id="image-input" type="file" hidden />
                </label>

                <button id="reset-tier-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>
                </button>

                <button id="save-tier-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                        <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M14 4l0 4l-6 0l0 -4" />
                    </svg>
                </button>
            </section>

            <section id="selector-items"></section>
        </footer>
    </body>
</html>
```
