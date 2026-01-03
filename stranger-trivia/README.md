# 🎮 Trivia Stranger Things

Juego de trivia multijugador en tiempo real inspirado en Kahoot, con temática de Stranger Things, creado especialmente para la fiesta de cumpleaños de Romina.

## 🌟 Características

- **Multijugador en tiempo real** usando WebSockets (Socket.IO)
- **Dos modos de juego**: Individual y Equipos
- **Sistema de puntuación** con bonus por velocidad de respuesta
- **Interfaz temática** de Stranger Things con efectos visuales de los años 80
- **Optimizado para móviles** - los jugadores usan sus teléfonos
- **Pantalla principal** para TV/proyector mostrando preguntas y resultados
- **20 preguntas** apropiadas para niños de 9 años
- **Reconexión automática** en caso de pérdida de conexión
- **Código QR** para unirse fácilmente

## 📋 Requisitos

- **Node.js 18 o superior** instalado en tu computadora
- **Todos los dispositivos conectados a la misma red WiFi**
- **Una TV o proyector** para mostrar la pantalla principal
- **Teléfonos móviles** para los jugadores

## 🚀 Instalación

1. Navega a la carpeta del proyecto:
```bash
cd stranger-trivia
```

2. Instala las dependencias:
```bash
npm install
```

## ▶️ Cómo Ejecutar

1. Inicia el servidor:
```bash
npm start
```

2. El servidor mostrará información similar a esta:
```
==============================================
🎮 TRIVIA STRANGER THINGS - SERVIDOR ACTIVO 🎮
==============================================

📺 PANTALLA HOST (TV/Proyector):
   http://localhost:3000/host

📱 JUGADORES - Conectarse desde el teléfono:
   http://192.168.1.100:3000

📋 Generar QR Code para jugadores:
[QR Code aquí]

==============================================
¡Feliz Cumpleaños Romina! 🎂
==============================================
```

3. En la TV/Proyector, abre un navegador y ve a:
   - `http://localhost:3000/host`

4. Los jugadores pueden unirse de dos formas:
   - **Escanear el QR Code** mostrado en la pantalla del host
   - **Escribir manualmente** la URL mostrada (ej: `http://192.168.1.100:3000`)

## 🎯 Cómo Jugar

### Para el Host (Organizador)

1. **Pantalla de Lobby:**
   - Verás el QR Code y la URL para que los jugadores se conecten
   - Observa cómo se van uniendo los jugadores en tiempo real
   - Selecciona el modo de juego: Individual o Equipos
   - Presiona "Iniciar Juego" cuando todos estén listos (mínimo 2 jugadores)

2. **Durante el Juego:**
   - Se mostrarán 15 preguntas aleatorias de las 20 disponibles
   - Cada pregunta tiene 30 segundos para responder
   - Verás cuántos jugadores han respondido en tiempo real
   - Después de cada pregunta, se muestran:
     - La respuesta correcta
     - Estadísticas de respuestas
     - Scoreboard actualizado
   - Presiona "Siguiente Pregunta" para continuar

3. **Pantalla Final:**
   - Podio con los 3 primeros lugares
   - Ranking completo de todos los jugadores
   - Opciones: "Jugar de Nuevo" o "Volver al Lobby"

### Para los Jugadores

1. **Registro:**
   - Ingresa tu nombre
   - Si es modo equipos, selecciona un equipo
   - Presiona "Unirse al Juego"

2. **Esperando:**
   - Verás una pantalla de espera hasta que el host inicie el juego

3. **Respondiendo Preguntas:**
   - Lee la pregunta en la TV
   - Toca la opción A, B, C o D en tu teléfono
   - Responde rápido para ganar puntos extra
   - Después de responder, espera a que termine el tiempo

4. **Ver Resultados:**
   - Verás si acertaste o fallaste
   - Puntos ganados en esa pregunta
   - Tu puntaje total
   - Tu posición actual

5. **Final:**
   - Tu posición final y puntaje total
   - Mensaje personalizado según tu posición

## 🏆 Sistema de Puntuación

