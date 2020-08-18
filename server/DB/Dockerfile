FROM mysql:5.7

# ENV MYSQL_DATABASE bogotatest
# ENV MYSQL_ROOT_PASSWORD qwerty
# ENV MYSQL_USER mysql
# ENV MYSQL_PASSWORD qwerty
# ENV DATABASE_HOST db

EXPOSE 3306

COPY ./sql-scripts /docker-entrypoint-initdb.d/
