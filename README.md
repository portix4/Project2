# Project2 - Movies Web
1) Planificación de endpoints:


| HTTP Method | URL Path                    | Description                     | JSON |
| ------------| ------------------------    | ------------------------------- |------|
| GET         | /                           | Home page                       |      |
| GET         | /registro                   | New user form render            |      |
| POST        | /registro                   | New user form handler           |      |
| GET         | /iniciar-sesion             | User login form render          |      |
| POST        | /iniciar-sesion             | User login form handler         |      |
| POST        | /cerrar-sesion              | User logout form handler        |      |
| POST        | /movie/detalle/{id_movie}   | Detalle película                |  ✅  |
| GET         | /movie/random               | Form. render para movie random  |  ✅  |
| POST        | /movie/random               | Form. handler movie random      |  ✅  | 
| POST        | /movie/search/{title}       | Form. handler movie search      |  ✅  |
| GET         | /cast/{id_cast}             | Form. render cast serched       |  ✅  |
| GET         | /user/list/                 | Form. render users              |      |
| GET         | /user/{id_user}             | Form. render user profile       |      |
| GET         | /user/{id_user}/editar      | Form. render user edit profile  |      |
| POST        | /user/{id_user}/editar      | Form. handler user edit profile |      |
| POST        | /user/{id_user}/eliminar    | Form. handler user del profile  |      |
| GET         | /evento/listado/            | Form. render events             |      |
| GET         | /evento/detalle/{id_event}  | Form. render user profile       |      |
| GET         | /evento/crear               | Form. render para crear evento  |  ✅  |
| POST        | /evento/crear               | Form. handler para crear evento |  ✅  |
| POST        | /evento/{id_event}/eliminar | Form. handler eliminar evento   |  ✅  |






