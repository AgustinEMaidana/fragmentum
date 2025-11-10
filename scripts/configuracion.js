// Cerrar modal al presionar Esc
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// Función auxiliar para obtener traducciones
function getTexto(clave) {
    const idioma = window.getLang ? window.getLang() : 'es';
    const textos = {
        es: {
            cambiarNombre: 'Cambiar Nombre',
            cambiarContraseña: 'Cambiar Contraseña',
            politicaPrivacidad: 'Política de Privacidad',
            ayuda: 'Ayuda',
            nuevoNombre: 'Nuevo nombre',
            nuevaContraseña: 'Nueva contraseña',
            guardar: 'Guardar',
            nombreGuardado: 'Nombre guardado',
            contraseñaGuardada: 'Contraseña guardada.',
            seguroCerrarSesion: '¿Seguro que quieres cerrar sesión?',
            cerrarSesion: 'Cerrar Sesión'
        },
        en: {
            cambiarNombre: 'Change Name',
            cambiarContraseña: 'Change Password',
            politicaPrivacidad: 'Privacy Policy',
            ayuda: 'Help',
            nuevoNombre: 'New name',
            nuevaContraseña: 'New password',
            guardar: 'Save',
            nombreGuardado: 'Name saved',
            contraseñaGuardada: 'Password saved.',
            seguroCerrarSesion: 'Are you sure you want to log out?',
            cerrarSesion: 'Log Out'
        }
    };
    return textos[idioma][clave] || textos.es[clave];
}

