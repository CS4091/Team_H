FROM python:3.12-slim

# Install Java for PlantUML
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    default-jre \
    graphviz \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Create necessary directories
RUN mkdir -p data/inputs data/outputs

# Set environment variable to non-interactive
ENV PYTHONUNBUFFERED=1

# Command to run the application
#CMD ["bash", "routegen.sh"]

EXPOSE 5000

CMD ["python", "-m", "api.app"] 