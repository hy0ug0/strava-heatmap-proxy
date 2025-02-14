FROM denoland/deno:2.1.10

LABEL org.opencontainers.image.source=https://github.com/hy0ug0/strava-heatmap-proxy

# Create and set working directory
WORKDIR /app

# Copy application files
COPY . .

# Grant necessary permissions for the application
RUN deno cache main.ts

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["deno", "run", "--allow-net", "main.ts"] 