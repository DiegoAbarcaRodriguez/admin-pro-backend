const getMenuFrontEnd = (role = '') => {
    const menu = [
        {
            titulo: 'dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'rxjs', url: 'rxjs' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },

            ]
        },
        {
            titulo: 'mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                //{ titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Médicos', url: 'medicos' },

            ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}