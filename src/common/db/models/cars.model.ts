export const _carCreate = `
  CREATE TABLE IF NOT EXISTS car (
    id serial NOT NULL,
    number varchar(9) NOT NULL, -- Номер машины
    color varchar(20) NOT NULL, -- Цвет машины
  CONSTRAINT "PK_CARS_ID" PRIMARY KEY (id)
  );
  CREATE UNIQUE INDEX IF NOT EXISTS "IDX_CARS_NUMBER" ON car USING btree (number, color);
`;

export const _carLoad = `
  INSERT INTO car (number, color) VALUES
    ('A111AA32', 'Красный'),
    ('B222BB192', 'Зеленый'),
    ('B333CC192', 'Красный'),
    ('A444EE27', 'Фиолетовый'),
    ('H555HH99', 'Синий')
  ON CONFLICT DO NOTHING;
`;

export const carSelectAll = `
  SELECT * from car;
`;

export const carSelectInPeriod = `
  SELECT * FROM "session" s
  LEFT JOIN car ON car.id = s.car_id
    WHERE number = $1
    AND s.end_session  >= $2::TIMESTAMP - INTERVAL '3 DAYS'
    AND s.start_session <= $3::TIMESTAMP + INTERVAL '3 DAYS'
`;

export const carCreateInPeriod = `
  INSERT INTO session (
    car_id, start_session, end_session
  ) VALUES (
    (SELECT id FROM car WHERE number = $1),
    $2 at time zone 'UTC',
    $3 at time zone 'UTC'
  )
`;