### Puntos por Respuesta Correcta
- **Base:** 1000 puntos
- **Bonus por Velocidad:**
  - Responder en 0-5 segundos: +500 puntos
  - Responder en 6-10 segundos: +300 puntos
  - Responder en 11-15 segundos: +100 puntos
  - Responder en 16-30 segundos: +0 puntos extra

### Respuestas Incorrectas
- 0 puntos (sin penalización)

### Modo Equipos
- El puntaje del equipo es la suma de todos sus miembros
- Todos los miembros pueden responder individualmente

## 🎨 Equipos Disponibles

Cuando se selecciona el modo "Equipos", los jugadores pueden elegir entre:

- 🧟 **Los Demogorgons**
- ⚡ **Eleven's Squad**
- 🎮 **Hawkins Heroes**
- 👾 **The Mind Flayers**

## 🛠️ Solución de Problemas

### Los teléfonos no se conectan

1. **Verifica que todos estén en la misma red WiFi**
2. **Firewall de Windows:** Si usas Windows, puede que necesites permitir el puerto 3000:
   ```bash
   netsh advfirewall firewall add rule name="Trivia" dir=in action=allow protocol=TCP localport=3000
   ```
3. **Firewall de Mac:** Ve a Preferencias del Sistema > Seguridad y Privacidad > Firewall > Opciones de Firewall
4. **Intenta con la IP mostrada:** Si hay múltiples IPs, prueba con cada una

### El servidor no muestra la IP correcta

- Asegúrate de estar conectado a WiFi (no usar cable ethernet solo)
- Si ves `127.0.0.1` o `localhost`, verifica tu conexión de red

### Lag o conexión lenta

- Reduce la cantidad de jugadores si es necesario
- Asegúrate de tener buena señal WiFi
- Acerca el router a la zona de juego

### Un jugador se desconecta

- El juego intentará reconectar automáticamente
- Si no reconecta, puede cerrar y abrir el navegador
- Como último recurso, puede volver a unirse con el mismo nombre

## 📱 Compatibilidad

### Navegadores Compatibles
- ✅ Chrome (recomendado)
- ✅ Safari
- ✅ Firefox
- ✅ Edge

### Dispositivos
- ✅ iPhone/iPad (iOS 12+)
- ✅ Android (versión 7+)
- ✅ Computadoras/Laptops
- ✅ Tablets

## 🎮 Características Técnicas

### Arquitectura
- **Backend:** Node.js + Express
- **Comunicación en Tiempo Real:** Socket.IO (WebSockets)
- **Frontend:** HTML5 + CSS3 + JavaScript Vanilla
- **Sin base de datos:** Estado en memoria (suficiente para una fiesta)

### Seguridad
- Validación de inputs para prevenir XSS
- El servidor nunca envía la respuesta correcta hasta que termina el tiempo
- Validación de timestamps para prevenir trampas

## 📝 Personalización

### Cambiar las Preguntas

Edita el archivo `game/questions.js` para agregar, modificar o eliminar preguntas. Cada pregunta tiene esta estructura:

```javascript
{
  id: 1,
  question: "¿Pregunta aquí?",
  options: [
    { id: "A", text: "Opción A" },
    { id: "B", text: "Opción B" },
    { id: "C", text: "Opción C" },
    { id: "D", text: "Opción D" }
  ],
  correctAnswer: "A",
  difficulty: "easy",
  category: "personajes"
}
```

### Cambiar el Puerto

Si el puerto 3000 está ocupado, puedes cambiarlo:

```bash
PORT=4000 npm start
```

### Cambiar Duración de Preguntas

En `server.js`, busca la línea:
```javascript
const QUESTION_DURATION = 30000; // 30 segundos
```

Y cámbialo al tiempo deseado en milisegundos.

## 🎉 Créditos

Creado con ❤️ para la fiesta de cumpleaños de Romina.

Inspirado en Kahoot y Stranger Things.

## 📄 Licencia

MIT License - Libre para usar y modificar.

---

## 🆘 Soporte

Si encuentras algún problema:

1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que las dependencias estén instaladas: `npm install`
3. Revisa los logs en la consola del servidor
4. Asegúrate de que todos estén en la misma red WiFi

---

**¡Diviértete y que gane el mejor! 🎮🎂**
