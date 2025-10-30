# 🚀 Guía para Subir el Proyecto a GitHub

## Pasos para Subir el Código a GitHub

### 1. Crear el Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Configura el repositorio:
   - **Repository name**: `party-games` (o el nombre que prefieras)
   - **Description**: "🎮 Aplicación móvil de juegos sociales con React Native y Expo"
   - **Visibilidad**: Público o Privado (según prefieras)
   - **NO marques** "Add a README file" (ya lo tenemos)
   - **NO marques** "Add .gitignore" (ya lo tenemos)
   - **NO marques** "Choose a license" (por ahora)
5. Haz clic en **"Create repository"**

### 2. Conectar el Repositorio Local con GitHub

Ejecuta los siguientes comandos en tu terminal (reemplaza `<tu-usuario>` con tu nombre de usuario de GitHub):

```bash
cd /Users/oriolsubiranaperdiguer/workspace/party-games

# Añadir el repositorio remoto
git remote add origin https://github.com/<tu-usuario>/party-games.git

# O si prefieres usar SSH:
# git remote add origin git@github.com:<tu-usuario>/party-games.git
```

### 3. Subir el Código

```bash
# Subir el código a la rama main
git push -u origin main
```

Si GitHub te pide autenticación:

- **HTTPS**: Usa un Personal Access Token (no tu contraseña)
- **SSH**: Asegúrate de tener tu clave SSH configurada en GitHub

### 4. Verificar

Ve a tu repositorio en GitHub y verifica que todos los archivos estén subidos correctamente.

## 🔐 Nota sobre Autenticación

### Si usas HTTPS

GitHub ya no acepta contraseñas. Necesitas crear un **Personal Access Token**:

1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Genera un nuevo token con permisos `repo`
3. Usa este token como contraseña cuando Git te lo pida

### Si usas SSH

Asegúrate de tener tu clave SSH añadida en GitHub:

1. GitHub → Settings → SSH and GPG keys
2. Añade tu clave pública SSH si no la tienes ya

## ✅ Estado Actual

- ✅ Todos los archivos están commiteados
- ✅ README.md completo con documentación
- ✅ .gitignore configurado correctamente
- ✅ Commit inicial creado: "Initial commit: Party Games MVP with El Impostor game"
- ⏳ Falta añadir el remoto y hacer push

## 📝 Comandos Resumen

```bash
# Añadir remoto
git remote add origin https://github.com/<tu-usuario>/party-games.git

# Subir código
git push -u origin main

# Verificar remotos
git remote -v
```
