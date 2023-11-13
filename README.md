# Project2 - Movies Web

Este proyecto consiste en desarrollar una web que utilice apis externas, base de datos local y autenticación de usuario. 

Hemos creado una web que trabaja con una api de películas y series y la api de Google Maps. 

- **Planificación de endpoints:**


| HTTP Method | URL Path                     | Description                     | JSON |
| ------------| ---------------------------- | --------------------------------|------|
| GET         | `/`                          | Home page                       |  ✅  |
| GET         | `/registro`                  | New user form render            |      |
| POST        | `/registro`                  | New user form handler           |      |
| GET         | `/iniciar-sesion`            | User login form render          |      |
| POST        | `/iniciar-sesion`            | User login form handler         |      |
| POST        | `/cerrar-sesion`             | User logout form handler        |      |
| POST        | `/movie/detalle/{id_movie}`  | Detalle película                |  ✅  |
| GET         | `/movie/random`              | Form. render para movie random  |  ✅  |
| POST        | `/movie/random`              | Form. handler movie random      |  ✅  | 
| POST        | `/movie/search/{title}`      | Form. handler movie search      |  ✅  |
| GET         | `/cast/{id_cast}`            | Form. render cast serched       |  ✅  |
| GET         | `/user/list/`                | Form. render users              |      |
| GET         | `/user/{id_user}`            | Form. render user profile       |      |
| GET         | `/user/{id_user}/editar`     | Form. render user edit profile  |      |
| POST        | `/user/{id_user}/editar`     | Form. handler user edit profile |      |
| POST        | `/user/{id_user}/eliminar`   | Form. handler user del profile  |      |
| GET         | `/evento/listado/`           | Form. render events             |      |
| GET         | `/evento/{id_event}/detalle/`| Form. render user profile       |      |
| GET         | `/evento/crear`              | Form. render para crear evento  |  ✅  |
| POST        | `/evento/crear`              | Form. handler para crear evento |  ✅  |
| POST        | `/evento/{id_event}/eliminar`| Form. handler eliminar evento   |  ✅  |
| POST        | `/evento/{id_event}/editar`  | Form. render editar evento      |  ✅  |
| POST        | `/evento/{id_event}/editar`  | Form. handler editar evento     |  ✅  |


- **Desarrollo del sistema Auth:**

Cualquier persona que entre en la web va a poder hacer todo tipo de búsquedas. 

Si te registras, el usuario podrá almacenar en su perfil las películas que le gusten, ver los perfiles de otros usuarios, editar y/o elimiar su propio perfil. También podrá crear eventos, para poder crear una comunidad con el resto de usuarios. 

El Admin tendrá todos los permisos, para poder crear, editar y/o eliminar tanto usuarios como eventos. 




