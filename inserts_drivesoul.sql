-- Insertar marcas adicionales
INSERT INTO `marcas` (`nombre`) VALUES 
('Audi'),
('BMW'),
('Toyota'),
('Mercedes'),
('Jeep'),
('Nissan'),
('Tesla'),
('Volkswagen'),
('Porsche');

-- Insertar modelos
INSERT INTO `modelos` (`marca_id`, `nombre`) VALUES
-- Seat (id=1)
(1, 'León'),
(1, 'Ateca'),
(1, 'Arona'),
-- Hyundai (id=2)
(2, 'Tucson'),
(2, 'Kona'),
(2, 'IONIQ 5'),
-- Audi (id=3)
(3, 'A3'),
(3, 'Q5'),
(3, 'RS6'),
(3, 'e-tron GT'),
-- BMW (id=4)
(4, 'M3'),
(4, 'X5'),
(4, 'i4'),
(4, 'Serie 5'),
-- Toyota (id=5)
(5, 'RAV4'),
(5, 'Supra'),
(5, 'Corolla'),
(5, 'Land Cruiser'),
-- Mercedes (id=6)
(6, 'Clase A AMG'),
(6, 'GLE Coupé'),
(6, 'Clase C'),
(6, 'EQS'),
-- Jeep (id=7)
(7, 'Grand Cherokee'),
(7, 'Wrangler'),
(7, 'Compass'),
-- Nissan (id=8)
(8, 'GT-R'),
(8, 'Qashqai'),
(8, 'X-Trail'),
-- Tesla (id=9)
(9, 'Model 3'),
(9, 'Model Y'),
(9, 'Model S'),
-- Volkswagen (id=10)
(10, 'Golf GTI'),
(10, 'Tiguan'),
(10, 'ID.4'),
-- Porsche (id=11)
(11, '911 GT3'),
(11, 'Taycan'),
(11, 'Cayenne');

-- Insertar productos
INSERT INTO `productos` (`nombre`, `descripcion`, `precio`, `categoria`) VALUES
-- Seat
('Seat León 2023', 'Seat León FR 2023, motor 2.0 TSI, 190CV, deportivo y eficiente.', 32500.00, 'Coche'),
('Seat Ateca 2023', 'Seat Ateca FR 2023, SUV versátil con motor 1.5 TSI, 150CV.', 35800.00, 'Coche'),
('Seat Arona 2023', 'Seat Arona FR 2023, SUV compacto con motor 1.0 TSI, 110CV.', 25600.00, 'Coche'),

-- Hyundai
('Hyundai Tucson 2023', 'Hyundai Tucson Híbrido 2023, 230CV, tecnología de vanguardia.', 38500.00, 'Coche'),
('Hyundai Kona 2023', 'Hyundai Kona Electric 2023, 204CV, autonomía de 484km.', 41900.00, 'Coche'),
('Hyundai IONIQ 5 2023', 'Hyundai IONIQ 5 2023, 305CV, diseño futurista y gran autonomía.', 47500.00, 'Coche'),

-- Audi
('Audi A3 2023', 'Audi A3 S line 2023, 2.0 TFSI, 190CV, máxima elegancia.', 42000.00, 'Coche'),
('Audi Q5 2023', 'Audi Q5 S line 2023, 2.0 TDI quattro, 204CV, SUV premium.', 57800.00, 'Coche'),
('Audi RS6 2023', 'Audi RS6 Avant 2023, V8 4.0 TFSI, 600CV, deportivo familiar.', 129900.00, 'Coche'),
('Audi e-tron GT 2023', 'Audi e-tron GT quattro 2023, 476CV, deportivo eléctrico.', 109500.00, 'Coche'),

-- BMW
('BMW M3 2023', 'BMW M3 Competition 2023, 510CV, berlina deportiva de alto rendimiento.', 115000.00, 'Coche'),
('BMW X5 2023', 'BMW X5 xDrive40i 2023, 340CV, SUV de lujo.', 89900.00, 'Coche'),
('BMW i4 2023', 'BMW i4 M50 2023, 544CV, gran coupé eléctrico.', 78500.00, 'Coche'),
('BMW Serie 5 2023', 'BMW 530e 2023, híbrido enchufable, 292CV, berlina ejecutiva.', 69800.00, 'Coche'),

-- Toyota
('Toyota RAV4 2023', 'Toyota RAV4 Hybrid 2023, 222CV, SUV híbrido eficiente.', 42500.00, 'Coche'),
('Toyota Supra 2023', 'Toyota Supra 3.0 2023, 340CV, deportivo legendario.', 65900.00, 'Coche'),
('Toyota Corolla 2023', 'Toyota Corolla Hybrid 2023, 184CV, eficiencia y confort.', 31900.00, 'Coche'),
('Toyota Land Cruiser 2023', 'Toyota Land Cruiser 2023, 204CV, todoterreno legendario.', 72500.00, 'Coche'),

-- Mercedes
('Mercedes-AMG A45 S 2023', 'Mercedes-AMG A45 S 4MATIC+ 2023, 421CV, compacto deportivo.', 89900.00, 'Coche'),
('Mercedes GLE Coupé 2023', 'Mercedes GLE 400d Coupé 2023, 330CV, SUV coupé de lujo.', 95800.00, 'Coche'),
('Mercedes Clase C 2023', 'Mercedes C300 2023, 258CV, berlina ejecutiva.', 55900.00, 'Coche'),
('Mercedes EQS 2023', 'Mercedes EQS 450+ 2023, 333CV, berlina eléctrica de lujo.', 125000.00, 'Coche'),

