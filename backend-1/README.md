# protein2x7 API - Cloudflare Workers with D1 Database

This is the backend API for protein2x7, built with Cloudflare Workers and D1 SQL database.

## 🚀 Features

- **Cloudflare Workers**: Serverless edge computing
- **D1 Database**: SQLite at the edge
- **Hono Framework**: Lightweight web framework
- **TypeScript**: Type-safe development
- **Best Practices**: Proper error handling, migrations, and environment separation

## 📋 Prerequisites

- Node.js 18+ installed
- Cloudflare account
- Wrangler CLI (`npm install -g wrangler`)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Authenticate with Cloudflare

```bash
npx wrangler login
```

### 3. Create D1 Databases

Create development database:
```bash
npm run db:create:dev
```

Create production database:
```bash
npm run db:create:prod
```

### 4. Update Database IDs

After creating databases, you'll see output like:
```
✅ Successfully created DB 'protein2x7-db-dev' in region APAC
Created your database using D1's new storage backend. The new storage backend is not yet recommended for production workloads, but backs up your data via point-in-time restore.

[[d1_databases]]
binding = "DB"
database_name = "protein2x7-db-dev"
database_id = "xxxx-xxxx-xxxx-xxxx"
```

Copy the `database_id` values and update them in `wrangler.toml`:
- Development database ID in `[[env.development.d1_databases]]`
- Production database ID in `[[env.production.d1_databases]]`

### 5. Apply Database Migrations

For local development:
```bash
npx wrangler d1 migrations create protein2x7-db initial_schema
# Copy the migration file content from migrations/001_initial_schema.sql
npx wrangler d1 migrations apply protein2x7-db --local
```

For remote database:
```bash
npx wrangler d1 migrations apply protein2x7-db --remote
```

### 6. Set Environment Variables

Create `.dev.vars` file for local development:
```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

For production, set secrets using:
```bash
npx wrangler secret put RAZORPAY_KEY_ID
npx wrangler secret put RAZORPAY_KEY_SECRET
```

## 🔧 Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:8787`

## 📚 API Endpoints

### Health Check
- `GET /health` - Check API and database health

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Database Management
- `GET /api/init-db` - Check database initialization status

## 🗄️ Database Schema

The database includes the following tables:
- `users` - User accounts
- `meal_plans` - Available meal plans
- `subscriptions` - User subscriptions
- `orders` - Order history
- `meals` - Meal catalog
- `order_items` - Order line items
- `delivery_addresses` - User delivery addresses
- `feedback` - User feedback and ratings

## 🚀 Deployment

### Deploy to Development
```bash
npm run deploy:dev
```

### Deploy to Production
```bash
npm run deploy:prod
```

## 🛠️ Database Management Commands

### Execute SQL locally
```bash
npx wrangler d1 execute protein2x7-db --local --command "SELECT * FROM users"
```

### Execute SQL remotely
```bash
npx wrangler d1 execute protein2x7-db --remote --command "SELECT * FROM users"
```

### Execute SQL file
```bash
npm run db:execute migrations/001_initial_schema.sql
```

## 📝 Project Structure

```
backend-1/
├── src/
│   ├── index.ts           # Main application entry
│   ├── types/
│   │   └── env.ts         # Environment type definitions
│   ├── db/
│   │   └── client.ts      # Database client utilities
│   └── routes/
│       └── users.ts       # User routes
├── migrations/
│   └── 001_initial_schema.sql  # Initial database schema
├── wrangler.toml          # Cloudflare Workers configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🔒 Security Best Practices

1. **Password Hashing**: Using bcrypt for secure password storage
2. **Environment Variables**: Sensitive data stored in environment variables
3. **SQL Injection Prevention**: Using parameterized queries
4. **CORS Configuration**: Properly configured for your frontend domain
5. **Error Handling**: Proper error messages without exposing sensitive data

## 🐛 Troubleshooting

### Database not found error
Make sure you've created the database and updated the database_id in wrangler.toml

### Migration errors
Ensure you're running migrations with the correct flag (--local for development, --remote for production)

### Connection issues
Check that you're logged in to Cloudflare: `npx wrangler whoami`

## 📚 Resources

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Hono Documentation](https://hono.dev/)
- [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)

## 📄 License

MIT