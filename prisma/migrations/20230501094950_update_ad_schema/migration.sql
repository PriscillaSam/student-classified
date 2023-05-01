-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "location" TEXT,
ALTER COLUMN "priceRange" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;
