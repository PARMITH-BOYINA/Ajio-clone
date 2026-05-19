# syntax=docker/dockerfile:1

FROM node:20-bullseye-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
COPY frontend/ ./
RUN npm install && npm run build

FROM node:20-bullseye-slim AS runtime
WORKDIR /app
RUN apt-get update \
    && apt-get install -y python3 python3-pip bash \
    && rm -rf /var/lib/apt/lists/*

COPY --from=frontend-builder /app/frontend /app/frontend
COPY backend/ /app/backend

WORKDIR /app/backend
RUN python3 -m pip install --no-cache-dir -r requirements.txt

EXPOSE 4173 5000
CMD ["bash", "-lc", "cd /app/frontend && npm run preview -- --host 0.0.0.0 & cd /app/backend && python3 app.py"]
