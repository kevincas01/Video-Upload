import { Prisma, PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export { prisma };


// async function main() {
//     Create a user in the database
//       const user = await prisma.user.create({
//         data: {
//           name: 'Test User',
//           email: 'testuser@prisma.io',
//           password:'testpassword',

//         },
//       })
      
      
//         Get all users from database
//       const users=await prisma.user.findMany();
//       console.log(users)


//     }
    
// main()
//     .then(async () => {
//     await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//     })