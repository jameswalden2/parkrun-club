FROM postgres:latest
# Copy your SQL scripts
COPY ./ddl /var/lib/postgresql/sql_scripts
# Copy your script to execute SQL files
COPY ./execute_sql_scripts.sh /docker-entrypoint-initdb.d/