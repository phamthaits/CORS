const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
const PORT = 8080; // Chạy trên cổng 8080

app.use(cors()); // Cho phép tất cả các domain truy cập

// API proxy để bypass CORS
app.get("/proxy", (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).json({ error: "Thiếu URL!" });
    }

    request(imageUrl)
        .on("error", (err) => {
            res.status(500).json({ error: "Lỗi tải ảnh", details: err.message });
        })
        .pipe(res); // Gửi dữ liệu ảnh về client
});

app.listen(PORT, () => {
    console.log(`CORS Proxy chạy tại http://localhost:${PORT}`);
});
