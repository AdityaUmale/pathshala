import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
        enum: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'other'],
        default: 'other'
    },
    size: {
        type: Number,
        required: false
    },
    uploadedBy: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Material = mongoose.models.Material || mongoose.model('Material', materialSchema);

export default Material;