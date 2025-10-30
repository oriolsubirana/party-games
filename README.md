# 🎮 Party Games - MVP

Una aplicación móvil de juegos sociales desarrollada con React Native y Expo, diseñada para que los jugadores puedan disfrutar de juegos de mesa directamente en sus dispositivos móviles.

## 🎯 Características del MVP

### Juego Incluido: "El Impostor" (Undercover)

- **Mecánica**: Los jugadores reciben palabras secretas similares
- **Objetivo**: Los civiles deben descubrir a los impostores, los impostores deben pasar desapercibidos
- **Jugadores**: 3-12 jugadores
- **Impostores**: 1-2 jugadores por partida

### Flujo de Juego Completo

1. **Pantalla de Inicio** - Crear nueva partida
2. **Configuración** - Seleccionar número de jugadores e impostores
3. **Asignación de Palabras** - Los jugadores ven sus palabras secretas por turnos
4. **Explicación de Reglas** - Repaso de cómo jugar
5. **Votación** - Los jugadores votan quién creen que es el impostor
6. **Resultados** - Muestra quién ganó y revela todos los roles

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI (`npm install -g @expo/cli`)

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd party-games

# Instalar dependencias
npm install

# Iniciar la aplicación
npx expo start
```

### Ejecutar en Dispositivo

1. Instalar la app Expo Go en tu dispositivo móvil
2. Escanear el código QR que aparece en la terminal
3. ¡Disfrutar del juego!

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── Button.tsx      # Botón personalizable
│   ├── GameNavigator.tsx # Navegación entre pantallas
│   ├── ProgressBar.tsx # Barra de progreso
│   └── GameStats.tsx   # Estadísticas del juego
├── screens/            # Pantallas de la aplicación
│   ├── HomeScreen.tsx  # Pantalla principal
│   ├── GameSetupScreen.tsx # Configuración de partida
│   ├── WordAssignmentScreen.tsx # Asignación de palabras
│   ├── GameRulesScreen.tsx # Reglas del juego
│   ├── VotingScreen.tsx # Pantalla de votación
│   └── GameResultsScreen.tsx # Resultados finales
├── store/              # Estado global (Zustand)
│   └── gameStore.ts    # Lógica del juego
├── types/              # Tipos TypeScript
│   └── index.ts        # Interfaces y tipos
└── data/               # Datos del juego
    └── words.ts        # Pares de palabras y juegos
```

### Tecnologías Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **Zustand** - Gestión de estado
- **React Native StyleSheet** - Estilos nativos

## 🎲 Cómo Jugar

### 1. Crear Partida

- Selecciona el número de jugadores (3-12)
- Elige el número de impostores (1-2)
- Inicia la partida

### 2. Asignación de Palabras

- Los jugadores se turnan para ver sus palabras secretas
- Cada uno ve su palabra y rol (civil o impostor)
- Las palabras se asignan automáticamente

### 3. Juego

- Los jugadores describen sus palabras sin decirlas directamente
- Los civiles intentan identificar a los impostores
- Los impostores intentan pasar desapercibidos

### 4. Votación

- Todos votan quién creen que es el impostor
- El jugador con más votos es eliminado

### 5. Resultado

- Si se elimina a un civil, ganan los impostores
- Si se elimina a un impostor, ganan los civiles

## 🔧 Personalización

### Añadir Nuevas Palabras

Edita `src/data/words.ts` para añadir nuevos pares de palabras:

```typescript
export const wordPairs: WordPair[] = [
  { civil: 'nueva-palabra', impostor: 'palabra-similar', category: 'categoría' },
  // ... más palabras
];
```

### Añadir Nuevos Juegos

Extiende la interfaz `Game` y añade nuevos juegos al array:

```typescript
export const games: Game[] = [
  // ... juegos existentes
  {
    id: 'nuevo-juego',
    name: 'Nombre del Juego',
    description: 'Descripción del juego',
    minPlayers: 4,
    maxPlayers: 8,
  },
];
```

## 🚀 Próximas Funcionalidades

### Funcionalidades Planificadas

- [ ] Múltiples juegos (Spyfall, Mafia, Charadas)
- [ ] Modo rápido con configuración automática
- [ ] Packs de palabras temáticos
- [ ] Historial de partidas
- [ ] Estadísticas de jugadores
- [ ] Modo multijugador online

### Mejoras Técnicas

- [ ] Animaciones con Framer Motion
- [ ] Persistencia local de datos
- [ ] Notificaciones push
- [ ] Temas personalizables
- [ ] Soporte para múltiples idiomas

## 🤝 Contribuir

### Cómo Contribuir

1. Fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

### Estándares de Código

- Usa TypeScript para todo el código
- Sigue las convenciones de React Native
- Mantén los componentes pequeños y reutilizables
- Añade comentarios para lógica compleja
- Escribe tests para nuevas funcionalidades

## 📱 Compatibilidad

### Dispositivos Soportados

- **iOS**: iOS 12.0 o superior
- **Android**: Android 5.0 (API 21) o superior
- **Expo**: Versión 48 o superior

### Plataformas

- ✅ iOS (iPhone/iPad)
- ✅ Android (teléfonos/tablets)
- ❌ Web (no soportado en esta versión)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

### Problemas Comunes

- **La app no inicia**: Verifica que tienes Node.js 16+ y Expo CLI instalado
- **Error de dependencias**: Ejecuta `npm install` y reinicia
- **Problemas en dispositivo**: Asegúrate de tener la última versión de Expo Go

### Contacto

Para reportar bugs o solicitar nuevas funcionalidades, crea un issue en GitHub.

---

**¡Disfruta jugando con tus amigos! 🎉**
