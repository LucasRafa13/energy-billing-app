-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "customerNumber" TEXT NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "energyKwh" DOUBLE PRECISION NOT NULL,
    "energyValue" DOUBLE PRECISION NOT NULL,
    "sceeeKwh" DOUBLE PRECISION NOT NULL,
    "sceeeValue" DOUBLE PRECISION NOT NULL,
    "gdKwh" DOUBLE PRECISION NOT NULL,
    "gdValue" DOUBLE PRECISION NOT NULL,
    "publicLighting" DOUBLE PRECISION NOT NULL,
    "totalConsumptionKwh" DOUBLE PRECISION NOT NULL,
    "totalValueWithoutGd" DOUBLE PRECISION NOT NULL,
    "economyGd" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
