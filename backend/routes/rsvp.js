import express from 'express';
import RSVP from '../models/RSVP.js';

const router = express.Router();

// @desc    Submit new RSVP
// @route   POST /api/rsvps
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { email, attendingAnandKaraj, attendingReception, guests } = req.body;

        // Create new RSVP
        const rsvp = await RSVP.create({
            email,
            attendingAnandKaraj,
            attendingReception,
            guests
        });

        res.status(201).json({
            success: true,
            data: rsvp,
            message: 'RSVP submitted successfully!'
        });
    } catch (error) {
        console.error('RSVP submission error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to submit RSVP'
        });
    }
});

// @desc    Get all RSVPs (for internal use/dashboard)
// @route   GET /api/rsvps
// @access  Public (should probably be protected in a real app)
router.get('/', async (req, res) => {
    try {
        const rsvps = await RSVP.find().sort('-createdAt');
        res.json({
            success: true,
            count: rsvps.length,
            data: rsvps
        });
    } catch (error) {
        console.error('RSVP retrieval error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve RSVPs'
        });
    }
});

// @desc    Update RSVP
// @route   PUT /api/rsvps/:id
// @access  Public (should be protected)
router.put('/:id', async (req, res) => {
    try {
        const { email, attendingAnandKaraj, attendingReception, guests } = req.body;
        const rsvp = await RSVP.findByIdAndUpdate(
            req.params.id,
            { email, attendingAnandKaraj, attendingReception, guests },
            { new: true, runValidators: true }
        );

        if (!rsvp) {
            return res.status(404).json({ success: false, message: 'RSVP not found' });
        }

        res.json({
            success: true,
            data: rsvp,
            message: 'RSVP updated successfully'
        });
    } catch (error) {
        console.error('RSVP update error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to update RSVP'
        });
    }
});

// @desc    Delete RSVP
// @route   DELETE /api/rsvps/:id
// @access  Public (should be protected)
router.delete('/:id', async (req, res) => {
    try {
        const rsvp = await RSVP.findByIdAndDelete(req.params.id);

        if (!rsvp) {
            return res.status(404).json({ success: false, message: 'RSVP not found' });
        }

        res.json({
            success: true,
            data: {},
            message: 'RSVP deleted successfully'
        });
    } catch (error) {
        console.error('RSVP delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete RSVP'
        });
    }
});

export default router;
