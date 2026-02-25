import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { defaultHomeConfig } from '../lib/home';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin123456';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash }
  });

  const existing = await prisma.homePageConfig.findFirst();
  if (!existing) {
    await prisma.homePageConfig.create({
      data: {
        hero: defaultHomeConfig.hero,
        sectors: defaultHomeConfig.sectors,
        featuredProjects: defaultHomeConfig.featuredProjects,
        affiliations: defaultHomeConfig.affiliations,
        about: defaultHomeConfig.about,
        footer: defaultHomeConfig.footer
      }
    });
  }

  console.log(`Seeded admin user: ${email}`);
  console.log('Seeded home page default config.');
}

main().finally(async () => prisma.$disconnect());
