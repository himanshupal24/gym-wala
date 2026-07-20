"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTicketMessage = exports.updateTicketStatus = exports.getTicketDetails = exports.getTickets = void 0;
const Ticket_1 = require("../models/Ticket");
const getTickets = async (req, res) => {
    try {
        const status = req.query.status;
        const filter = status && status !== 'All' ? { status } : {};
        const tickets = await Ticket_1.Ticket.find(filter)
            .populate('submittedBy', 'firstName lastName email')
            .populate('assignedTo', 'firstName lastName email')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: tickets });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTickets = getTickets;
const getTicketDetails = async (req, res) => {
    try {
        const ticket = await Ticket_1.Ticket.findById(req.params.id)
            .populate('submittedBy', 'firstName lastName email')
            .populate('assignedTo', 'firstName lastName email')
            .populate('messages.sender', 'firstName lastName email');
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.status(200).json({ success: true, data: ticket });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTicketDetails = getTicketDetails;
const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['Open', 'InProgress', 'Resolved', 'Closed'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }
        const ticket = await Ticket_1.Ticket.findByIdAndUpdate(id, { status }, { new: true });
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.status(200).json({ success: true, data: ticket });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateTicketStatus = updateTicketStatus;
const addTicketMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        // In a real application, req.user would hold the logged-in admin's ID
        const sender = req.user?._id;
        const ticket = await Ticket_1.Ticket.findByIdAndUpdate(id, {
            $push: {
                messages: {
                    sender: sender,
                    senderModel: 'Admin',
                    message
                }
            },
            status: 'InProgress'
        }, { new: true });
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.status(200).json({ success: true, data: ticket });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.addTicketMessage = addTicketMessage;
//# sourceMappingURL=ticket.controller.js.map