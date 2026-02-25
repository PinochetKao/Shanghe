-- CreateTable
CREATE TABLE "HomePageConfig" (
    "id" TEXT NOT NULL,
    "hero" JSONB NOT NULL,
    "sectors" JSONB NOT NULL,
    "featuredProjects" JSONB NOT NULL,
    "affiliations" JSONB NOT NULL,
    "about" JSONB NOT NULL,
    "footer" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "HomePageConfig_pkey" PRIMARY KEY ("id")
);
