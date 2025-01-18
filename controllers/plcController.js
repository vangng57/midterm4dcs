const plcModel = require('../models/plcModel');

// API: Kết nối tới PLC
exports.connectPLC = async (req, res) => {
    try {
        await plcModel.connectPLC();
        res.json({ message: 'Kết nối PLC thành công!' });
    } catch (error) {
        console.error('Lỗi khi kết nối PLC:', error);
        res.status(500).json({ error: 'Không thể kết nối PLC!' });
    }
};

// API: Đọc dữ liệu từ PLC
exports.readPLCData = async (req, res) => {
    plcModel.readPLCData((error, values) => {
        if (error) {
            res.status(500).json({ error: `Không thể đọc giá trị từ PLC. Lỗi: ${error.message}` });
        } else {
            res.json({ values: values });
        }
    });
};

// API: Ghi dữ liệu xuống PLC
exports.writePLCData = async (req, res) => {
    const { tag, value } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!tag || value === undefined) {
        res.status(400).json({ error: 'Thiếu tag hoặc value!' });
        return;
    }

    try {
        await plcModel.writePLCData(tag, value);
        res.json({ message: `Đã ghi thành công giá trị `});
        //res.end();
    } catch (error) {
        console.error('Lỗi khi ghi dữ liệu xuống PLC:', error);
        res.status(500).json({ error: 'Không thể ghi dữ liệu xuống PLC!' });
    }
};



