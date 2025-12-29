### INSTALAR NEST
```    
npm i -g @nestjs/cli
```
### CREAR PROYECTO
```
nest new posnet
```

### Crear modulo
```
nest g mo nombre_modulo
```

### Crear Controlador
```
nest g co nombre_controlador
```

### Crear Provider o Servicio
```
nest g pr nombre_servicio
```

### Crear modulo de categorias (nest g mo categories)
```
nest generate module categories
```

### Crear controladores de categorias (nest g co categories)
```
nest generate controller categories
```

### Crear services de categorias (nest g s categories)
```
nest generate service categories
```

### Crear CRUD de categorias (nest g res categories)
```
nest generate resource categories
```

### para forzar el uso de DTOs
```
npm install class-transformer
npm install class-validator
```

### Instalar typeorm
```
npm i @nestjs/typeorm typeorm pg
```

### Para amanejar variables de entorno
npm i @nestjs/config

### Para entrar a la bd
```
psql -U jota -d postgres
o
psql postgres
```

### Lista base de dato
```
\l
```
### Crear DB blog y usario en postgres
```
create database nestpos;
create user nestpos with password '123456';
grant all privileges on database nestpos to nestpos;
```

### Para conectarme a una base de datos en especifico
```
postgres=# \c nestpos
```

### Crear Pipe con path
```
nest g pi IdValidation common/pipes
```

### Crear crud de productos
```
nest g res products
```

### Instalar date-fns
```
npm i date-fns
```

### Crear crud de coupons
```
nest g res coupons
```
### Crear moduo seeder
```
nest g mo seeder
```

### Instalar cloudinary
```
 npm i cloudinary
 ```

 ### Instalar streamifier
```
npm i streamifier
```
### Crear modulo upload-image
```
nest g mo upload-image
```

### Crear servicio upload-image
```
nest g s upload-image
```

### Crear provider upload-image
```
nest g pr upload-image 
```

### Para tener tipado de file
```
npm i -D @types/multer
```

### Para instalar types de streamier
```
npm i --save-dev @types/streamifier
```