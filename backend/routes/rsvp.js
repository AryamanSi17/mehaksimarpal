import express from 'express';
import RSVP from '../models/RSVP.js';
import { sendRSVPConfirmation } from '../src/services/emailService.js';

const router = express.Router();

// @desc    Submit new RSVP
// @route   POST /api/rsvps
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { email, guests } = req.body;

        // Create new RSVP
        const rsvp = await RSVP.create({
            email,
            guests,
            status: 'confirmed'
        });

        // Send Confirmation Email asynchronously
        try {
            await sendRSVPConfirmation(rsvp);
        } catch (emailError) {
            console.error('Email sending failed, but RSVP was saved:', emailError);
        }

        res.status(201).json({
            success: true,
            data: rsvp,
            message: 'RSVP submitted successfully! We have sent a confirmation to your email.'
        });
    } catch (error) {
        console.error('RSVP submission error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to submit RSVP'
        });
    }
});

// @desc    Update RSVP Status
// @route   PATCH /api/rsvps/:id/status
// @access  Public (should be protected)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'confirmed', 'declined'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const rsvp = await RSVP.findById(req.params.id);
        if (!rsvp) {
            return res.status(404).json({ success: false, message: 'RSVP not found' });
        }

        const oldStatus = rsvp.status;
        rsvp.status = status;
        await rsvp.save();

        // Send Confirmation Email ONLY if status changed to 'confirmed'
        if (status === 'confirmed' && oldStatus !== 'confirmed') {
            try {
                await sendRSVPConfirmation(rsvp);
            } catch (emailError) {
                console.error('Email sending failed during confirmation:', emailError);
            }
        }

        res.json({
            success: true,
            data: rsvp,
            message: `RSVP status updated to ${status}`
        });
    } catch (error) {
        console.error('RSVP status update error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to update status'
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
        const { email, guests } = req.body;
        const rsvp = await RSVP.findByIdAndUpdate(
            req.params.id,
            { email, guests },
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
