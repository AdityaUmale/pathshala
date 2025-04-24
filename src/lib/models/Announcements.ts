import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    important: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true // Adds createdAt and updatedAt fields
});

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);

export default Announcement;