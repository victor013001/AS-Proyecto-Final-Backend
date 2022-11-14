/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Creditos" DROP CONSTRAINT "Creditos_documento_tipoDocumento_fkey";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "Usuarios" (
    "documento" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "nombre" TEXT,
    "cupo" INTEGER,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("documento","tipoDocumento")
);

-- AddForeignKey
ALTER TABLE "Creditos" ADD CONSTRAINT "Creditos_documento_tipoDocumento_fkey" FOREIGN KEY ("documento", "tipoDocumento") REFERENCES "Usuarios"("documento", "tipoDocumento") ON DELETE RESTRICT ON UPDATE CASCADE;
