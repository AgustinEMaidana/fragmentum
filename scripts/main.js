// Función global para sumar sobres desde cualquier página
window.sumarSobres = function(n) {
    let sobres = parseInt(localStorage.getItem('sobres') || '0', 10);
    sobres += n;
    localStorage.setItem('sobres', sobres);
};

// Función global para obtener el idioma actual
window.getLang = function() {
    return localStorage.getItem('language') || 'es';
};

// Función global para cambiar el idioma
window.cambiarIdioma = function(nuevoIdioma) {
    localStorage.setItem('language', nuevoIdioma);
    aplicarIdioma(nuevoIdioma);
};

// Función para aplicar idioma a la página actual
function aplicarIdioma(idioma) {
    const textos = idiomas[idioma] || idiomas.es;
    
    // Cambiar textos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(elemento => {
        const clave = elemento.getAttribute('data-i18n');
        if (textos[clave]) {
            elemento.textContent = textos[clave];
        }
    });
    
    // Cambiar placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(elemento => {
        const clave = elemento.getAttribute('data-i18n-placeholder');
        if (textos[clave]) {
            elemento.placeholder = textos[clave];
        }
    });
    
    // Actualizar selector de idiomas si existe
    actualizarSelectorIdiomas(idioma);
}

// Función para actualizar el selector de idiomas
function actualizarSelectorIdiomas(idioma) {
    const idiomaSelect = document.getElementById('idioma');
    if (!idiomaSelect) return;
    
    const opciones = idiomaSelect.querySelectorAll('option');
    if (opciones.length >= 2) {
        // Siempre mostrar "Idioma: Español" para la opción español
        // y "Language: English" para la opción inglés
        opciones[0].textContent = 'Idioma: Español';
        opciones[1].textContent = 'Language: English';
    }
}

// Cargar idioma guardado al iniciar cada página
document.addEventListener('DOMContentLoaded', function() {
    const idiomaGuardado = localStorage.getItem('language') || 'es';
    aplicarIdioma(idiomaGuardado);
    
    // Configurar el selector de idioma si existe
    const selectorIdioma = document.getElementById('idioma');
    if (selectorIdioma) {
        selectorIdioma.value = idiomaGuardado;
        selectorIdioma.addEventListener('change', function() {
            cambiarIdioma(this.value);
        });
    }
});

