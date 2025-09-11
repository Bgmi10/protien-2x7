#!/bin/bash

echo "🚀 Setting up Cloudflare D1 Database for protein2x7"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo -e "\n${YELLOW}Step 1: Installing dependencies...${NC}"
npm install

# Step 2: Create D1 databases
echo -e "\n${YELLOW}Step 2: Creating D1 databases...${NC}"
echo "Creating development database..."
npx wrangler d1 create protein2x7-db-dev

echo "Creating production database..."
npx wrangler d1 create protein2x7-db-prod

# Step 3: Instructions for updating wrangler.toml
echo -e "\n${YELLOW}Step 3: Update wrangler.toml${NC}"
echo -e "${GREEN}Please update the database_id fields in wrangler.toml with the IDs shown above:${NC}"
echo "1. Copy the development database ID and paste it in [[env.development.d1_databases]] section"
echo "2. Copy the production database ID and paste it in [[env.production.d1_databases]] section"
echo ""
read -p "Press enter once you've updated wrangler.toml with the database IDs..."

# Step 4: Apply migrations
echo -e "\n${YELLOW}Step 4: Applying database migrations...${NC}"
echo "Applying migrations to local development database..."
npx wrangler d1 migrations create protein2x7-db initial_schema
cp migrations/001_initial_schema.sql migrations/0001_initial_schema.sql
npx wrangler d1 migrations apply protein2x7-db-dev --local

echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "To deploy to production:"
echo "  npm run deploy:prod"
echo ""
echo "To apply migrations to remote database:"
echo "  npm run db:migrate:remote"