import { Request, Response } from 'express';
import { Ticket } from '../models/Ticket';

export const getTickets = async (req: Request, res: Response) => {
  try {
    const status = req.query.status;
    const filter = status && status !== 'All' ? { status } : {};
    
    const tickets = await Ticket.find(filter)
      .populate('submittedBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: tickets });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTicketDetails = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('submittedBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email')
      .populate('messages.sender', 'firstName lastName email');
      
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    
    res.status(200).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Open', 'InProgress', 'Resolved', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTicketMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    
    // In a real application, req.user would hold the logged-in admin's ID
    const sender = (req as any).user?._id;
    
    const ticket = await Ticket.findByIdAndUpdate(
      id, 
      { 
        $push: { 
          messages: {
            sender: sender,
            senderModel: 'Admin',
            message
          }
        },
        status: 'InProgress'
      }, 
      { new: true }
    );
    
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