// Sistema de cambio de idioma
const idiomas = {
    es: {
        // Configuración
        "configuracion": "Configuración",
        "cambiarNombre": "Cambiar Nombre",
        "cambiarContraseña": "Cambiar Contraseña",
        "politicaPrivacidad": "Política de Privacidad",
        "ayuda": "Ayuda",
        "cerrarSesion": "Cerrar Sesión",
        "volver": "Volver",
        "idioma": "Idioma: Español",
        "idiomaIngles": "Language: English",
        "estiloMixto": "🎲 Estilo Visual: Mixto",
        "estiloPizza": "🍕 Estilo Visual: Pizza",
        "estiloBarras": "📊 Estilo Visual: Barras",
        "nuevoNombre": "Nuevo nombre",
        "nuevaContraseña": "Nueva contraseña",
        "guardar": "Guardar",
        "nombreGuardado": "Nombre guardado",
        "contraseñaGuardada": "Contraseña guardada.",
        "seguroCerrarSesion": "¿Seguro que quieres cerrar sesión?",
        
        // Index/Login
        "iniciarSesion": "Iniciar Sesión",
        "nombre": "Nombre",
        "email": "Email",
        "contraseña": "Contraseña",
        "noTienesCuenta": "¿No tenes una cuenta?",
        "registrarse": "Registrarse",
        
        // Registro
        "registrarseTitle": "Registrarse",
        "correoElectronico": "Correo Electronico",
        "confirmarContraseña": "Confirmar Contraseña",
        "iniciar": "Iniciar",
        "yaTienesCuenta": "¿Ya tenes una cuenta?",
        
        // Menú
        "fragmentumMenu": "Fragmentum - Menú",
        "usuario": "Usuario",
        "jugar": "Iniciar Juego",
        "album": "Álbum",
        
        // Niveles
        "niveles": "Niveles",
        "nivel": "Nivel",
        
        // Logros
        "logros": "Logros",
        "reclamado": "¡Reclamado!",
        
        // Álbum
        "albumFragmentum": "Álbum Fragmentum",
        "sobresDisponibles": "Sobres disponibles:",
        "abrirSobre": "Abrir sobre (x3)",
        
        // Game Controller
        "seleccionarNivel": "Selecciona un nivel",
        "volverMenu": "Volver al menú",
        "eligeModo": "Elige tu modo de juego",
        "modoCampana": "Modo Campaña",
        "modoSupervivencia": "Modo Supervivencia",
        "descCampana": "Completa niveles progresivos y desbloquea recompensas",
        "descSupervivencia": "Desafío infinito con dificultad creciente. ¡Sobrevive el mayor tiempo posible!",
        "jugarCampana": "Jugar Campaña",
        "jugarSupervivencia": "Jugar Supervivencia",
        "volverModos": "Volver a modos",
        
        // Perfil
        "perfilUsuario": "Perfil de Usuario",
        "puntos": "Puntos",
        "experiencia": "Experiencia",
        "editarNombre": "Editar Nombre",
        "editarEmail": "Editar Email",
        "editar": "Editar"
    },
    en: {
        // Configuration
        "configuracion": "Settings",
        "cambiarNombre": "Change Name",
        "cambiarContraseña": "Change Password",
        "politicaPrivacidad": "Privacy Policy",
        "ayuda": "Help",
        "cerrarSesion": "Log Out",
        "volver": "Back",
        "idioma": "Language: English",
        "idiomaEspanol": "Idioma: Español",
        "estiloMixto": "🎲 Visual Style: Mixed",
        "estiloPizza": "🍕 Visual Style: Pizza",
        "estiloBarras": "📊 Visual Style: Bars",
        "nuevoNombre": "New name",
        "nuevaContraseña": "New password",
        "guardar": "Save",
        "nombreGuardado": "Name saved",
        "contraseñaGuardada": "Password saved.",
        "seguroCerrarSesion": "Are you sure you want to log out?",
        
        // Index/Login
        "iniciarSesion": "Login",
        "nombre": "Name",
        "email": "Email",
        "contraseña": "Password",
        "noTienesCuenta": "Don't have an account?",
        "registrarse": "Sign Up",
        
        // Register
        "registrarseTitle": "Sign Up",
        "correoElectronico": "Email",
        "confirmarContraseña": "Confirm Password",
        "iniciar": "Start",
        "yaTienesCuenta": "Already have an account?",
        
        // Menu
        "fragmentumMenu": "Fragmentum - Menu",
        "usuario": "User",
        "jugar": "Start Game",
        "album": "Album",
        
        // Levels
        "niveles": "Levels",
        "nivel": "Level",
        
        // Achievements
        "logros": "Achievements",
        "reclamado": "Claimed!",
        
        // Album
        "albumFragmentum": "Fragmentum Album",
        "sobresDisponibles": "Available packs:",
        "abrirSobre": "Open pack (x3)",
        
        // Game Controller
        "seleccionarNivel": "Select a level",
        "volverMenu": "Back to menu",
        "eligeModo": "Choose your game mode",
        "modoCampana": "Campaign Mode",
        "modoSupervivencia": "Survival Mode",
        "descCampana": "Complete progressive levels and unlock rewards",
        "descSupervivencia": "Infinite challenge with increasing difficulty. Survive as long as possible!",
        "jugarCampana": "Play Campaign",
        "jugarSupervivencia": "Play Survival",
        "volverModos": "Back to modes",
        
        // Profile
        "perfilUsuario": "User Profile",
        "puntos": "Points",
        "experiencia": "Experience",
        "editarNombre": "Edit Name",
        "editarEmail": "Edit Email",
        "editar": "Edit"
    }
};

// Código JavaScript en main.js
var sound = new Audio();
sound.src = "sonidos/sonido.mp3";

// Sistema de música de fondo - SOLO usa la carpeta musica/
// Para agregar más canciones, añade el archivo a la carpeta musica/ y agrega las rutas aquí:
var playlist = [
    'musica/cancion1.mp3',
    'musica/cancion2.mp3',
    'musica/cancion3.mp3'   // Puedes agregar más canciones aquí
];
var nombresCanciones = [
    'Canción 1',
    'Canción 2', 
    'Canción 3'             // Y sus nombres aquí
];
var cancionActual = 0;
var musicaFondo = new Audio();
musicaFondo.volume = 0.5;
musicaFondo.loop = false;

// Event listener simple para cuando termina una canción
musicaFondo.addEventListener('ended', function() {
    console.log('Canción terminada, pasando a la siguiente...');
    siguienteCancion();
});

// Event listener para errores de carga
musicaFondo.addEventListener('error', function() {
    console.log('❌ Error cargando canción:', playlist[cancionActual]);
    // Intentar con la siguiente canción
    if (playlist.length > 1) {
        siguienteCancion();
    }
});

// Función para cargar y reproducir una canción
function cargarCancion(indice) {
    if (indice >= 0 && indice < playlist.length) {
        console.log('Cargando canción:', playlist[indice]);
        
        // Pausar música actual si está reproduciéndose
        if (!musicaFondo.paused) {
            musicaFondo.pause();
        }
        
        // Configurar nueva canción
        musicaFondo.src = playlist[indice];
        cancionActual = indice;
        
        // Restaurar tiempo guardado de forma inteligente
        var tiempoGuardado = localStorage.getItem('musicaTiempo_' + indice);
        if (tiempoGuardado && parseFloat(tiempoGuardado) > 0) {
            var tiempo = parseFloat(tiempoGuardado);
            // Solo restaurar si el tiempo es razonable (no muy cerca del final)
            // Asumimos que las canciones duran al menos 30 segundos
            if (tiempo < 300) { // Máximo 5 minutos, ajusta según tus canciones
                musicaFondo.currentTime = tiempo;
                console.log('✅ Restaurando tiempo guardado:', tiempo.toFixed(2) + 's');
            } else {
                musicaFondo.currentTime = 0;
                console.log('⚠️ Tiempo guardado muy largo, iniciando desde el principio');
            }
        } else {
            musicaFondo.currentTime = 0;
            console.log('🆕 Iniciando canción desde el principio');
        }
        
        // Actualizar el nombre de la canción en el UI
        actualizarNombreCancion();
        
        console.log('Canción cargada, lista para reproducir');
    }
}

