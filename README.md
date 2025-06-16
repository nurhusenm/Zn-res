# Zara Restaurant Website

A modern, responsive restaurant website built with Next.js, featuring a dynamic menu management system, admin dashboard, and online ordering capabilities.

![Zara Restaurant](public/images/restaurant-preview.jpg)

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - For type safety and better developer experience
- **Tailwind CSS** - For styling and responsive design
- **Framer Motion** - For smooth animations and transitions
- **React Hot Toast** - For beautiful notifications
- **Lucide Icons** - For consistent iconography

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Primary database
- **Drizzle ORM** - Type-safe database queries
- **NextAuth.js** - Authentication and authorization
- **Uploadthing** - Image upload and storage

### Deployment
- **Vercel** - Hosting and deployment
- **Vercel Postgres** - Database hosting
- **Vercel Blob Storage** - Image storage

## ✨ Features

- 🍽️ Dynamic menu management system
- 🔐 Secure admin authentication
- 📱 Fully responsive design
- 🖼️ Image upload and management
- 📊 Admin dashboard with statistics
- 🔄 Real-time updates
- 🎨 Beautiful UI with smooth animations
- 🔍 SEO optimized

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zara-restaurant.git
   cd zara-restaurant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"
   
   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   
   # Uploadthing
   UPLOADTHING_SECRET="your_uploadthing_secret"
   UPLOADTHING_APP_ID="your_uploadthing_app_id"
   
   # Image Hosting
   NEXT_PUBLIC_IMAGE_HOST="your_image_host_domain"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see your application.

## 🚀 Deployment

### Vercel Deployment

1. **Push your code to GitHub**

2. **Import your project in Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure your project settings

3. **Set up environment variables in Vercel**
   - Go to your project settings in Vercel
   - Navigate to the "Environment Variables" section
   - Add all the environment variables from your `.env.local` file
   - Make sure to update `NEXTAUTH_URL` to your production URL

4. **Deploy!**
   - Vercel will automatically deploy your application
   - Each push to your main branch will trigger a new deployment

### Environment Variables in Vercel

Add these environment variables in your Vercel project settings:

```env
# Database (Vercel Postgres)
DATABASE_URL="your_vercel_postgres_connection_string"

# Authentication
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your_nextauth_secret"

# Uploadthing
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"

# Image Hosting
NEXT_PUBLIC_IMAGE_HOST="your_image_host_domain"
```

## 📝 Database Schema

The application uses PostgreSQL with the following main tables:

- `users` - Admin user accounts
- `menu_items` - Restaurant menu items
- `orders` - Customer orders (if implemented)

## 🔐 Admin Access

To access the admin dashboard:
1. Navigate to `/auth/login`
2. Use the admin credentials (contact the repository owner for access)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Nurhusen 

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com)
- [Drizzle ORM](https://orm.drizzle.team/)
- [NextAuth.js](https://next-auth.js.org/)
