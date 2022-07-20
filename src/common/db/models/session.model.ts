export const _sessionCreate = `
  CREATE TABLE IF NOT EXISTS session (
    id serial NOT NULL,
    start_session date NOT NULL, -- Старт сессии
    end_session date NOT NULL, -- Окончание сессии
    car_id int NOT NULL CHECK (car_id > 0), -- Ссылка на машину
  CONSTRAINT "PK_SESSION_ID" PRIMARY KEY (id),
  CONSTRAINT "FK_CAR_LINK" FOREIGN KEY (car_id) REFERENCES car(id)
  );
  CREATE INDEX IF NOT EXISTS "IDX_SESSION_PERIOD" ON session
    USING btree (start_session, end_session);
`;