// Función para siguiente canción
function siguienteCancion() {
    console.log('Cambiando a siguiente canción');
    cancionActual = (cancionActual + 1) % playlist.length;
    cargarCancion(cancionActual);
    
    // Reproducir directamente
    musicaFondo.play().then(function() {
        console.log('Siguiente canción reproduciéndose');
    }).catch(function(error) {
        console.log('Error al reproducir siguiente canción:', error);
    });
}

// Función para canción anterior
function cancionAnterior() {
    console.log('Cambiando a canción anterior');
    cancionActual = (cancionActual - 1 + playlist.length) % playlist.length;
    cargarCancion(cancionActual);
    
    // Reproducir directamente
    musicaFondo.play().then(function() {
        console.log('Canción anterior reproduciéndose');
    }).catch(function(error) {
        console.log('Error al reproducir canción anterior:', error);
    });
}

// Función para actualizar el nombre de la canción en el UI
function actualizarNombreCancion() {
    var cancionLabel = document.getElementById('cancionActualLabel');
    var contadorCanciones = document.getElementById('contadorCanciones');
    
    if (cancionLabel) {
        cancionLabel.textContent = nombresCanciones[cancionActual] || 'Canción ' + (cancionActual + 1);
    }
    
    if (contadorCanciones) {
        contadorCanciones.textContent = `${cancionActual + 1} / ${playlist.length}`;
    }
}

// Guardar el tiempo actual antes de salir de la página
window.addEventListener('beforeunload', function() {
    guardarTiempoActual();
});

// También guardar cuando se oculta la página (cambio de pestaña o navegación)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        guardarTiempoActual();
    }
});

// Función para guardar el tiempo actual de forma inteligente
function guardarTiempoActual() {
    // Solo guardar si la música está reproduciéndose y no está muy cerca del final
    if (!musicaFondo.paused && musicaFondo.currentTime > 5) {
        // Solo guardar si no estamos muy cerca del final (últimos 10 segundos)
        var tiempoRestante = musicaFondo.duration - musicaFondo.currentTime;
        if (tiempoRestante > 10 || isNaN(tiempoRestante)) {
            localStorage.setItem('musicaTiempo_' + cancionActual, musicaFondo.currentTime);
            console.log('💾 Guardando tiempo:', musicaFondo.currentTime.toFixed(2) + 's');
        } else {
            // Si estamos cerca del final, no guardar nada (empezará desde el principio)
            localStorage.removeItem('musicaTiempo_' + cancionActual);
            console.log('🔄 Cerca del final, no guardando tiempo');
        }
    }
}

// Inicializar la primera canción al cargar
console.log('Inicializando música...');

// LIMPIAR SOLO DATOS PROBLEMÁTICOS (tiempos muy largos)
console.log('Verificando tiempos guardados...');
for (let i = 0; i < playlist.length; i++) {
    var tiempoGuardado = localStorage.getItem('musicaTiempo_' + i);
    if (tiempoGuardado && parseFloat(tiempoGuardado) > 300) { // Más de 5 minutos
        localStorage.removeItem('musicaTiempo_' + i);
        console.log('🧹 Eliminado tiempo problemático para canción', i + 1);
    }
}

cargarCancion(0);

