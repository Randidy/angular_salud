# SaludVital Angular Frontend

Sistema de login con Angular que consume el backend ms_saludvital

## 🚀 Cómo ejecutar

### 1. Iniciar el Backend
```bash
cd /mnt/e/Andrea_proyecto/ms_saludvital
mvn spring-boot:run
```
El backend debe estar corriendo en http://localhost:8081

### 2. Iniciar el Frontend
```bash
cd /mnt/e/Andrea_proyecto/saludvital_angul
npm install
npm start
```
El frontend estará en http://localhost:4200

## 🔐 Usuarios de Prueba

Haz clic en cualquier usuario para auto-completar el formulario:

| **Rol** | **Email** | **Password** |
|---------|-----------|--------------|
| **Admin** | admin@saludvital.com | admin123 |
| **Médico** | medico@saludvital.com | medico123 |
| **Paciente** | paciente@saludvital.com | paciente123 |

## 📱 Funcionalidades

✅ **Login con JWT**
- Formulario reactive con validaciones
- Auto-completado de usuarios de prueba
- Mensajes de error específicos
- Loading states

✅ **Rutas protegidas por rol**
- Admin → `/admin/dashboard`
- Médico → `/medico/dashboard`  
- Paciente → `/paciente/dashboard`

✅ **Dashboards por rol**
- Diseño idéntico a SaludVitalRojo
- Navegación específica por perfil
- Logout funcional

✅ **Seguridad**
- Guards que verifican autenticación
- Interceptor HTTP para tokens
- Validación de expiración JWT
- Storage automático de tokens

## 🎨 Diseño

- **Colores**: Rojo para Admin/Médico, Azul para Paciente
- **Iconos**: FontAwesome 6.5.0
- **Responsive**: Mobile-first design
- **CSS puro**: Sin dependencias externas

## 🛠️ Arquitectura

```
src/app/
├── components/
│   ├── login/                 # Componente de login
│   ├── admin-dashboard/       # Dashboard admin
│   ├── medico-dashboard/      # Dashboard médico
│   └── paciente-dashboard/    # Dashboard paciente
├── services/
│   └── auth.service.ts        # Servicio de autenticación
├── guards/
│   └── auth.guard.ts          # Guard de rutas
├── interceptors/
│   └── auth.interceptor.ts    # Interceptor HTTP
└── models/
    └── auth.models.ts         # Interfaces TypeScript
```

## ✨ Características Técnicas

- **Angular 16** con TypeScript
- **Reactive Forms** para validaciones
- **RxJS** para manejo de observables
- **JWT** para autenticación stateless
- **LocalStorage** para persistencia
- **HTTP Interceptors** para tokens automáticos
- **Route Guards** para protección de rutas