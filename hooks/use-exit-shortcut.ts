import { useEffect, useState } from "react"

/**
 * Hook para detectar el sistema operativo y manejar el atajo de salida (cerrar pestaña)
 * Devuelve la combinación de teclas adecuada para mostrar en la UI
 */
export function useExitShortcut() {
	const [osKeyCombo, setOsKeyCombo] = useState<string>("")

	useEffect(() => {
		const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
		setOsKeyCombo(isMac ? '⌘ + W' : 'Ctrl + W')

		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				(isMac && e.metaKey && e.key.toLowerCase() === 'w') ||
				(!isMac && e.ctrlKey && e.key.toLowerCase() === 'w')
			) {
				e.preventDefault()
				window.close()
			}
			// Ctrl+C solo muestra mensaje, no puede cerrar pestaña
			if ((isMac && e.metaKey && e.key.toLowerCase() === 'c') || (!isMac && e.ctrlKey && e.key.toLowerCase() === 'c')) {
				alert('Para salir, usa ' + (isMac ? '⌘ + W' : 'Ctrl + W'))
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

	return osKeyCombo
} 