document.addEventListener('DOMContentLoaded', function() {
    // Crear el control de música dinámicamente
    if (!document.getElementById('controlMusica')) {
        var controlDiv = document.createElement('div');
        controlDiv.id = 'controlMusica';
        controlDiv.style.position = 'fixed';
        controlDiv.style.bottom = '20px';
        controlDiv.style.right = '20px';
        controlDiv.style.zIndex = '1000';

        var btn = document.createElement('button');
        btn.id = 'muteBtn';
        btn.style.background = 'rgba(255,255,255,0.7)';
        btn.style.border = 'none';
        btn.style.borderRadius = '50%';
        btn.style.width = '48px';
        btn.style.height = '48px';
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';


    var icon = document.createElement('span');
    icon.id = 'iconoMute';
    icon.style.fontSize = '28px';
    icon.textContent = '🔊';
    btn.appendChild(icon);

        var opciones = document.createElement('div');
        opciones.id = 'opcionesMusica';
        opciones.style.display = 'none';
        opciones.style.flexDirection = 'column';
        opciones.style.alignItems = 'center';
        opciones.style.position = 'absolute';
        opciones.style.bottom = '60px';
        opciones.style.right = '0';
        opciones.style.background = 'rgba(255,255,255,0.95)';
        opciones.style.borderRadius = '12px';
        opciones.style.padding = '10px';
        opciones.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';

        // Mostrar canción actual
        var cancionLabel = document.createElement('div');
        cancionLabel.id = 'cancionActualLabel';
        cancionLabel.style.fontSize = '12px';
        cancionLabel.style.fontWeight = 'bold';
        cancionLabel.style.textAlign = 'center';
        cancionLabel.style.marginBottom = '8px';
        cancionLabel.style.color = '#333';
        opciones.appendChild(cancionLabel);
        
        // Contador de canciones
        var contadorCanciones = document.createElement('div');
        contadorCanciones.id = 'contadorCanciones';
        contadorCanciones.style.fontSize = '10px';
        contadorCanciones.style.color = '#666';
        contadorCanciones.style.textAlign = 'center';
        contadorCanciones.style.marginBottom = '8px';
        contadorCanciones.textContent = `1 / ${playlist.length}`;
        opciones.appendChild(contadorCanciones);

        var label = document.createElement('label');
        label.style.fontSize = '14px';
        label.textContent = 'Volumen';
        opciones.appendChild(label);

        var slider = document.createElement('input');
        slider.id = 'volumenMusica';
        slider.type = 'range';
        slider.min = '0';
        slider.max = '1';
        slider.step = '0.01';
        slider.value = '0.5';
        slider.style.width = '80px';
        opciones.appendChild(slider);

        // Controles de canción
        var controlesCanciones = document.createElement('div');
        controlesCanciones.style.display = 'flex';
        controlesCanciones.style.gap = '5px';
        controlesCanciones.style.marginTop = '8px';
        
        var btnAnterior = document.createElement('button');
        btnAnterior.id = 'btnAnterior';
        btnAnterior.textContent = '⏮';
        btnAnterior.style.background = 'rgba(0,0,0,0.08)';
        btnAnterior.style.border = 'none';
        btnAnterior.style.borderRadius = '50%';
        btnAnterior.style.width = '35px';
        btnAnterior.style.height = '35px';
        btnAnterior.style.display = 'flex';
        btnAnterior.style.alignItems = 'center';
        btnAnterior.style.justifyContent = 'center';
        btnAnterior.style.fontSize = '14px';
        btnAnterior.style.cursor = 'pointer';
        btnAnterior.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
        controlesCanciones.appendChild(btnAnterior);
        
        // Botón play/pause
        var btnPlayPause = document.createElement('button');
        btnPlayPause.id = 'btnPlayPause';
        btnPlayPause.textContent = '⏸️'; // Iniciar como pausa ya que la música arranca automáticamente
        btnPlayPause.style.background = 'rgba(0,0,0,0.08)';
        btnPlayPause.style.border = 'none';
        btnPlayPause.style.borderRadius = '50%';
        btnPlayPause.style.width = '35px';
        btnPlayPause.style.height = '35px';
        btnPlayPause.style.display = 'flex';
        btnPlayPause.style.alignItems = 'center';
        btnPlayPause.style.justifyContent = 'center';
        btnPlayPause.style.fontSize = '14px';
        btnPlayPause.style.cursor = 'pointer';
        btnPlayPause.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
        controlesCanciones.appendChild(btnPlayPause);
        
        var btnSiguiente = document.createElement('button');
        btnSiguiente.id = 'btnSiguiente';
        btnSiguiente.textContent = '⏭';
        btnSiguiente.style.background = 'rgba(0,0,0,0.08)';
        btnSiguiente.style.border = 'none';
        btnSiguiente.style.borderRadius = '50%';
        btnSiguiente.style.width = '35px';
        btnSiguiente.style.height = '35px';
        btnSiguiente.style.display = 'flex';
        btnSiguiente.style.alignItems = 'center';
        btnSiguiente.style.justifyContent = 'center';
        btnSiguiente.style.fontSize = '14px';
        btnSiguiente.style.cursor = 'pointer';
        btnSiguiente.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
        controlesCanciones.appendChild(btnSiguiente);
        
        opciones.appendChild(controlesCanciones);

        var muteBtnOpc = document.createElement('button');
        muteBtnOpc.id = 'muteBtnOpc';
        muteBtnOpc.textContent = 'Mutear';
    muteBtnOpc.style.marginTop = '8px';
    muteBtnOpc.style.background = 'rgba(0,0,0,0.08)';
    muteBtnOpc.style.border = 'none';
    muteBtnOpc.style.borderRadius = '50%';
    muteBtnOpc.style.width = '40px';
    muteBtnOpc.style.height = '40px';
    muteBtnOpc.style.display = 'flex';
    muteBtnOpc.style.alignItems = 'center';
    muteBtnOpc.style.justifyContent = 'center';
    muteBtnOpc.style.fontSize = '16px';
    muteBtnOpc.style.cursor = 'pointer';
    muteBtnOpc.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
        opciones.appendChild(muteBtnOpc);

        controlDiv.appendChild(btn);
        controlDiv.appendChild(opciones);
        document.body.appendChild(controlDiv);
    }

    // Lógica de interacción (solo una vez, sin repeticiones)
    var muteBtn = document.getElementById('muteBtn');
    var iconoMute = document.getElementById('iconoMute');
    var opcionesMusica = document.getElementById('opcionesMusica');
    var volumenMusica = document.getElementById('volumenMusica');
    var muteBtnOpc = document.getElementById('muteBtnOpc');
    var btnAnterior = document.getElementById('btnAnterior');
    var btnSiguiente = document.getElementById('btnSiguiente');
    var musicaMute = false;

    if (muteBtn && iconoMute && opcionesMusica && volumenMusica && muteBtnOpc) {
        opcionesMusica.style.display = 'none';
        muteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            opcionesMusica.style.display = opcionesMusica.style.display === 'none' ? 'flex' : 'none';
        });
        document.body.addEventListener('click', function() {
            opcionesMusica.style.display = 'none';
        });
        opcionesMusica.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        volumenMusica.addEventListener('input', function() {
            musicaFondo.volume = parseFloat(volumenMusica.value);
        });
        musicaFondo.addEventListener('volumechange', function() {
            volumenMusica.value = musicaFondo.volume;
        });
        muteBtnOpc.addEventListener('click', function() {
            musicaMute = !musicaMute;
            musicaFondo.muted = musicaMute;
            iconoMute.textContent = musicaMute ? '🔇' : '🔊';
            muteBtnOpc.textContent = musicaMute ? 'Desmutear' : 'Mutear';
        });
        
        // Event listeners para controles de canción
        if (btnAnterior) {
            btnAnterior.addEventListener('click', function() {
                cancionAnterior();
            });
        }
        
        // Event listener para botón play/pause
        if (btnPlayPause) {
            btnPlayPause.addEventListener('click', function() {
                if (musicaFondo.paused) {
                    musicaFondo.play().then(function() {
                        btnPlayPause.textContent = '⏸️';
                        console.log('Música reanudada');
                    }).catch(function(error) {
                        console.log('Error al reanudar música:', error);
                    });
                } else {
                    musicaFondo.pause();
                    btnPlayPause.textContent = '▶️';
                    console.log('Música pausada');
                }
            });
        }
        
        if (btnSiguiente) {
            btnSiguiente.addEventListener('click', function() {
                siguienteCancion();
            });
        }
        
        // Función para actualizar el botón play/pause según el estado
        function actualizarBotonPlayPause() {
            if (btnPlayPause) {
                btnPlayPause.textContent = musicaFondo.paused ? '▶️' : '⏸️';
            }
        }
        
        // Event listeners para cambios de estado del audio
        musicaFondo.addEventListener('play', actualizarBotonPlayPause);
        musicaFondo.addEventListener('pause', actualizarBotonPlayPause);
        musicaFondo.addEventListener('ended', actualizarBotonPlayPause);
    }
    
    // *** INICIALIZACIÓN SIMPLE DE MÚSICA ***
    console.log('Iniciando sistema de música...');
    
    // Esperar a que el DOM esté completamente cargado
    setTimeout(function() {
        console.log('Intentando reproducir música automáticamente...');
        musicaFondo.play().then(function() {
            console.log('✅ Música iniciada correctamente');
        }).catch(function(error) {
            console.log('❌ Autoplay bloqueado:', error.message);
            console.log('💡 Haz click en cualquier lugar para iniciar la música');
            
            // Listener simple para iniciar música al primer click
            var iniciarMusica = function() {
                console.log('👆 Click detectado, iniciando música...');
                musicaFondo.play().then(function() {
                    console.log('✅ Música iniciada tras click del usuario');
                }).catch(function(playError) {
                    console.log('❌ Error al iniciar música:', playError.message);
                });
                document.removeEventListener('click', iniciarMusica);
            };
            
            document.addEventListener('click', iniciarMusica);
        });
    }, 1000);
    // Botón Volver en configuracion.html
    var volverConfigBtn = document.getElementById('volverConfigBtn');
    if (volverConfigBtn) {
        volverConfigBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sound.play();
            setTimeout(function() {
                window.location.href = 'menu.html';
            }, 500);
        });
    }

    // Botón Volver en registrarse.html
    var volverRegistroBtn = document.getElementById('volverRegistroBtn');
    if (volverRegistroBtn) {
        volverRegistroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sound.play();
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 500);
        });
    }
    // Botón Volver en niveles.html
    var volverNivelesBtn = document.getElementById('volverNivelesBtn');
    if (volverNivelesBtn) {
        volverNivelesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sound.play();
            setTimeout(function() {
                window.location.href = 'menu.html';
            }, 500);
        });
    }
    // Sonido en todos los botones
    var botones = document.querySelectorAll('button');
    botones.forEach(function(boton) {
        boton.addEventListener('click', function(e) {
            sound.play();
        });
    });

    // Acciones especiales para botones que redirigen (si quieres mantener el retraso)
    var loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var nombre = document.querySelector('input[placeholder="Nombre"]');
            var pass = document.querySelector('input[placeholder="Contraseña"]');
            if (nombre && pass && nombre.value.trim() && pass.value.trim()) {
                sound.play();
                setTimeout(function() {
                    window.location.href = 'menu.html';
                }, 500);
            } else {
                alert('Por favor, completa ambos campos para iniciar sesión.');
            }
        });
    }
    var nivelesBtn = document.getElementById('nivelesBtn');
    if (nivelesBtn) {
        nivelesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sound.play();
            setTimeout(function() {
                window.location.href = 'niveles.html';
            }, 500);
        });
    }
    var jugarBtn = document.getElementById('jugarBtn');
    if (jugarBtn) {
        jugarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sound.play();
            setTimeout(function() {
                window.location.href = 'gameController.html';
            }, 500);
        });
    }
    var configBtn = document.getElementById('configBtn');
    if (configBtn) {
        configBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sound.play();
            setTimeout(function() {
                window.location.href = 'configuracion.html';
            }, 500);
        });
    }
    var logrosBtn = document.getElementById('logrosBtn');
    if (logrosBtn) {
        logrosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sound.play();
            setTimeout(function() {
                window.location.href = 'logros.html';
            }, 500);
        });
    }
    var albumBtn = document.getElementById('albumBtn');
    if (albumBtn) {
        albumBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sound.play();
            setTimeout(function() {
                window.location.href = 'album.html';
            }, 500);
        });
    }

    
    // Cargar perfil de usuario al cargar la página
    cargarPerfilUsuario();
});

