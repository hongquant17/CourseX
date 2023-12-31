# CourseX: Nền tảng giáo dục của tương lai


## Cách chạy server trên platform
### Yêu cầu
Bản build của server cùng NodeJs18 được tải sẵn lên platform, các tham số môi trường đã đặt sẵn trong `./CourseX/.env`
### Chạy server
Tại thư mục home trên platform của nhóm (VD:`jovyan@jupyter-fall2324w3g2:~$`), tiến hành bật tmux lên và chạy bash script `start.sh`,
```shell
jovyan@jupyter-fall2324w3g2:~$ bash start.sh
```
## Cách cài đặt và chạy trên local
### Yêu cầu
Phiên bản Node JS: `18.x.x`
### Cài đặt thư viện
```shell
npm i
```
### Cấu hình local enviroment
Cấu hình local enviroment, gồm Database URL [Uploadthing API](https://uploadthing.com/), [Mux API](https://www.mux.com/), NextAuth Secret key, Github và Google OAuth API. Ví dụ file `env`:
```js
DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_ID=
GOOGLE_SECRET=
```
### Cài đặt Prisma
Sau khi thêm Database URL, cài đặt Prisma
```shell
npx prisma generate
npx prisma db push
```
### Chạy development server
```shell
npm run dev
```
### Build server
Build server với lệnh:
```shell
npm run build
```
Sau đó chạy lệnh sau để khởi động server:
```shell
npm run start
```