-- Jeep
('Jeep Grand Cherokee 2023', 'Jeep Grand Cherokee 4xe 2023, 380CV, híbrido enchufable.', 82500.00, 'Coche'),
('Jeep Wrangler 2023', 'Jeep Wrangler Rubicon 2023, 272CV, 4x4 auténtico.', 68900.00, 'Coche'),
('Jeep Compass 2023', 'Jeep Compass 4xe 2023, 240CV, SUV híbrido enchufable.', 48500.00, 'Coche'),

-- Nissan
('Nissan GT-R 2023', 'Nissan GT-R NISMO 2023, 600CV, superdeportivo japonés.', 215000.00, 'Coche'),
('Nissan Qashqai 2023', 'Nissan Qashqai e-POWER 2023, 190CV, SUV electrificado.', 39900.00, 'Coche'),
('Nissan X-Trail 2023', 'Nissan X-Trail e-POWER 2023, 204CV, SUV familiar.', 45800.00, 'Coche'),

-- Tesla
('Tesla Model 3 2023', 'Tesla Model 3 Performance 2023, 513CV, berlina eléctrica.', 65900.00, 'Coche'),
('Tesla Model Y 2023', 'Tesla Model Y Performance 2023, 513CV, SUV eléctrico.', 69900.00, 'Coche'),
('Tesla Model S 2023', 'Tesla Model S Plaid 2023, 1020CV, berlina eléctrica de altas prestaciones.', 138000.00, 'Coche'),

-- Volkswagen
('Volkswagen Golf GTI 2023', 'Volkswagen Golf GTI Clubsport 2023, 300CV, compacto deportivo.', 49900.00, 'Coche'),
('Volkswagen Tiguan 2023', 'Volkswagen Tiguan R 2023, 320CV, SUV deportivo.', 59900.00, 'Coche'),
('Volkswagen ID.4 2023', 'Volkswagen ID.4 GTX 2023, 299CV, SUV eléctrico.', 55900.00, 'Coche'),

-- Porsche
('Porsche 911 GT3 2023', 'Porsche 911 GT3 2023, 510CV, deportivo de altas prestaciones.', 189900.00, 'Coche'),
('Porsche Taycan 2023', 'Porsche Taycan Turbo S 2023, 761CV, deportivo eléctrico.', 189000.00, 'Coche'),
('Porsche Cayenne 2023', 'Porsche Cayenne Turbo GT 2023, 640CV, SUV deportivo.', 195000.00, 'Coche');

-- Insertar coches
INSERT INTO `coches` (`producto_id`, `modelo_id`, `anio`, `kilometraje`, `color`, `tipo_combustible`, `transmision`) VALUES
-- Continuando desde producto_id 3 (los dos primeros ya existen)
(3, 3, 2023, 1200, 'Negro', 'Gasolina', 'Manual'),
(4, 4, 2023, 500, 'Blanco', 'Gasolina', 'Automático'),
(5, 5, 2023, 0, 'Gris', 'Eléctrico', 'Automático'),
(6, 6, 2023, 100, 'Plata', 'Eléctrico', 'Automático'),
(7, 7, 2023, 3500, 'Azul', 'Gasolina', 'Automático'),
(8, 8, 2023, 2800, 'Negro', 'Diésel', 'Automático'),
(9, 9, 2023, 1500, 'Rojo', 'Gasolina', 'Automático'),
(10, 10, 2023, 0, 'Gris Nardo', 'Eléctrico', 'Automático'),
(11, 11, 2023, 2000, 'Verde Isle', 'Gasolina', 'Automático'),
(12, 12, 2023, 4500, 'Azul Marina', 'Diésel', 'Automático'),
(13, 13, 2023, 0, 'Rojo San Francisco', 'Eléctrico', 'Automático'),
(14, 14, 2023, 3200, 'Gris Dravit', 'Híbrido', 'Automático'),
(15, 15, 2023, 5000, 'Blanco Perla', 'Híbrido', 'Automático'),
(16, 16, 2023, 1800, 'Amarillo', 'Gasolina', 'Manual'),
(17, 17, 2023, 4200, 'Plata', 'Híbrido', 'Automático'),
(18, 18, 2023, 3600, 'Negro', 'Diésel', 'Automático'),
(19, 19, 2023, 2500, 'Blanco', 'Gasolina', 'Automático'),
(20, 20, 2023, 1900, 'Gris Selenita', 'Diésel', 'Automático'),
(21, 21, 2023, 3800, 'Negro', 'Gasolina', 'Automático'),
(22, 22, 2023, 0, 'Plata', 'Eléctrico', 'Automático'),
(23, 23, 2023, 4500, 'Verde', 'Híbrido', 'Automático'),
(24, 24, 2023, 2800, 'Blanco', 'Gasolina', 'Manual'),
(25, 25, 2023, 1500, 'Negro', 'Híbrido', 'Automático'),
(26, 26, 2023, 3200, 'Gris', 'Gasolina', 'Automático'),
(27, 27, 2023, 0, 'Rojo', 'Gasolina', 'Automático'),
(28, 28, 2023, 2000, 'Azul', 'Híbrido', 'Automático'),
(29, 29, 2023, 0, 'Blanco', 'Eléctrico', 'Automático'),
(30, 30, 2023, 0, 'Negro', 'Eléctrico', 'Automático'),
(31, 31, 2023, 0, 'Plata', 'Eléctrico', 'Automático'),
(32, 32, 2023, 1500, 'Azul Racing', 'Gasolina', 'Manual'),
(33, 33, 2023, 2800, 'Negro', 'Gasolina', 'Automático'),
(34, 34, 2023, 0, 'Blanco', 'Eléctrico', 'Automático'),
(35, 35, 2023, 500, 'Amarillo', 'Gasolina', 'Manual'),
(36, 36, 2023, 0, 'Plata', 'Eléctrico', 'Automático'),
(37, 37, 2023, 1200, 'Negro', 'Gasolina', 'Automático'); 