// Fondo de números animado
const canvas = document.getElementById('fondoNumeros');
if (canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Numero {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = (Math.random() - 0.5) * 4;
            this.text = Math.floor(Math.random() * 10);
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.size = 20 + Math.random() * 20;
        }

        dibujar() {
            ctx.fillStyle = this.color;
            ctx.font = `${this.size}px DynaPuff`;
            ctx.fillText(this.text, this.x, this.y);
        }

        mover() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
    }

    const numeros = [];
    for (let i = 0; i < 30; i++) {
        numeros.push(new Numero());
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // limpia canvas cada frame
        numeros.forEach(n => {
            n.mover();
            n.dibujar();
        });
        requestAnimationFrame(animar);
    }

    animar();
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Sistema de experiencia (copiado de gameController.js para consistencia)
function getXPForLevel(level) {
    return level * 100;
}

function getUserTitle(level) {
    if (level >= 50) return 'Leyenda Matemática';
    if (level >= 30) return 'Maestro Supremo';
    if (level >= 20) return 'Experto Avanzado';
    if (level >= 10) return 'Matemático Hábil';
    if (level >= 5) return 'Aprendiz Dedicado';
    return 'Novato Prometedor';
}

// Funcionalidad del perfil de usuario
function cargarPerfilUsuario() {
    const profileName = document.getElementById('profileName');
    if (profileName) {
        // Inicializar datos de prueba si no hay datos guardados
        inicializarDatosPrueba();
        
        // Buscar el nombre en localStorage
        const nombreGuardado = localStorage.getItem('nombreUsuario');
        
        if (nombreGuardado && nombreGuardado.trim() !== '') {
            profileName.textContent = nombreGuardado;
        } else {
            profileName.textContent = 'Usuario';
        }
        
        // Hacer clickeable el perfil para abrir modal
        const userProfile = document.querySelector('.user-profile');
        if (userProfile) {
            userProfile.addEventListener('click', function() {
                abrirModalPerfil();
            });
        }
        
        // Cargar foto de perfil
        cargarFotoPerfil();
    }
}

