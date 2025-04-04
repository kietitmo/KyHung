# Sử dụng image Node.js với phiên bản v22.14.0
FROM node:22.14.0

# Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json (nếu có) vào container
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn vào trong container
COPY . .

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]
