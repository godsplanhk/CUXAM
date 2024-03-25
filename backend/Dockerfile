FROM oven/bun

# Copy the lock and package file
COPY bun.lockb . 
COPY package.json . 
COPY prisma .
# Install dependencies
RUN bun install --frozen-lockfile
RUN bunx prisma generate
# Copy your source code
# If only files in the src folder changed, this is the only step that gets executed!
COPY src ./src 

CMD ["bun", "src/index.ts"]