// Función para abrir modal de perfil
function abrirModalPerfil() {
    const modal = document.getElementById('modalPerfil');
    if (modal) {
        // Cargar información del usuario
        const nombreGuardado = localStorage.getItem('nombreUsuario') || 'Usuario';
        const emailGuardado = localStorage.getItem('emailUsuario') || 'No disponible';
        const totalScore = parseInt(localStorage.getItem('totalScore') || '0');
        const userXP = parseInt(localStorage.getItem('userXP') || '0');
        const userLevel = parseInt(localStorage.getItem('userLevel') || '1');
        
        document.getElementById('modalNombre').textContent = nombreGuardado;
        
        // Censurar email para seguridad
        let emailCensurado = 'Sin email';
        if (emailGuardado && emailGuardado !== 'No disponible' && emailGuardado !== 'jugador@ejemplo.com') {
            const partes = emailGuardado.split('@');
            if (partes.length === 2) {
                const usuario = partes[0];
                const dominio = partes[1];
                if (usuario.length > 4) {
                    const primeros4 = usuario.substring(0, 4);
                    const asteriscos = '*'.repeat(usuario.length - 4);
                    emailCensurado = primeros4 + asteriscos + '@' + dominio;
                } else {
                    emailCensurado = emailGuardado;
                }
            } else {
                emailCensurado = emailGuardado;
            }
        }
        
        document.getElementById('modalEmail').textContent = emailCensurado;
        document.getElementById('modalPuntos').textContent = totalScore.toLocaleString();
        document.getElementById('modalNivel').textContent = userLevel;
        
        // Actualizar título y XP
        const modalTitulo = document.getElementById('modalTitulo');
        if (modalTitulo) modalTitulo.textContent = getUserTitle(userLevel);
        
        // Actualizar barra de XP
        const xpForNextLevel = getXPForLevel(userLevel);
        const xpProgress = (userXP / xpForNextLevel) * 100;
        
        const modalXpFill = document.getElementById('modalXpFill');
        const modalCurrentXP = document.getElementById('modalCurrentXP');
        const modalNextLevelXP = document.getElementById('modalNextLevelXP');
        
        if (modalXpFill) modalXpFill.style.width = `${Math.min(xpProgress, 100)}%`;
        if (modalCurrentXP) modalCurrentXP.textContent = userXP;
        if (modalNextLevelXP) modalNextLevelXP.textContent = xpForNextLevel;
        
        // Cargar foto en el modal
        const fotoGuardada = localStorage.getItem('fotoUsuario');
        const modalPhoto = document.getElementById('profilePhoto');
        if (fotoGuardada && modalPhoto) {
            modalPhoto.src = fotoGuardada;
        }
        
        // Mostrar modal como flex para centrar
        modal.style.display = 'flex';
        modal.style.zIndex = '9999';
    }
}

