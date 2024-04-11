create table v1.logging_pipeline_run (
  id serial primary key,
  pipeline_name text,
  run_datetime timestamp
);

create table v1.logging_table_updated (
  id serial primary key,
  table_name text,
  rows_updated int,
  run_datetime timestamp
);
