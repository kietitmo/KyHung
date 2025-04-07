# Sử dụng image Node.js với phiên bản v18-alpine
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào container
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm ci --only=production

# Sao chép toàn bộ mã nguồn vào trong container
COPY . .

# Tạo thư mục logs
RUN mkdir -p logs

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 5001

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]
