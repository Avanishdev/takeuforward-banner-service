const express = require('express');
const Banner = require('../models/banner-model');
const { broadcastBannerUpdate } = require('../server');
const router = express.Router();


//Get banner data
router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        return res.status(200).json(banners);
    } catch (err) {
        console.error("No Banner data available!", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Get banner data by id
router.get('/:id', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }
        return res.status(200).json(banner);
    } catch (err) {
        console.error("Failed to fetch Banner data", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Create a banner data
router.post('/create', async (req, res) => {
    const { title, description, timer, link, isVisible } = req.body;
    try {
        const newBanner = new Banner({ title, description, timer, link, isVisible });
        await newBanner.save();

        // broadcastBannerUpdate(newBanner);

        return res.status(201).json({ message: "Banner created successfully", banner: newBanner });
    } catch (err) {
        console.error("Failed to create Banner", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update banner data
router.put('/update/:id', async (req, res) => {
    const bannerID = req.params.id;
    const { title, description, timer, link, isVisible } = req.body;
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(
            bannerID,
            { title, description, timer, link, isVisible },
            { new: true }
        );
        if (!updatedBanner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        // broadcastBannerUpdate(updatedBanner);

        return res.status(200).json({ message: "Banner updated successfully", banner: updatedBanner });
    } catch (error) {
        console.error("Failed to update Banner data", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Delete banner data
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
        if (!deletedBanner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        // broadcastBannerUpdate({ id: req.params.id });

        return res.status(200).json({ message: "Banner deleted successfully" });
    } catch (err) {
        console.error("Failed to delete Banner", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
