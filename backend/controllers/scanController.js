const ScanReport = require('../models/ScanReport');
const { getIsMockMode, getMockStore } = require('../config/db');

// @desc Save a scan report
// @route POST /api/scan/save
exports.saveScanReport = async (req, res) => {
  try {
    const reportData = req.body;
    reportData.userId = req.user._id;

    if (getIsMockMode()) {
      const mockStore = getMockStore();
      const newReport = {
        _id: 'scan_' + Date.now(),
        ...reportData,
        createdAt: new Date()
      };
      mockStore.scanReports.unshift(newReport);
      return res.status(201).json(newReport);
    }

    const report = await ScanReport.create(reportData);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get scan history for logged-in user
// @route GET /api/scan/history
exports.getScanHistory = async (req, res) => {
  try {
    if (getIsMockMode()) {
      const mockStore = getMockStore();
      const userScans = mockStore.scanReports.filter(r => r.userId.toString() === req.user._id.toString());
      return res.json(userScans);
    }

    const reports = await ScanReport.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete scan report (owner only)
// @route DELETE /api/scan/:id
exports.deleteScanReport = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsMockMode()) {
      const mockStore = getMockStore();
      const report = mockStore.scanReports.find(r => r._id === id);
      if (!report) return res.status(404).json({ message: 'Scan report not found' });
      if (report.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorised to delete this report' });
      }
      mockStore.scanReports = mockStore.scanReports.filter(r => r._id !== id);
      return res.json({ message: 'Scan report deleted successfully' });
    }

    const report = await ScanReport.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!report) {
      return res.status(404).json({ message: 'Report not found or you are not authorised to delete it' });
    }
    res.json({ message: 'Scan report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single scan report by ID (owner only)
// @route GET /api/scan/:id
exports.getScanById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsMockMode()) {
      const mockStore = getMockStore();
      const report = mockStore.scanReports.find(r => r._id === id);
      if (!report) return res.status(404).json({ message: 'Scan report not found' });
      if (report.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorised to view this report' });
      }
      return res.json(report);
    }

    const report = await ScanReport.findOne({ _id: id, userId: req.user._id });
    if (!report) {
      return res.status(404).json({ message: 'Report not found or you are not authorised to view it' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
