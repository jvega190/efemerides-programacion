"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Code, Terminal, Clock } from "lucide-react"

const ephemerides = [
  {
    date: "1 de enero",
    year: "1970",
    event:
      "Se establece la época Unix (Unix Epoch) - el tiempo 0 en sistemas Unix, marcando el inicio del tiempo computacional moderno.",
    category: "Historia",
  },
  {
    date: "2 de enero",
    year: "1975",
    event:
      "Bill Gates y Paul Allen fundan Microsoft en Albuquerque, Nuevo México, comenzando con el desarrollo de BASIC para Altair 8800.",
    category: "Empresas",
  },
  {
    date: "3 de enero",
    year: "1977",
    event: "Apple Computer se incorpora oficialmente como empresa, tres días después del lanzamiento del Apple II.",
    category: "Hardware",
  },
  {
    date: "4 de enero",
    year: "1999",
    event: "Se lanza la primera versión beta de Mozilla, el navegador web de código abierto que precedió a Firefox.",
    category: "Software",
  },
  {
    date: "5 de enero",
    year: "1991",
    event:
      "Linus Torvalds comienza a trabajar en lo que se convertiría en el kernel de Linux en la Universidad de Helsinki.",
    category: "Open Source",
  },
  {
    date: "6 de enero",
    year: "1982",
    event:
      "Commodore lanza la computadora Commodore 64, que se convertiría en la computadora personal más vendida de todos los tiempos.",
    category: "Hardware",
  },
  {
    date: "7 de enero",
    year: "2007",
    event: "Steve Jobs presenta el primer iPhone en la Macworld Conference & Expo, revolucionando la industria móvil.",
    category: "Móvil",
  },
]

export default function ProgrammingEphemeris() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [osKeyCombo, setOsKeyCombo] = useState<string>("")

  // Obtener efeméride del día (simulado con el día actual)
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
  )
  const todayEphemeris = ephemerides[dayOfYear % ephemerides.length]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fullText = `> Efeméride del día: ${todayEphemeris.date} de ${todayEphemeris.year}\n\n${todayEphemeris.event}\n\nCategoría: ${todayEphemeris.category}`
    let index = 0

    const typeWriter = () => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
        setTimeout(typeWriter, 30)
      } else {
        setIsTyping(false)
      }
    }

    setTimeout(typeWriter, 1000)
  }, [todayEphemeris])

  useEffect(() => {
    // Detectar sistema operativo y definir combinación
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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gradiente animado de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-blue-500/10 to-purple-500/20 animate-pulse" />
        <div
          className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 via-transparent to-green-500/10 animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        />
      </div>

      {/* Efectos de blur flotantes */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header de terminal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-green-500/30 bg-black/50 backdrop-blur-sm"
        >
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-mono text-sm">programming-ephemeris@terminal:~$</span>
            </div>
            <div className="flex items-center space-x-4 text-green-400/70 font-mono text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contenido principal */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl w-full bg-black/30 backdrop-blur-md border border-green-500/20 rounded-lg p-8 shadow-2xl"
          >
            <div className="space-y-6">
              {/* Título */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-3 mb-8"
              >
                <Code className="w-8 h-8 text-green-400" />
                <h1 className="text-2xl font-mono text-green-400 font-bold">Programming Ephemeris</h1>
              </motion.div>

              {/* Terminal output */}
              <div className="bg-black/50 rounded-lg p-6 border border-green-500/20">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="font-mono text-green-400 text-lg leading-relaxed whitespace-pre-wrap">
                  {displayText}
                  {isTyping && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                      className="text-green-400"
                    >
                      ▋
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Footer info */}
              <AnimatePresence>
                {!isTyping && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <p className="text-green-400/60 font-mono text-sm">
                      Una nueva efeméride cada día • Presiona F5 para actualizar
                    </p>
                    <p className="text-green-400/60 font-mono text-xs mt-2">
                      Presiona <span className="font-bold">{osKeyCombo}</span> para salir
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t border-green-500/30 bg-black/50 backdrop-blur-sm"
        >
          <div className="max-w-4xl mx-auto px-6 py-2 text-center">
            <p className="text-green-400/70 font-mono text-xs">© 2025 ToteDev</p>
          </div>
        </motion.footer>
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border-t border-green-500/30 bg-black/50 backdrop-blur-sm"
        >
          <div className="max-w-4xl mx-auto px-6 py-4 text-center">
            <p className="text-green-400/50 font-mono text-xs">Desarrollado con ❤️ para la comunidad de programadores</p>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
