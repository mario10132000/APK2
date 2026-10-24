# Lector et Auditor · Android (APK)

WebView nativo que empaqueta la app web (versión 0.24.0) en `app/src/main/assets/www`.

## Cómo obtener el APK

### Opción A · Android Studio (la más simple)
1. Instala Android Studio (incluye JDK y SDK).
2. File ▸ Open ▸ elige esta carpeta y espera la sincronización de Gradle.
3. Build ▸ Build Bundle(s) / APK(s) ▸ **Build APK(s)** con la variante *release*.
4. El archivo queda en `app/build/outputs/apk/release/app-release.apk`.

### Opción B · GitHub Actions (sin instalar nada)
1. Crea un repositorio **privado** en GitHub y sube esta carpeta (incluye el keystore).
2. Pestaña *Actions* ▸ «Compilar APK» ▸ *Run workflow*.
3. Descarga el APK desde *Artifacts* al terminar.

### Opción C · Consola
Con JDK 17, Android SDK (platform 34) y Gradle 8.7: `gradle assembleRelease`.

## Instalar en el teléfono
Copia el APK al teléfono, ábrelo y permite «instalar apps desconocidas» para tu gestor de archivos.
O por USB: `adb install app-release.apk`.

## Firma
`keystore/lea-release.jks` + `keystore.properties` firman el APK. **Guárdalos y no los compartas**:
con la misma firma podrás actualizar la app sin perder datos; con otra firma Android pedirá desinstalar la anterior.

## Notas de funcionamiento
- Tus datos se guardan en el almacenamiento local de la app (origen fijo `appassets.androidplatform.net`). Desinstalar la app los borra: usa Exportar para respaldarlos.
- Exportar abre el selector de Android para elegir dónde guardar; Importar usa el selector de archivos del sistema.
- Imprimir usa el servicio de impresión de Android (permite «Guardar como PDF»).
- Pantalla completa: botón de la cabecera o del editor; se recuerda al reabrir la app. Desliza desde el borde para ver las barras del sistema.
- La sincronización en la nube y las tipografías de Google necesitan conexión.
- Requiere Android 7.0 (API 24) o superior y un WebView actualizado.