// Función para cerrar modal de perfil
function cerrarModalPerfil() {
    const modal = document.getElementById('modalPerfil');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Función para cambiar foto de perfil
function cambiarFoto() {
    const photoInput = document.getElementById('photoInput');
    if (photoInput) {
        photoInput.click();
    }
}

// Función para cargar foto de perfil
function cargarFotoPerfil() {
    const photoInput = document.getElementById('photoInput');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageDataUrl = e.target.result;
                    
                    // Guardar en localStorage
                    localStorage.setItem('fotoUsuario', imageDataUrl);
                    
                    // Actualizar avatar en el perfil
                    const avatarImg = document.querySelector('.avatar-img');
                    if (avatarImg) {
                        avatarImg.src = imageDataUrl;
                    }
                    
                    // Actualizar foto en el modal
                    const modalPhoto = document.getElementById('profilePhoto');
                    if (modalPhoto) {
                        modalPhoto.src = imageDataUrl;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Cargar foto guardada al inicializar
    const fotoGuardada = localStorage.getItem('fotoUsuario');
    if (fotoGuardada) {
        const avatarImg = document.querySelector('.avatar-img');
        if (avatarImg) {
            avatarImg.src = fotoGuardada;
        }
    }
}

// Función súper simple para guardar cambios
function guardarCambio() {
    const input = document.getElementById('editInput');
    const field = input.getAttribute('data-field');
    const valor = input.value.trim();
    
    if (field === 'nombre' && valor) {
        localStorage.setItem('nombreUsuario', valor);
        document.getElementById('modalNombre').textContent = valor;
        document.getElementById('profileName').textContent = valor;
    } else if (field === 'email' && valor) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(valor)) {
            localStorage.setItem('emailUsuario', valor);
            abrirModalPerfil(); // Recargar para mostrar censurado
        } else {
            alert('Email inválido');
            return;
        }
    }
    
    document.getElementById('modalEdicion').style.display = 'none';
}

// Variables globales para el modal de edición
let tipoEdicionActual = '';
let callbackEdicion = null;

// Función para editar nombre
function editarNombre() {
    console.log('editarNombre llamada');
    abrirModalEdicion('Editar Nombre', 'Nombre:', localStorage.getItem('nombreUsuario') || '', function(nuevoValor) {
        console.log('Callback de nombre ejecutado con valor:', nuevoValor);
        if (nuevoValor && nuevoValor.trim() !== '') {
            localStorage.setItem('nombreUsuario', nuevoValor.trim());
            cargarPerfilUsuario();
            document.getElementById('modalNombre').textContent = nuevoValor.trim();
            console.log('Nombre actualizado exitosamente');
        }
    });
}

// Función para editar email
function editarEmail() {
    console.log('editarEmail llamada');
    const emailActual = localStorage.getItem('emailUsuario') || '';
    const valorMostrar = emailActual === 'jugador@ejemplo.com' ? '' : emailActual;
    
    abrirModalEdicion('Editar Email', 'Email:', valorMostrar, function(nuevoValor) {
        console.log('Callback de email ejecutado con valor:', nuevoValor);
        if (nuevoValor && nuevoValor.trim() !== '') {
            // Validar formato de email básico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(nuevoValor.trim())) {
                localStorage.setItem('emailUsuario', nuevoValor.trim());
                // Recargar el modal para mostrar el email censurado
                abrirModalPerfil();
                mostrarMensaje('Email actualizado exitosamente!', 'success');
                console.log('Email actualizado exitosamente');
            } else {
                mostrarMensaje('Por favor ingresa un email válido.', 'error');
                console.log('Email inválido');
            }
        }
    });
}

