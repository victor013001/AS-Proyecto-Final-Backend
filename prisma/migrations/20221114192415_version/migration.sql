/*
  Warnings:

  - You are about to drop the `Creditos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Creditos" DROP CONSTRAINT "Creditos_documento_tipoDocumento_fkey";

-- DropTable
DROP TABLE "Creditos";

-- CreateTable
CREATE TABLE "Prestamos" (
    "idPrestamo" TEXT NOT NULL,
    "tipoPrestamo" TEXT,
    "descripcion" TEXT,
    "valorPrestamo" INTEGER,
    "numeroCuotas" INTEGER,
    "diaCorte" INTEGER,
    "tasaInteres" INTEGER,
    "estado" TEXT NOT NULL DEFAULT 'activo',
    "documento" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,

    CONSTRAINT "Prestamos_pkey" PRIMARY KEY ("idPrestamo")
);

-- AddForeignKey
ALTER TABLE "Prestamos" ADD CONSTRAINT "Prestamos_documento_tipoDocumento_fkey" FOREIGN KEY ("documento", "tipoDocumento") REFERENCES "Usuarios"("documento", "tipoDocumento") ON DELETE RESTRICT ON UPDATE CASCADE;
