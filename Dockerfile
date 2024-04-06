FROM oven/bun

# Copy the lock and package file
COPY package.json . 
COPY prisma .
COPY --from=node:18 /usr/local/bin/node /usr/local/bin/node
# Install dependencies
RUN bun install --frozen-lockfile
RUN bunx prisma generate
RUN rm -rf /usr/local/bin/node
# Copy your source code
# If only files in the src folder changed, this is the only step that gets executed!
COPY src ./src 

CMD ["bun", "src/index.ts"]