// Función para abrir modal de edición personalizado
function abrirModalEdicion(titulo, label, valorActual, callback) {
    const modal = document.getElementById('modalEdicion');
    const title = document.getElementById('editModalTitle');
    const labelElement = document.getElementById('editModalLabel');
    const input = document.getElementById('editInput');
    
    console.log('Abriendo modal:', {modal: !!modal, title: !!title, labelElement: !!labelElement, input: !!input});
    console.log('Callback recibido:', typeof callback);
    
    if (modal) {
        // Establecer el callback ANTES de modificar el DOM
        callbackEdicion = callback;
        
        if (title) title.textContent = titulo;
        if (labelElement) labelElement.textContent = label;
        if (input) {
            input.value = valorActual;
            input.type = label.toLowerCase().includes('email') ? 'email' : 'text';
        }
        
        modal.style.display = 'flex';
        
        console.log('Modal abierto, callback establecido:', typeof callbackEdicion);
        
        setTimeout(() => {
            if (input) {
                input.focus();
                input.select();
            }
        }, 100);
        
        // Agregar evento Enter al input
        if (input) {
            input.onkeydown = function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    confirmarEdicion();
                }
            };
        }
    } else {
        console.error('Modal no encontrado');
        alert('Error: Modal no encontrado');
    }
}

// Función para confirmar edición
function confirmarEdicion() {
    const input = document.getElementById('editInput');
    if (input && callbackEdicion) {
        const valor = input.value.trim();
        console.log('Confirmando edición con valor:', valor);
        callbackEdicion(valor);
    } else {
        console.error('No hay callback o input definido:', {input: !!input, callback: !!callbackEdicion});
    }
    cerrarModalEdicion();
}

// Función para cerrar modal de edición
function cerrarModalEdicion() {
    console.log('Cerrando modal de edición');
    const modal = document.getElementById('modalEdicion');
    if (modal) {
        modal.style.display = 'none';
        callbackEdicion = null;
        console.log('Modal cerrado');
    }
}

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    // Crear elemento de mensaje temporal
    const msgElement = document.createElement('div');
    msgElement.className = `mensaje-temporal ${tipo}`;
    msgElement.textContent = mensaje;
    msgElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 11000;
        background: ${tipo === 'success' ? '#4CAF50' : '#f44336'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(msgElement);
    
    setTimeout(() => {
        msgElement.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => document.body.removeChild(msgElement), 300);
    }, 3000);
}

// Función para inicializar datos de prueba si no existen
function inicializarDatosPrueba() {
    if (!localStorage.getItem('nombreUsuario')) {
        localStorage.setItem('nombreUsuario', 'Jugador Demo');
    }
    if (!localStorage.getItem('emailUsuario')) {
        localStorage.setItem('emailUsuario', 'jugador@ejemplo.com');
    }
    if (!localStorage.getItem('puntos')) {
        localStorage.setItem('puntos', '150');
    }
    if (!localStorage.getItem('nivel')) {
        localStorage.setItem('nivel', '3');
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('emailUsuario');
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('usuarioRegistrado');
        localStorage.removeItem('fotoUsuario');
        window.location.href = 'index.html';
    }
}

// Cerrar modal al hacer click fuera - VERSIÓN CONSOLIDADA
window.onclick = function(event) {
    const modalPerfil = document.getElementById('modalPerfil');
    const modalEdicion = document.getElementById('modalEdicion');
    
    if (event.target === modalPerfil) {
        cerrarModalPerfil();
    }
    if (event.target === modalEdicion) {
        cerrarModalEdicion();
    }
}

// Cerrar modal con tecla Esc
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModalPerfil();
        cerrarModalEdicion();
    }
});

// Exponer funciones globalmente
window.abrirModalPerfil = abrirModalPerfil;
window.cerrarModalPerfil = cerrarModalPerfil;
window.cambiarFoto = cambiarFoto;
window.editarNombre = editarNombre;
window.editarEmail = editarEmail;
window.abrirModalEdicion = abrirModalEdicion;
window.confirmarEdicion = confirmarEdicion;
window.cerrarModalEdicion = cerrarModalEdicion;
window.guardarCambio = guardarCambio;
window.inicializarDatosPrueba = inicializarDatosPrueba;
window.cerrarSesion = cerrarSesion;

// Actualizar perfil cuando se cambie el nombre
function actualizarPerfil() {
    cargarPerfilUsuario();
}

// Exponer función globalmente para uso en configuración
window.actualizarPerfil = actualizarPerfil;

