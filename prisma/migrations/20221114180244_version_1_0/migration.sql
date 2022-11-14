-- CreateTable
CREATE TABLE "Usuario" (
    "documento" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "nombre" TEXT,
    "cupo" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("documento","tipoDocumento")
);

-- CreateTable
CREATE TABLE "Creditos" (
    "idCredito" TEXT NOT NULL,
    "tipoCredito" TEXT,
    "descripcion" TEXT,
    "valorCredito" INTEGER,
    "numeroCuotas" INTEGER,
    "diaCorte" INTEGER,
    "tasaInteres" INTEGER,
    "estado" TEXT NOT NULL DEFAULT 'activo',
    "documento" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,

    CONSTRAINT "Creditos_pkey" PRIMARY KEY ("idCredito")
);

-- AddForeignKey
ALTER TABLE "Creditos" ADD CONSTRAINT "Creditos_documento_tipoDocumento_fkey" FOREIGN KEY ("documento", "tipoDocumento") REFERENCES "Usuario"("documento", "tipoDocumento") ON DELETE RESTRICT ON UPDATE CASCADE;