function abrirModal(tipo) {
    let texto = "";

    if (tipo === "nombre") {
        texto = `<h3>${getTexto('cambiarNombre')}</h3><input type='text' placeholder='${getTexto('nuevoNombre')}'><br><br><button class='btn' onclick='guardarNombre()'>${getTexto('guardar')}</button>`;
    } 
    else if (tipo === "contraseña") {
        texto = `<h3>${getTexto('cambiarContraseña')}</h3><input type='password' placeholder='${getTexto('nuevaContraseña')}'><br><br><button class='btn' onclick='guardarContraseña()'>${getTexto('guardar')}</button>`;
    }
    else if (tipo === "privacidad") {
        const idioma = window.getLang ? window.getLang() : 'es';
        if (idioma === 'en') {
            texto = `<h3>Privacy Policy</h3>
            <p>At <strong>Fragmentum</strong> your privacy is our priority. We do not collect sensitive personal data or share your information with third parties. The only data stored is related to your progress and achievements within the game, used exclusively to improve your experience and personalize the application.</p>
            <p>Information is stored securely on your device and is never used for commercial or advertising purposes. By using Fragmentum, you accept this policy and trust that your information is protected.</p>
            <p>If you have questions or suggestions about privacy, you can contact us from the help section.</p>`;
        } else {
            texto = `<h3>Política de Privacidad</h3>
            <p>En <strong>Fragmentum</strong> tu privacidad es nuestra prioridad. No recopilamos datos personales sensibles ni compartimos tu información con terceros. Los únicos datos almacenados son los relacionados con tu progreso y logros dentro del juego, utilizados exclusivamente para mejorar tu experiencia y personalizar la aplicación.</p>
            <p>La información se guarda de forma segura en tu dispositivo y nunca se utiliza para fines comerciales ni publicitarios. Al utilizar Fragmentum, aceptas esta política y confías en que tu información está protegida.</p>
            <p>Si tienes dudas o sugerencias sobre la privacidad, puedes contactarnos desde el apartado de ayuda.</p>`;
        }
    }
    else if (tipo === "ayuda") {
        const idioma = window.getLang ? window.getLang() : 'es';
        if (idioma === 'en') {
            texto = `<h3>Help</h3>
            <p>Need assistance with Fragmentum? Here are some tips:</p>
            <ul style='text-align:left; margin: 0 auto; max-width: 300px;'>
                <li><strong>Settings:</strong> Change your name, password or language from this menu.</li>
                <li><strong>Progress:</strong> Your progress is saved automatically. If you have problems, try reloading the page.</li>
                <li><strong>Privacy:</strong> Check the policy to know how we protect your data.</li>
                <li><strong>Support:</strong> If you find bugs or have suggestions, write to us at <a href='mailto:soporte@fragmentum.com'>soporte@fragmentum.com</a>.</li>
            </ul>
            <p>Thank you for playing and trusting Fragmentum!</p>`;
        } else {
            texto = `<h3>Ayuda</h3>
            <p>¿Necesitas asistencia con Fragmentum? Aquí tienes algunos consejos:</p>
            <ul style='text-align:left; margin: 0 auto; max-width: 300px;'>
                <li><strong>Configuración:</strong> Cambia tu nombre, contraseña o idioma desde este menú.</li>
                <li><strong>Progreso:</strong> Tu avance se guarda automáticamente. Si tienes problemas, intenta recargar la página.</li>
                <li><strong>Privacidad:</strong> Consulta la política para saber cómo protegemos tus datos.</li>
                <li><strong>Soporte:</strong> Si encuentras errores o tienes sugerencias, escríbenos a <a href='mailto:soporte@fragmentum.com'>soporte@fragmentum.com</a>.</li>
            </ul>
            <p>¡Gracias por jugar y confiar en Fragmentum!</p>`;
        }
    }

    document.getElementById("modalTexto").innerHTML = texto;
    document.getElementById("miModal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
}

function guardarNombre() {
    let nombre = document.querySelector("#modalTexto input").value;
    if (nombre) {
        localStorage.setItem("nombreUsuario", nombre);
        alert(`${getTexto('nombreGuardado')}: ${nombre}`);
        cerrarModal();
        // Actualizar perfil si la función existe
        if (window.actualizarPerfil) {
            window.actualizarPerfil();
        }
        // También actualizar el sistema de XP si existe
        if (window.cargarPerfilUsuario) {
            window.cargarPerfilUsuario();
        }
    }
}

function guardarContraseña() {
    let pass = document.querySelector("#modalTexto input").value;
    if (pass) {
        localStorage.setItem("contraseñaUsuario", pass);
        alert(getTexto('contraseñaGuardada'));
        cerrarModal();
    }
}

function cerrarSesion() {
    // Mostrar modal personalizado para cerrar sesión
    const texto = `<h3>${getTexto('seguroCerrarSesion')}</h3><button class='btn' id='confirmCerrarSesion' style='width: 200px; margin-top: 20px;'>${getTexto('cerrarSesion')}</button>`;
    document.getElementById("modalTexto").innerHTML = texto;
    document.getElementById("miModal").style.display = "flex";
    // Agregar evento al botón
    setTimeout(() => {
        const btn = document.getElementById('confirmCerrarSesion');
        if (btn) {
            btn.onclick = function() {
                localStorage.clear();
                window.location.href = "index.html";
            };
        }
    }, 0);
}

// Funcionalidad para configurar estilos visuales
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar textos del selector de idioma
    actualizarTextoIdiomas();
    
    // Cargar estilo actual
    const currentStyle = localStorage.getItem('visualStyle') || 'mixed';
    const estiloSelect = document.getElementById('estiloVisual');
    
    // Establecer valor actual del select
    if (estiloSelect) {
        estiloSelect.value = currentStyle;
        
        // Agregar event listener para cuando cambie el select
        estiloSelect.addEventListener('change', function() {
            const newStyle = this.value;
            localStorage.setItem('visualStyle', newStyle);
            
            // Mostrar confirmación temporal
            const originalBg = this.style.backgroundColor;
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.style.backgroundColor = originalBg;
            }, 1000);
        });
    }
});

// Función para actualizar los textos del selector de idioma
function actualizarTextoIdiomas() {
    const idiomaSelect = document.getElementById('idioma');
    if (!idiomaSelect) return;
    
    const lang = window.getLang ? window.getLang() : 'es';
    const opciones = idiomaSelect.querySelectorAll('option');
    
    if (lang === 'es') {
        opciones[0].textContent = 'Idioma: Español';
        opciones[1].textContent = 'Language: English';
    } else {
        opciones[0].textContent = 'Idioma: Español';
        opciones[1].textContent = 'Language: English';
    }
}