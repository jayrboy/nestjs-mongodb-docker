# ใช้ Node.js image
FROM node:20

# ตั้งค่า working directory
WORKDIR /usr/src/app

# คัดลอกโค้ดแอปพลิเคชันไปยัง working directory
COPY . .

# ติดตั้ง dependencies
RUN npm install

# ตั้งค่า port ที่จะใช้งาน
EXPOSE 3000

# รันแอปพลิเคชัน npm run start:dev
CMD ["npm", "run", "start:dev"]