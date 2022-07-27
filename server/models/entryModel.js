import mongoose from 'mongoose';

const entrySchema = mongoose.Schema({
  count: Number,
  entries: [
    {
      API: String,
      Description: String,
      Link: String,
      Category: String,
    },
  ],
});

const EntryModel = mongoose.model('EntryModel', entrySchema);

export default EntryModel;
