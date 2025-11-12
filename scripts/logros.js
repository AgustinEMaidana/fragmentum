// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Función para desbloquear un logro
    function desbloquearLogro(numeroLogro) {
        const logro = document.querySelector(`.logro[data-logro="${numeroLogro}"]`);
        if (logro) {
            logro.classList.add('desbloqueado');
            logro.querySelector('.estado-logro').textContent = 'Desbloqueado';
            const btn = logro.querySelector('.btn-reclamar');
            if (btn) {
                // Solo mostrar el botón si NO ha sido reclamado antes
                if (!localStorage.getItem('logroReclamado_' + numeroLogro)) {
                    btn.style.display = '';
                } else {
                    btn.style.display = 'none';
                }
            }
        }
    }

    // Función para bloquear un logro (por defecto)
    function bloquearLogro(numeroLogro) {
        const logro = document.querySelector(`.logro[data-logro="${numeroLogro}"]`);
        if (logro) {
            logro.classList.remove('desbloqueado');
            logro.querySelector('.estado-logro').textContent = 'Bloqueado';
            const btn = logro.querySelector('.btn-reclamar');
            if (btn) {
                btn.style.display = 'none';
            }
        }
    }

    // Inicializar todos los logros como bloqueados por defecto
    function inicializarLogros() {
        for (let i = 0; i <= 13; i++) {
            bloquearLogro(i);
        }
    }

    // Verificar y actualizar todos los logros basándose en el localStorage
    function actualizarTodosLosLogros() {
        const levels = JSON.parse(localStorage.getItem('levels')) || [];
        console.log('Datos de levels desde localStorage:', levels); // Debug
        
        // Logros 0-11: Completar niveles 1-12
        // Si el nivel siguiente está desbloqueado, significa que completó el nivel actual
        for (let i = 0; i < 12; i++) {
            if (levels.length >= (i + 2) && levels[i + 1] && levels[i + 1].unlocked) {
                console.log(`Desbloqueando logro ${i} - Nivel ${i + 1} completado`);
                desbloquearLogro(i);
            }
        }
        
        // Logro 12: Comienzo Perfecto - Se desbloquea al completar el primer nivel
        if (levels.length >= 2 && levels[1] && levels[1].unlocked) {
            console.log('Desbloqueando logro 12 - Comienzo perfecto');
            desbloquearLogro(12);
        }
        
        // Logro 13: Conquistador Total - Se desbloquea al completar todos los niveles (nivel 12)
        if (levels.length >= 12) {
            let todosCompletados = true;
            for (let i = 1; i < 12; i++) {
                if (!levels[i] || !levels[i].unlocked) {
                    todosCompletados = false;
                    break;
                }
            }
            if (todosCompletados) {
                console.log('Desbloqueando logro 13 - Conquistador total');
                desbloquearLogro(13);
            }
        }
    }

    // Configurar los botones de reclamar sobres
    document.querySelectorAll('.btn-reclamar').forEach(function(btn) {
        const idx = btn.getAttribute('data-logro');
        
        // Si ya fue reclamado, ocultar el botón
        if (localStorage.getItem('logroReclamado_' + idx)) {
            btn.style.display = 'none';
        }
        
        // Agregar event listener para reclamar
        btn.addEventListener('click', function() {
            // Protección anti-spam: deshabilitar inmediatamente
            if (btn.disabled) return;
            btn.disabled = true;
            
            console.log('Reclamando logro:', idx);
            
            // Sumar sobres
            if (window.sumarSobres) {
                window.sumarSobres(5);
                console.log('5 sobres añadidos');
            } else {
                console.error('Función sumarSobres no disponible');
            }
            
            // Marcar como reclamado
            localStorage.setItem('logroReclamado_' + idx, '1');
            const idioma = window.getLang ? window.getLang() : 'es';
            const textos = { 
                es: { reclamado: '¡Reclamado!' },
                en: { reclamado: 'Claimed!' }
            };
            btn.textContent = textos[idioma].reclamado;
            
            // Ocultar después de un tiempo
            setTimeout(() => {
                btn.style.display = 'none';
            }, 1200);
        });
    });

    // Inicializar y actualizar logros al cargar la página
    inicializarLogros();
    actualizarTodosLosLogros();
});