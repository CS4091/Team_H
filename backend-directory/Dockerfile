FROM python:3.9-slim

# Install graphviz for visualization support if needed
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    graphviz \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Create necessary directories
RUN mkdir -p data/inputs data/outputs

# Set environment variable to non-interactive
ENV PYTHONUNBUFFERED=1

EXPOSE 5000

CMD ["python", "-m", "api.app"] 
